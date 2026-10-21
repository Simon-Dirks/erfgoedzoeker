import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IsPartOfNode } from '../../../node/types/is-part-of.node';
import { NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { LinkWidget } from '../../generic/link-widget/link-widget.component';

interface Dataset extends IsPartOfNode {
  type: 'Dataset';
}

@Component({
  selector: 'app-dataset-widget',

  imports: [CommonModule, LinkWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dataset-widget.component.html',
})
export class DatasetWidget extends BaseWidget {
  datasets: Signal<Dataset[]> = computed<Dataset[]>(() => {
    return this.values().filter(
      (value): value is Dataset => value?.type === 'Dataset',
    );
  });

  nodeWithDatasets = computed<NodeModel>(() => ({
    id: 'datasets',
    datasets: this.datasets(),
  }));
}
