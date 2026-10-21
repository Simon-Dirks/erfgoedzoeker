import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { LinkWidget } from '../link-widget/link-widget.component';

@Component({
  selector: 'app-literal-link-widget',
  imports: [LinkWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './literal-link-widget.component.html',
})
export class LiteralLinkWidget extends BaseWidget {
  linkNode = computed<NodeModel>(() => ({
    id: 'literal-link-values',
    values: this.values().map((value): NodeModel => ({ id: String(value) })),
  }));

  linkOptions = computed(() => ({
    ...this.options(),
    propertyPath: undefined,
  }));
}
