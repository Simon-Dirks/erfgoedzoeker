import { Injectable, computed, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { ApiService } from '../../../api/api.service';
import { normalizeToFirst } from '../../../data-utils/value-normalization.util';
import { SearchResponse } from '../../types/search-response';

@Injectable()
export class AutocompleteService {
  private apiService = inject(ApiService);

  readonly suggestions = signal<string[]>([]);
  readonly loading = signal<boolean>(false);
  private readonly open = signal<boolean>(false);

  readonly showSuggestions = computed(
    () => this.open() && this.suggestions().length > 0,
  );

  readonly activeIndex = signal<number>(-1);
  readonly activeSuggestion = computed(() => {
    const index = this.activeIndex();
    const suggestions = this.suggestions();
    return index >= 0 && index < suggestions.length ? suggestions[index] : null;
  });

  readonly listboxId = 'search-autocomplete-listbox';
  readonly activeDescendantId = computed(() => {
    const index = this.activeIndex();
    return index >= 0 ? this.optionId(index) : null;
  });

  optionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  private readonly searchTermChanges = new Subject<string>();
  private readonly cancelled = new Subject<void>();

  constructor() {
    this.initAutocompleteOnSearchTermChanges();
  }

  search(term: string): void {
    this.activeIndex.set(-1);
    this.searchTermChanges.next(term);
  }

  show(): void {
    if (this.suggestions().length > 0) {
      this.open.set(true);
    }
  }

  close(): void {
    this.open.set(false);
    this.activeIndex.set(-1);
  }

  cancel(): void {
    this.cancelled.next();
    this.open.set(false);
    this.loading.set(false);
    this.activeIndex.set(-1);
    this.initAutocompleteOnSearchTermChanges();
  }

  moveActiveDown(): void {
    const length = this.suggestions().length;
    if (length === 0) {
      return;
    }
    this.activeIndex.update((current) =>
      current < length - 1 ? current + 1 : 0,
    );
  }

  moveActiveUp(): void {
    const length = this.suggestions().length;
    if (length === 0) {
      return;
    }
    this.activeIndex.update((current) =>
      current > 0 ? current - 1 : length - 1,
    );
  }

  setActiveIndex(index: number): void {
    this.activeIndex.set(index);
  }

  private initAutocompleteOnSearchTermChanges(): void {
    this.searchTermChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          if (!term || term.length < 1) {
            this.open.set(false);
            return [];
          }
          this.loading.set(true);
          return this.apiService.autocomplete({ q: term, page: 1, size: 5 });
        }),
        takeUntil(this.cancelled),
      )
      .subscribe({
        next: (response: SearchResponse) => {
          const suggestions: string[] = Array.from(
            new Set(
              response.orderedItems
                .map((item) => normalizeToFirst<string>(item.name))
                .filter((name): name is string => !!name),
            ),
          );

          this.suggestions.set(suggestions);
          this.activeIndex.set(-1);
          this.open.set(true);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          this.open.set(false);
        },
      });
  }
}
