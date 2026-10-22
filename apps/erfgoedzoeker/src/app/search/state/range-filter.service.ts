import { inject, Injectable } from '@angular/core';
import { isFacetValue } from '../types/facet';
import { hasActiveBounds, RangeValue } from '../types/range-value';
import { deepCopyFilters, FilterStore } from './filter.store';

@Injectable({ providedIn: 'root' })
export class RangeFilterService {
  private filterStore = inject(FilterStore);

  setRange(
    name: string,
    min: string | undefined,
    max: string | undefined,
  ): void {
    const currentFilters = deepCopyFilters(this.filterStore.selectedFilters());

    if (!min && !max) {
      delete currentFilters[name];
    } else {
      currentFilters[name] = { min: min || undefined, max: max || undefined };
    }

    this.filterStore.apply(currentFilters);
  }

  clearRange(name: string): void {
    const currentFilters = deepCopyFilters(this.filterStore.selectedFilters());
    delete currentFilters[name];
    this.filterStore.apply(currentFilters);
  }

  getRange(name: string): RangeValue {
    const value = this.filterStore.selectedFilters()[name];
    if (!value || isFacetValue(value)) return {};
    return value;
  }

  isRangeActive(name: string): boolean {
    return hasActiveBounds(this.getRange(name));
  }
}
