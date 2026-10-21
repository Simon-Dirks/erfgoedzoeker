import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
} from '@angular/core';
import {
  formatParsedIsoDate,
  parseIsoDate,
} from '../../../data-utils/date-parsing.util';
import { BaseWidget } from '../../base-widget';

interface FormattedDate {
  raw: string;
  display: string;
}

@Component({
  selector: 'app-date-widget',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-widget.component.html',
})
export class DateWidget extends BaseWidget {
  private readonly locale = inject(LOCALE_ID);

  dates = computed<FormattedDate[]>(() => {
    return this.values().map((value) => ({
      raw: value,
      display: this.formatDate(value),
    }));
  });

  private formatDate(value: string): string {
    const parsed = parseIsoDate(value);
    if (!parsed) return value;

    return formatParsedIsoDate(parsed, this.locale);
  }
}
