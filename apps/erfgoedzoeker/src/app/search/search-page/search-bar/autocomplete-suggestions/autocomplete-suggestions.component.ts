import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { LoadingSpinnerComponent } from '../../../../ui/loading-spinner/loading-spinner.component';
import { AutocompleteService } from '../autocomplete.service';

@Component({
  selector: 'app-autocomplete-suggestions',
  imports: [CommonModule, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-suggestions.component.html',
})
export class AutocompleteSuggestionsComponent {
  protected autocomplete = inject(AutocompleteService);

  suggestions = input<string[]>([]);
  loading = input<boolean>(false);
  activeIndex = input<number>(-1);

  selectSuggestion = output<string>();
  hoverIndex = output<number>();
}
