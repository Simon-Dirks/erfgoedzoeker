import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { ViewType } from '@erfgoedzoeker/config-schema';
import { getIcon } from '@erfgoedzoeker/icon-registry';
import { ViewService } from '../../views/view.service';

@Component({
  selector: 'app-view-switcher',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-switcher.component.html',
})
export class ViewSwitcherComponent {
  private viewService = inject(ViewService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentView = input.required<ViewType>();
  viewChange = output<ViewType>();

  protected readonly availableViews = this.viewService.allViewDefinitions;
  protected readonly getIcon = getIcon;

  onViewChange(viewType: ViewType): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: viewType, pageSize: null, sort: null },
      queryParamsHandling: 'merge',
    });
  }
}
