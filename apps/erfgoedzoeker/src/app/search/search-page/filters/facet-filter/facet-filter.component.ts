import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { FacetFilterService } from '../../../state/facet-filter.service';
import { Facet, FacetValue } from '../../../types/facet';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';

@Component({
  selector: 'app-facet-filter',
  imports: [FilterPanelComponent],
  templateUrl: './facet-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacetFilterComponent {
  facet = input.required<Facet>();
  label = input.required<string>();
  icon = input<string | undefined>(undefined);

  private facetFilter = inject(FacetFilterService);

  activeBadge = computed(() => {
    const count = this.facetFilter.activeCount(this.facet().name);
    return count > 0 ? `${count} actief` : undefined;
  });

  onFacetToggle(value: string | boolean): void {
    this.facetFilter.toggleFacet(this.facet().name, String(value));
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
