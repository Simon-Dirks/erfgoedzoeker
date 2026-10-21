import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { featherFilter } from '@ng-icons/feather-icons';
import { filter } from 'rxjs';
import { BreadcrumbService } from '../../details-page/breadcrumbs/breadcrumb.service';
import { BreakpointService } from '../../ui/breakpoint/breakpoint.service';
import { ErrorAlertComponent } from '../../ui/error-alert/error-alert.component';
import { HeaderBannerComponent } from '../../ui/header-banner/header-banner.component';
import { PageTitleService } from '../../ui/page-title/page-title.service';
import { FilterStore } from '../state/filter.store';
import { SearchResponseCacheStore } from '../state/search-response-cache.store';
import { SearchScrollPositionStore } from '../state/search-scroll-position.store';
import { SearchStore } from '../state/search.store';
import { ViewService } from '../views/view.service';
import { DrawerLayoutComponent } from './drawer-layout/drawer-layout.component';
import { DrawerToggleButtonComponent } from './drawer-layout/drawer-toggle-button/drawer-toggle-button.component';
import { FacetsComponent } from './facets/facets.component';
import { Pagination } from './pagination/pagination';
import { ResultsCount } from './results-count/results-count';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchSort } from './search-sort/search-sort';
import { ViewSwitcherComponent } from './view-switcher/view-switcher.component';

@Component({
  selector: 'app-search-page',
  imports: [
    CommonModule,
    SearchBarComponent,
    FacetsComponent,
    DrawerLayoutComponent,
    DrawerToggleButtonComponent,
    SearchSort,
    ResultsCount,
    Pagination,
    ViewSwitcherComponent,
    HeaderBannerComponent,
    ErrorAlertComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent implements OnInit {
  store = inject(SearchStore);
  filterStore = inject(FilterStore);
  private searchCache = inject(SearchResponseCacheStore);
  private scrollPositions = inject(SearchScrollPositionStore);
  private breadcrumbService = inject(BreadcrumbService);
  private router = inject(Router);
  private breakpointService = inject(BreakpointService);
  private viewService = inject(ViewService);
  private pageTitleService = inject(PageTitleService);

  viewContainer = viewChild('viewContainer', { read: ViewContainerRef });
  viewLoadError = signal<string | null>(null);

  currentViewOptions = computed(() => {
    return this.viewService.getViewOptions(this.store.currentView());
  });

  activeFilterCount = computed(() => {
    const count = this.filterStore.activeFilterCount();
    return count > 0 ? count.toString() : undefined;
  });

  protected readonly featherFilter = featherFilter;
  protected readonly isDesktop = this.breakpointService.isDesktop;

  constructor() {
    this.loadViewWhenContainerIsReady();
    this.updatePageTitleOnSearchChange();
    this.scrollToTopOnSearchOrPageChange();
    this.saveScrollPositionOnNavigateAway();
  }

  ngOnInit(): void {
    this.breadcrumbService.reset();
  }

  private saveScrollPositionOnNavigateAway(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.scrollPositions.saveCurrent(window.scrollY);
      });
  }

  private loadViewWhenContainerIsReady(): void {
    effect(() => {
      const viewContainer = this.viewContainer();

      if (viewContainer) {
        viewContainer.clear();

        const currentView = this.store.currentView();
        const component = this.viewService.getViewComponent(currentView);
        const options = this.viewService.getViewOptions(currentView);
        const presentationConfig =
          this.viewService.getViewPresentationConfig(currentView);

        if (component) {
          const componentRef = viewContainer.createComponent(component);
          componentRef.setInput('results', this.store.results());
          componentRef.setInput('totalResults', this.store.totalResults());
          componentRef.setInput('currentPage', this.store.currentPage());
          componentRef.setInput('pageSize', this.store.pageSize());
          componentRef.setInput('options', options);
          componentRef.setInput('presentationConfig', presentationConfig);
          this.viewLoadError.set(null);
        } else {
          const errorMessage = `View component for type "${currentView}" not found. Could not instantiate view.`;
          console.warn(errorMessage);
          this.viewLoadError.set(errorMessage);
        }
      }
    });
  }

  private updatePageTitleOnSearchChange(): void {
    effect(() => {
      const searchTerm = this.store.searchTerm();
      const title = searchTerm
        ? `Zoekresultaten "${searchTerm}"`
        : 'Zoekresultaten';
      this.pageTitleService.setTitle(title);
    });
  }

  private scrollToTopOnSearchOrPageChange(): void {
    effect(() => {
      this.store.currentPage();
      this.store.currentSort();
      this.filterStore.activeFilterCount();
      this.store.results();
      const isLoading = this.store.loading();
      this.searchCache.currentSearchKey();

      if (isLoading) {
        return;
      }

      const savedScrollY = this.scrollPositions.popForCurrent();

      requestAnimationFrame(() => {
        if (savedScrollY !== undefined) {
          window.scrollTo({ top: savedScrollY });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }
}
