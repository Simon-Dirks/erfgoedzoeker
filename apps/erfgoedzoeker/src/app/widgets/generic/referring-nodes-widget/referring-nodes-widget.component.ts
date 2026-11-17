import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  Signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../api/api.service';
import { normalizeToFirst } from '../../../data-utils/value-normalization.util';
import { NodeLinkListComponent } from '../../../node/node-link-list/node-link-list.component';
import { ReferringNodesResponse } from '../../../search/types/referring-node';
import { ErrorAlertComponent } from '../../../ui/error-alert/error-alert.component';
import { LoadingSpinnerComponent } from '../../../ui/loading-spinner/loading-spinner.component';
import { Pagination } from '../../../ui/pagination/pagination';
import { BaseWidget } from '../../base-widget';

const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [10, 20, 50];

@Component({
  selector: 'app-referring-nodes-widget',
  imports: [
    NodeLinkListComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    Pagination,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './referring-nodes-widget.component.html',
})
export class ReferringNodesWidget extends BaseWidget {
  protected readonly referringNodesResponse =
    signal<ReferringNodesResponse | null>(null);
  protected readonly loading = signal<boolean>(false);
  protected readonly error = signal<string | null>(null);
  protected readonly pageSize = signal(DEFAULT_PAGE_SIZE);
  protected readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  private apiService = inject(ApiService);
  private pendingRequest?: Subscription;

  private nodeId: Signal<string | null> = computed(() => {
    const value = normalizeToFirst(this.values());
    return value ? String(value) : null;
  });

  protected readonly currentPage = linkedSignal({
    source: this.nodeId,
    computation: () => 1,
  });

  protected readonly nodeName = computed(() =>
    normalizeToFirst<string>(this.node().name),
  );

  protected readonly totalReferringNodes = computed(
    () => this.referringNodesResponse()?.totalCount ?? 0,
  );

  protected readonly referringNodes = computed(
    () => this.referringNodesResponse()?.nodes ?? [],
  );

  protected readonly hasResults = computed(
    () => this.totalReferringNodes() > 0,
  );

  override shouldHide = computed(() => {
    return !this.loading() && !this.error() && !this.hasResults();
  });

  constructor() {
    super();
    effect(() => {
      const id = this.nodeId();
      if (id) {
        this.fetchReferringNodes(id, this.currentPage(), this.pageSize());
      }
    });
  }

  protected changePageSize(pageSize: number) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
  }

  private fetchReferringNodes(id: string, page: number, pageSize: number) {
    this.loading.set(true);
    this.error.set(null);

    this.pendingRequest?.unsubscribe();
    this.pendingRequest = this.apiService
      .referringNodes(id, page, pageSize)
      .subscribe({
        next: (response: ReferringNodesResponse) => {
          this.referringNodesResponse.set(response);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load referring nodes: ' + err.message);
          this.loading.set(false);
        },
      });
  }
}
