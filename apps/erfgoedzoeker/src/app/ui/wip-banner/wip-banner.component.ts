import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherInfo } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-wip-banner',
  imports: [NgIcon],
  templateUrl: './wip-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherInfo })],
})
export class WipBannerComponent {
  constructor() {}
}
