import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { isFacetValue } from '../types/facet';
import { Filters, SerializableFilters } from '../types/filters';
import { hasActiveBounds, RangeValue } from '../types/range-value';

export function deepCopyFilters(filters: Filters): Filters {
  const copy: Filters = {};
  for (const [key, value] of Object.entries(filters)) {
    copy[key] = isFacetValue(value) ? new Set(value) : { ...value };
  }
  return copy;
}

@Injectable({
  providedIn: 'root',
})
export class FilterStore {
  private router = inject(Router);

  selectedFilters = signal<Filters>({});

  activeFilterCount = computed(() => {
    const filters = this.selectedFilters();
    return Object.values(filters).reduce((total, value) => {
      if (isFacetValue(value)) return total + value.size;
      const hasRange = hasActiveBounds(value);
      return total + (hasRange ? 1 : 0);
    }, 0);
  });

  apply(filters: Filters): void {
    this.selectedFilters.set(filters);
    this.updateUrlWithFilters(filters);
  }

  withForcedFilters(forcedFilters?: Record<string, string[]>): Filters {
    if (!forcedFilters || Object.keys(forcedFilters).length === 0) {
      return this.selectedFilters();
    }

    const filters = deepCopyFilters(this.selectedFilters());
    for (const [name, values] of Object.entries(forcedFilters)) {
      filters[name] = new Set(values);
    }
    return filters;
  }

  private updateUrlWithFilters(filters: Filters): void {
    const filterParam = this.serialize(filters);

    this.router.navigate([], {
      queryParams: { filters: filterParam || undefined, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  clearFilters(): void {
    this.router.navigate([], {
      queryParams: { filters: undefined, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.selectedFilters()).length > 0;
  }

  serialize(filters: Filters): string | null {
    if (Object.keys(filters).length === 0) {
      return null;
    }

    const serializableFilters: SerializableFilters = {};
    for (const [name, value] of Object.entries(filters)) {
      if (isFacetValue(value)) {
        if (value.size > 0) {
          serializableFilters[name] = Array.from(value).sort();
        }
      } else if (hasActiveBounds(value)) {
        serializableFilters[name] = value;
      }
    }

    if (Object.keys(serializableFilters).length === 0) {
      return null;
    }

    return JSON.stringify(serializableFilters);
  }

  deserialize(filterParam: string | null): Filters {
    if (!filterParam) {
      return {};
    }
    try {
      const parsed: SerializableFilters = JSON.parse(filterParam);
      const filters: Filters = {};
      for (const [name, value] of Object.entries(parsed)) {
        if (Array.isArray(value)) {
          filters[name] = new Set(value);
        } else {
          filters[name] = value as RangeValue;
        }
      }
      return filters;
    } catch {
      return {};
    }
  }

  clearFiltersIfQueryChanged(
    newQuery: string,
    previousQuery: string | null,
  ): void {
    const queryChanged = previousQuery !== null && previousQuery !== newQuery;

    if (queryChanged) {
      this.selectedFilters.set({});
    }
  }

  syncFiltersFromUrl(urlFilters: string | null): void {
    const currentFilters: Filters = this.selectedFilters();
    const serializedFilters: string | null = this.serialize(currentFilters);
    const filtersChanged: boolean = serializedFilters !== urlFilters;

    if (filtersChanged) {
      const deserializedFilters: Filters = this.deserialize(urlFilters);
      this.selectedFilters.set(deserializedFilters);
    }
  }
}
