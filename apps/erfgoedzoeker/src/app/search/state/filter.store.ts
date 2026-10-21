import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Filters, SerializableFilters } from '../types/filters';

@Injectable({
  providedIn: 'root',
})
export class FilterStore {
  private router = inject(Router);

  selectedFilters = signal<Filters>({});

  activeFilterCount = computed(() => {
    const filters = this.selectedFilters();
    return Object.values(filters).reduce(
      (total, values) => total + values.size,
      0,
    );
  });

  private deepCopyFilters(filters: Filters): Filters {
    const copy: Filters = {};
    for (const [key, values] of Object.entries(filters)) {
      copy[key] = new Set(values);
    }
    return copy;
  }

  toggleFilter(facetName: string, value: string): void {
    const currentFilters = this.deepCopyFilters(this.selectedFilters());

    if (!currentFilters[facetName]) {
      currentFilters[facetName] = new Set<string>();
    }

    if (currentFilters[facetName].has(value)) {
      currentFilters[facetName].delete(value);
      if (currentFilters[facetName].size === 0) {
        delete currentFilters[facetName];
      }
    } else {
      currentFilters[facetName].add(value);
    }

    this.selectedFilters.set(currentFilters);
    this.updateUrlWithFilters(currentFilters);
  }

  private updateUrlWithFilters(filters: Filters): void {
    const filterParam = this.serialize(filters);

    this.router.navigate([], {
      queryParams: { filters: filterParam || undefined, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  isFilterSelected(facetName: string, value: string): boolean {
    return this.selectedFilters()[facetName]?.has(value) ?? false;
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
    for (const [facetName, values] of Object.entries(filters)) {
      serializableFilters[facetName] = Array.from(values).sort();
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
      for (const [facetName, values] of Object.entries(parsed)) {
        filters[facetName] = new Set(values);
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
