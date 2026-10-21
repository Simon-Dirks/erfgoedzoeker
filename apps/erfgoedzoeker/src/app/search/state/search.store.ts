import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { ViewType } from '@erfgoedzoeker/config-schema';
import { NodeModel } from '../../node/types/node.model';
import { Facet } from '../types/facet';
import { SearchResponse } from '../types/search-response';
import { ViewService } from '../views/view.service';
import { FilterStore } from './filter.store';
import {
  loadSearchParamsFromSessionStorage,
  saveSearchParamsToSessionStorage,
} from './search-params-storage.util';
import { SearchResponseCacheStore } from './search-response-cache.store';

interface SearchUrlParams {
  q: string;
  filters: string | null;
  page: number;
  view: ViewType;
  sort: string | null;
  pageSize: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class SearchStore {
  private searchApiService = inject(ApiService);
  private filterStore = inject(FilterStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewService = inject(ViewService);
  private searchCache = inject(SearchResponseCacheStore);

  searchTerm = signal('');
  results = signal<NodeModel[]>([]);
  totalResults = signal(0);
  facets = signal<Facet[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  currentPage = signal(1);
  pageSize = signal(20);
  nextPage = signal<string | undefined>(undefined);
  prevPage = signal<string | undefined>(undefined);
  currentView = signal<ViewType>(this.viewService.getDefaultViewType());
  currentSort = signal<string | null>(null);
  private searchParams = signal<Params>(
    loadSearchParamsFromSessionStorage() || {},
  );

  constructor() {
    this.initSearchOnUrlChanges();
  }

  getSearchParams(): Params {
    return this.searchParams();
  }

  private initSearchOnUrlChanges(): void {
    let previousQuery: string | null = null;

    this.route.queryParams
      .pipe(
        filter(() => this.router.url.split('?')[0] === '/search'),
        map((params): SearchUrlParams => ({
          q: params['q'] || '',
          filters: params['filters'] || null,
          page: params['page'] ? parseInt(params['page'], 10) : 1,
          view:
            (params['view'] as ViewType) ||
            this.viewService.getDefaultViewType(),
          sort: params['sort'] || null,
          pageSize: params['pageSize']
            ? parseInt(params['pageSize'], 10)
            : null,
        })),
        distinctUntilChanged((prev: SearchUrlParams, curr: SearchUrlParams) => {
          const paramKeys = Object.keys(prev) as (keyof SearchUrlParams)[];
          const noParamsChanged = paramKeys.every(
            (key) => prev[key] === curr[key],
          );
          return noParamsChanged;
        }),
      )
      .subscribe((urlParams: SearchUrlParams) => {
        const { q: query, filters, page, view, sort, pageSize } = urlParams;

        this.filterStore.clearFiltersIfQueryChanged(query, previousQuery);
        this.filterStore.syncFiltersFromUrl(filters);

        previousQuery = query;
        this.searchTerm.set(query);
        this.currentPage.set(page);
        this.currentView.set(view);

        const viewOptions = this.viewService.getViewOptions(view);
        const defaultSort = viewOptions.defaultSort ?? null;
        const resolvedSort = sort ?? defaultSort;
        this.currentSort.set(resolvedSort);

        const defaultPageSize = viewOptions.pageSize ?? 10;
        const resolvedPageSize = pageSize ?? defaultPageSize;
        this.pageSize.set(resolvedPageSize);

        const params: Params = {
          ...(query && { q: query }),
          ...(filters && { filters }),
          ...(page > 1 && { page: page.toString() }),
          ...(view !== this.viewService.getDefaultViewType() && { view }),
          ...(resolvedSort !== defaultSort && { sort: resolvedSort }),
          ...(resolvedPageSize !== defaultPageSize && {
            pageSize: resolvedPageSize.toString(),
          }),
        };
        this.searchParams.set(params);
        saveSearchParamsToSessionStorage(params);

        this.performSearch(query, page);
      });
  }

  private performSearch(term: string, page: number = 1): void {
    let trimmedTerm = term.trim();

    if (!trimmedTerm) {
      trimmedTerm = '*';
      // this.results.set([]);
      // return;
    }

    const pageSize = this.pageSize();
    const sort = this.currentSort();
    const filters = this.filterStore.selectedFilters();
    const searchKey = this.searchCache.setSearchKey(
      trimmedTerm,
      page,
      pageSize,
      sort,
      this.filterStore.serialize(filters) || '',
    );

    const cachedResponse = this.searchCache.get(searchKey);
    if (cachedResponse) {
      this.applySearchResponse(cachedResponse);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.searchApiService
      .search({
        q: trimmedTerm,
        size: pageSize,
        page,
        ...(Object.keys(filters).length > 0 && { filters }),
        ...(sort && { sort }),
      })
      .subscribe({
        next: (response: SearchResponse) => {
          this.searchCache.set(searchKey, response);
          this.applySearchResponse(response);

          console.log('Search results:', response);
        },
        error: (err) => {
          this.error.set('Failed to search: ' + err.message);
          this.loading.set(false);
          this.results.set([]);
          this.totalResults.set(0);
          this.facets.set([]);
        },
      });
  }

  private applySearchResponse(response: SearchResponse): void {
    this.results.set(response.orderedItems);
    this.totalResults.set(response.partOf.totalItems);
    this.facets.set(response.partOf.facets || []);
    this.nextPage.set(response.next);
    this.prevPage.set(response.prev);
    this.loading.set(false);
  }
}
