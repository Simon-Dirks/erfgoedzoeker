import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FacetFilterService } from '../../../state/facet-filter.service';
import { Facet, FacetValue } from '../../../types/facet';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';

@Component({
  selector: 'app-facet-filter',
  imports: [FilterPanelComponent, DecimalPipe],
  templateUrl: './facet-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetFilterComponent {
  facet = input.required<Facet>();
  label = input.required<string>();
  icon = input<string | undefined>(undefined);

  private facetFilter = inject(FacetFilterService);

  // TODO: Handle facet filtering at the integration layer, see https://codeberg.org/limburg/lol/issues/221
  protected readonly filterText = signal('');
  protected readonly visibleItems = computed(() => {
    const items = this.facet().orderedItems;
    const searchText = this.filterText().trim().toLocaleLowerCase('nl');
    if (!searchText) return items;
    return items.filter((item) =>
      this.formatFacetLabel(item).toLocaleLowerCase('nl').includes(searchText),
    );
  });

  activeBadge = computed(() => {
    const count = this.facetFilter.activeCount(this.facet().name);
    return count > 0 ? `${count} actief` : undefined;
  });

  onFacetToggle(value: string | boolean): void {
    this.facetFilter.toggleFacet(this.facet().name, String(value));
  }

  clearFilter(): void {
    this.facetFilter.clearFacet(this.facet().name);
  }

  isSelected(value: string | boolean): boolean {
    return this.facetFilter.isFacetSelected(this.facet().name, String(value));
  }

  formatFacetLabel(item: FacetValue): string {
    if (typeof item.value === 'boolean') {
      return item.value ? 'Ja' : 'Nee';
    }
    return item.label ?? item.value;
  }
}
