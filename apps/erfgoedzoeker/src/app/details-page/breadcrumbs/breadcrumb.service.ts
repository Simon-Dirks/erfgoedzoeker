import { computed, inject, Injectable, signal } from '@angular/core';
import { Params, Router } from '@angular/router';
import { SearchStore } from '../../search/state/search.store';

export interface BreadcrumbItem {
  label: string;
  route: string[];
  queryParams?: Record<string, string>;
}

export interface NavigationState {
  searchParams?: Record<string, string>;
}

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private router = inject(Router);
  private searchStore = inject(SearchStore);
  private breadcrumbs = signal<BreadcrumbItem[]>([]);

  getBreadcrumbs = computed(() => this.breadcrumbs());

  addBreadcrumb(item: BreadcrumbItem): void {
    let current = this.breadcrumbs();

    if (current.length === 0) {
      this.initSearchBreadcrumb();
      current = this.breadcrumbs();
    }

    const existingItemIndex = current.findIndex(
      (crumb) =>
        crumb.route.join('/') === item.route.join('/') &&
        JSON.stringify(crumb.queryParams) === JSON.stringify(item.queryParams),
    );

    const isNavigatingBackToExistingPage = existingItemIndex !== -1;

    if (isNavigatingBackToExistingPage) {
      const truncatedTrail = current.slice(0, existingItemIndex + 1);
      this.breadcrumbs.set(truncatedTrail);
    } else {
      const extendedTrail = [...current, item];
      this.breadcrumbs.set(extendedTrail);
    }
  }

  private initSearchBreadcrumb(): void {
    const searchParams: Params = this.searchStore.getSearchParams();
    this.setSearchBreadcrumb(searchParams);
  }

  navigateToBreadcrumb(index: number): void {
    const current = this.breadcrumbs();
    if (index < 0 || index >= current.length) return;

    const targetBreadcrumb = current[index];
    const truncatedTrail = current.slice(0, index + 1);
    this.breadcrumbs.set(truncatedTrail);

    this.router.navigate(targetBreadcrumb.route, {
      queryParams: targetBreadcrumb.queryParams,
    });
  }

  reset(): void {
    this.breadcrumbs.set([]);
  }

  setSearchBreadcrumb(queryParams: Record<string, string>): void {
    const query = queryParams['q'];
    const label = query && query !== '*' ? `Zoeken: "${query}"` : 'Zoeken';

    const searchBreadcrumb: BreadcrumbItem = {
      label,
      route: ['/search'],
      queryParams: { q: '', ...queryParams },
    };

    const current = this.breadcrumbs();
    if (current.length === 0) {
      this.breadcrumbs.set([searchBreadcrumb]);
    }
  }
}
