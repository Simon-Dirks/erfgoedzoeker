import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherSearch } from '@ng-icons/feather-icons';
import { LoadingSpinnerComponent } from '../../../ui/loading-spinner/loading-spinner.component';
import { SearchStore } from '../../state/search.store';
import { AutocompleteSuggestionsComponent } from './autocomplete-suggestions/autocomplete-suggestions.component';
import { AutocompleteService } from './autocomplete.service';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    LoadingSpinnerComponent,
    AutocompleteSuggestionsComponent,
  ],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherSearch })],
  providers: [AutocompleteService],
})
export class SearchBarComponent {
  store = inject(SearchStore);
  protected autocomplete = inject(AutocompleteService);
  private router = inject(Router);

  protected readonly placeholder = signal(
    (() => {
      const placeholderExamples = ['kopje', 'servies', 'bord', 'melkkan'];
      const randomIndex = Math.floor(
        Math.random() * placeholderExamples.length,
      );
      return `Bijv. '${placeholderExamples[randomIndex]}'`;
    })(),
  );

  protected readonly searchInputValue = signal('');

  constructor() {
    effect(() => {
      this.searchInputValue.set(this.store.searchTerm());
    });
  }

  onSearchTermChange(value: string): void {
    this.searchInputValue.set(value);
    this.autocomplete.search(value);
  }

  private performSearch(searchTerm: string): void {
    this.router.navigate(['/search'], {
      queryParams: { q: searchTerm || undefined, filters: undefined, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  onSearch(): void {
    this.autocomplete.cancel();
    this.performSearch(this.searchInputValue());
  }

  onSuggestionSelect(suggestion: string): void {
    this.searchInputValue.set(suggestion);
    this.autocomplete.cancel();
    this.performSearch(suggestion);
  }

  onInputFocus(): void {
    if (this.searchInputValue()) {
      this.autocomplete.show();
    }
  }

  onInputBlur(): void {
    this.autocomplete.close();
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.autocomplete.moveActiveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.autocomplete.moveActiveUp();
        break;
      case 'Enter': {
        const suggestion = this.autocomplete.activeSuggestion();
        if (suggestion) {
          event.preventDefault();
          this.onSuggestionSelect(suggestion);
        } else {
          this.onSearch();
        }
        break;
      }
      case 'Escape':
        this.autocomplete.close();
        break;
    }
  }
}
