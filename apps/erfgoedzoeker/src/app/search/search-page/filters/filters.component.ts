import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RangeFilterConfig } from '@erfgoedzoeker/config-schema';
import { SearchStore } from '../../state/search.store';
import { Facet } from '../../types/facet';
import { FacetFilterComponent } from './facet-filter/facet-filter.component';
import { FiltersService } from './filters.service';
import { RangeFilterComponent } from './range-filter/range-filter.component';

type FacetFilterItem = { kind: 'facet'; name: string; facet: Facet };
type RangeFilterItem = {
  kind: 'range';
  name: string;
  config: RangeFilterConfig;
};
type FilterItem = FacetFilterItem | RangeFilterItem;

@Component({
  selector: 'app-filters',
  imports: [FacetFilterComponent, RangeFilterComponent],
  templateUrl: './filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  store = inject(SearchStore);
  filtersService = inject(FiltersService);

  allVisibleFilters = computed((): FilterItem[] => {
    const facetItems: FacetFilterItem[] = this.store
      .facets()
      .filter(
        (f) =>
          !this.filtersService.isHidden(f.name) && f.orderedItems.length > 0,
      )
      .map((f) => ({ kind: 'facet', name: f.name, facet: f }));

    const rangeItems: RangeFilterItem[] = this.filtersService
      .getVisibleRangeFilterConfigs()
      .map((c) => ({ kind: 'range', name: c.name, config: c }));

    return this.filtersService.sortFilters([...facetItems, ...rangeItems]);
  });

  hasFiltersToShow = computed(() => this.allVisibleFilters().length > 0);
}
