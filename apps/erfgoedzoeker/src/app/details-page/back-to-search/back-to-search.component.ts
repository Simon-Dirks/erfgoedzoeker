import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherArrowLeft } from '@ng-icons/feather-icons';
import { BreadcrumbService } from '../breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-back-to-search',
  imports: [NgIconComponent],
  templateUrl: './back-to-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherArrowLeft })],
})
export class BackToSearchComponent {
  private breadcrumbService = inject(BreadcrumbService);

  onBackClick(): void {
    this.breadcrumbService.navigateToBreadcrumb(0);
  }
}
