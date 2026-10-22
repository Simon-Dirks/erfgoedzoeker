import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RangeFilterConfig } from '@erfgoedzoeker/config-schema';
import { RangeFilterService } from '../../../state/range-filter.service';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';

@Component({
  selector: 'app-range-filter',
  imports: [FilterPanelComponent],
  templateUrl: './range-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeFilterComponent {
  name = input.required<string>();
  label = input.required<string>();
  icon = input<string | undefined>(undefined);
  filterType = input<RangeFilterConfig['type']>('dateRange');

  private rangeFilter = inject(RangeFilterService);

  range = computed(() => this.rangeFilter.getRange(this.name()));
  isActive = computed(() => this.rangeFilter.isRangeActive(this.name()));
  activeBadge = computed(() => (this.isActive() ? 'actief' : undefined));

  onMinChange(value: string): void {
    const { max } = this.range();
    this.rangeFilter.setRange(this.name(), value || undefined, max);
  }

  onMaxChange(value: string): void {
    const { min } = this.range();
    this.rangeFilter.setRange(this.name(), min, value || undefined);
  }

  onKeydown(event: KeyboardEvent, target: EventTarget | null): void {
    if (event.key === 'Enter' && target instanceof HTMLInputElement) {
      target.blur();
    }
  }
}
