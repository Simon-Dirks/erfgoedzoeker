import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { TextWidget } from '../../generic/text-widget/text-widget.component';
import { IdentifierWidgetOptions } from './identifier-widget.options';

interface Identifier {
  value: string;
  propertyID?: string;
}

@Component({
  selector: 'app-identifier-widget',
  imports: [TextWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './identifier-widget.component.html',
})
export class IdentifierWidget extends BaseWidget {
  private excludedPropertyIds = computed(
    () =>
      new Set((this.options() as IdentifierWidgetOptions).excludePropertyIds),
  );

  identifiers = computed<string[]>(() =>
    (this.values() as Identifier[])
      .filter(
        (identifier) =>
          identifier?.value &&
          !this.excludedPropertyIds().has(identifier.propertyID ?? ''),
      )
      .map((identifier) => identifier.value),
  );

  nodeWithIdentifiers = computed<NodeModel>(() => ({
    id: 'identifiers',
    identifiers: this.identifiers(),
  }));
}
