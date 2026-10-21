import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  LOCALE_ID,
} from '@angular/core';
import {
  formatIsoYear,
  parseIsoDate,
} from '../../../data-utils/date-parsing.util';
import { normalizeToFirst } from '../../../data-utils/value-normalization.util';
import { NodeComponent } from '../../../node/node.component';
import { NodeModel } from '../../../node/types/node.model';
import { BaseResultsView } from '../base-results-view';

interface TimelineEntry {
  node: NodeModel;
  year: string;
}

function extractYear(node: NodeModel, locale: string): string | undefined {
  const dateCreated = normalizeToFirst<string>(node['dateCreated']);
  if (!dateCreated) return undefined;

  const parsed = parseIsoDate(dateCreated);
  return parsed ? formatIsoYear(parsed, locale) : undefined;
}

@Component({
  selector: 'app-timeline-view',
  imports: [NodeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timeline-view.component.html',
  styleUrl: './timeline-view.component.scss',
})
export class TimelineViewComponent extends BaseResultsView {
  private readonly locale = inject(LOCALE_ID);

  entries = computed<TimelineEntry[]>(() => {
    return this.results().map((node) => ({
      node,
      year: extractYear(node, this.locale) ?? 'Geen datum beschikbaar',
    }));
  });
}
