import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { FilterStore } from '../../state/filter.store';
import { SearchStore } from '../../state/search.store';

import { NgIcon } from '@ng-icons/core';
import { FacetValue } from '../../types/facet';
import { FacetsService } from './facets.service';

@Component({
  selector: 'app-facets',

  imports: [CommonModule, NgIcon],
  templateUrl: './facets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './facets.component.scss',
})
export class FacetsComponent {
  store = inject(SearchStore);
  filterStore = inject(FilterStore);
  facetsService = inject(FacetsService);

  visibleFacets = computed(() => {
    const facets = this.store.facets();
    const filtered = facets.filter(
      (facet) => !this.facetsService.isFacetHidden(facet.name),
    );
    return this.facetsService.sortFacets(filtered);
  });

  hasFacetWithItems = computed(() =>
    this.visibleFacets().some((facet) => facet.orderedItems.length > 0),
  );

  onFacetToggle(facetName: string, value: string | boolean): void {
    this.filterStore.toggleFilter(facetName, String(value));
  }

  isSelected(facetName: string, value: string | boolean): boolean {
    return this.filterStore.isFilterSelected(facetName, String(value));
  }

  getActiveFilterCount(facetName: string): number {
    const filters = this.filterStore.selectedFilters();
    return filters[facetName]?.size ?? 0;
  }

  formatFacetLabel(item: FacetValue): string {
    if (typeof item.value === 'boolean') {
      return item.value ? 'Ja' : 'Nee';
    }
    return item.label ?? item.value;
  }
}
