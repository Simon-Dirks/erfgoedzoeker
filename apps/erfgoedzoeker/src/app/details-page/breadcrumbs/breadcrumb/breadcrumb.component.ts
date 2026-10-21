import {
  Component,
  inject,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherChevronRight } from '@ng-icons/feather-icons';
import { BreadcrumbItem, BreadcrumbService } from '../breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  imports: [NgIconComponent],
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherChevronRight })],
})
export class BreadcrumbComponent {
  private breadcrumbService = inject(BreadcrumbService);

  protected breadcrumbs: Signal<BreadcrumbItem[]> =
    this.breadcrumbService.getBreadcrumbs;

  onBreadcrumbClick(index: number): void {
    this.breadcrumbService.navigateToBreadcrumb(index);
  }
}
