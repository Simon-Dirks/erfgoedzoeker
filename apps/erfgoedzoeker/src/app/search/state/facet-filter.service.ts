import { inject, Injectable } from '@angular/core';
import { isFacetValue } from '../types/facet';
import { deepCopyFilters, FilterStore } from './filter.store';

@Injectable({ providedIn: 'root' })
export class FacetFilterService {
  private filterStore = inject(FilterStore);

  toggleFacet(name: string, value: string): void {
    const filters = deepCopyFilters(this.filterStore.selectedFilters());

    const existingFilterValue = filters[name];
    const facetValues: Set<string> = isFacetValue(existingFilterValue)
      ? existingFilterValue
      : new Set<string>();
    filters[name] = facetValues;

    if (facetValues.has(value)) {
      facetValues.delete(value);
    } else {
      facetValues.add(value);
    }

    if (facetValues.size === 0) {
      delete filters[name];
    }

    this.filterStore.apply(filters);
  }

  isFacetSelected(name: string, value: string): boolean {
    const filterValue = this.filterStore.selectedFilters()[name];
    return isFacetValue(filterValue) ? filterValue.has(value) : false;
  }

  activeCount(name: string): number {
    const filterValue = this.filterStore.selectedFilters()[name];
    return isFacetValue(filterValue) ? filterValue.size : 0;
  }
}
