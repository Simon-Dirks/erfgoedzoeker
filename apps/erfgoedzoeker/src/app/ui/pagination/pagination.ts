import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherChevronLeft,
  featherChevronRight,
} from '@ng-icons/feather-icons';

export const DEFAULT_PAGE_SIZE_OPTIONS: readonly number[] = [10, 20, 50, 100];

let nextInstanceId = 0;

@Component({
  selector: 'app-pagination',
  imports: [NgIconComponent],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherChevronLeft, featherChevronRight })],
})
export class Pagination {
  currentPage = input.required<number>();
  totalItems = input.required<number>();
  pageSize = input.required<number>();
  pageSizeOptions = input(DEFAULT_PAGE_SIZE_OPTIONS);
  label = input('Pagination');
  pageChange = output<number>();
  pageSizeChange = output<number>();

  private readonly instanceId = nextInstanceId++;
  protected readonly pageInputId = `pagination-page-input-${this.instanceId}`;
  protected readonly pageSizeSelectId = `pagination-page-size-select-${this.instanceId}`;

  protected readonly selectablePageSizes = computed(() => {
    const options = this.pageSizeOptions();
    const pageSize = this.pageSize();
    return options.includes(pageSize)
      ? options
      : [...options, pageSize].sort((a, b) => a - b);
  });

  protected readonly totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.pageSize());
  });

  protected readonly hasPrevious = computed(() => {
    return this.currentPage() > 1;
  });

  protected readonly hasNext = computed(() => {
    return this.currentPage() < this.totalPages();
  });

  goToPage(page: number): void {
    const clampedPage = Math.min(Math.max(page, 1), this.totalPages());
    if (clampedPage !== this.currentPage()) {
      this.pageChange.emit(clampedPage);
    }
  }

  goToInputPage(value: string, input: HTMLInputElement): void {
    const parsed = parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      this.goToPage(parsed);
    }
    input.value = String(this.currentPage());
  }

  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newPageSize = parseInt(select.value, 10);
    if (!Number.isNaN(newPageSize) && newPageSize !== this.pageSize()) {
      this.pageSizeChange.emit(newPageSize);
    }
  }

  goToPrevious(): void {
    if (this.hasPrevious()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  goToNext(): void {
    if (this.hasNext()) {
      this.goToPage(this.currentPage() + 1);
    }
  }
}
