import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ConfigService } from '../config/config.service';
import { normalizeToFirst } from '../data-utils/value-normalization.util';
import { NodeComponent } from '../node/node.component';
import { NodeModel } from '../node/types/node.model';
import {
  addUriPrefix,
  removeUriPrefix,
} from '../routing/details-page-uri-prefix';
import { ErrorAlertComponent } from '../ui/error-alert/error-alert.component';
import { LoadingSpinnerComponent } from '../ui/loading-spinner/loading-spinner.component';
import { PageTitleService } from '../ui/page-title/page-title.service';
import { BackToSearchComponent } from './back-to-search/back-to-search.component';
import { BreadcrumbService } from './breadcrumbs/breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumbs/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-details-page',
  imports: [
    CommonModule,
    NodeComponent,
    BreadcrumbComponent,
    BackToSearchComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  id: string | null = null;
  data = signal<NodeModel | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private breadcrumbService = inject(BreadcrumbService);
  private pageTitleService = inject(PageTitleService);
  private configService = inject(ConfigService);
  private routeSubscription?: Subscription;

  protected presentationConfig = computed(() => {
    const detailsPresentation = this.configService.detailsPresentation();
    if (!detailsPresentation) {
      throw new Error('Config not initialized');
    }
    return detailsPresentation;
  });

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      if (id) {
        id = removeUriPrefix(id);
      }

      this.id = id;
      if (this.id) {
        this.fetchData();
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  private fetchData() {
    if (!this.id) return;

    this.loading.set(true);
    this.error.set(null);

    this.apiService.details(this.id).subscribe({
      next: (response: NodeModel) => {
        console.log('Details response:', response);
        this.data.set(response);
        this.loading.set(false);
        this.addBreadcrumb(response);
        this.updatePageTitle(response);
      },
      error: (err) => {
        this.error.set('Failed to load data: ' + err.message);
        this.loading.set(false);
      },
    });
  }

  private addBreadcrumb(data: NodeModel): void {
    const label: string =
      normalizeToFirst<string>(data.name) || data.id || 'Details';
    this.breadcrumbService.addBreadcrumb({
      label,
      route: ['/details', addUriPrefix(this.id!)],
    });
  }

  private updatePageTitle(data: NodeModel): void {
    const label: string =
      normalizeToFirst<string>(data.name) || data.id || 'Details';
    this.pageTitleService.setTitleWithFallback(label, 'Details');
  }
}
