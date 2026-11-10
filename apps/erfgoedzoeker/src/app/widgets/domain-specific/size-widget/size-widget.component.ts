import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { TextWidget } from '../../generic/text-widget/text-widget.component';
import { SizeQuantity, toSizeLabel } from './size-label.util';

@Component({
  selector: 'app-size-widget',
  imports: [TextWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './size-widget.component.html',
})
export class SizeWidget extends BaseWidget {
  sizeLabels = computed<string[]>(() =>
    (this.values() as SizeQuantity[]).map(toSizeLabel).filter(Boolean),
  );

  nodeWithSizeLabels = computed<NodeModel>(() => ({
    id: 'size',
    size: this.sizeLabels(),
  }));
}
