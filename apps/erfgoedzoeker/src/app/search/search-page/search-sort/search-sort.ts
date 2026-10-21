import {
  Component,
  effect,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchStore } from '../../state/search.store';

const SORT_OPTIONS = [
  { option: 'relevance', param: null },
  { option: 'title-a-z', param: 'title:asc' },
  { option: 'title-z-a', param: 'title:desc' },
  { option: 'date-asc', param: 'dateCreated:asc' },
  { option: 'date-desc', param: 'dateCreated:desc' },
] as const;

@Component({
  selector: 'app-search-sort',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-sort.html',
})
export class SearchSort {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly searchStore = inject(SearchStore);

  protected readonly selectedSort = signal<string>('relevance');

  constructor() {
    effect(() => {
      const currentSort = this.searchStore.currentSort();
      if (currentSort) {
        this.selectedSort.set(this.mapSortParamToOption(currentSort));
      } else {
        this.selectedSort.set('relevance');
      }
    });
  }

  protected onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const sortOption = select.value;
    this.selectedSort.set(sortOption);

    const sortParam = this.mapOptionToSortParam(sortOption);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: sortParam, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  private mapOptionToSortParam(option: string): string | null {
    return SORT_OPTIONS.find((s) => s.option === option)?.param ?? null;
  }

  private mapSortParamToOption(sortParam: string): string {
    return (
      SORT_OPTIONS.find((s) => s.param === sortParam)?.option ?? 'relevance'
    );
  }
}
