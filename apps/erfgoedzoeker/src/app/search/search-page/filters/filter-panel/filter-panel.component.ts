import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-filter-panel',
  imports: [NgIcon],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
  label = input.required<string>();
  icon = input<string | undefined>(undefined);
  activeBadge = input<string | undefined>(undefined);
}
