import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherInfo } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-tooltip-badge',
  imports: [NgIconComponent],
  templateUrl: './tooltip-badge.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherInfo })],
})
export class TooltipBadge {
  tooltipText = input.required<string>();
  tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('left');
}
