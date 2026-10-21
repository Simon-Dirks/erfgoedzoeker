import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NodeComponent } from '../../../node/node.component';
import { BaseResultsView } from '../base-results-view';

@Component({
  selector: 'app-list-view',
  imports: [NodeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-view.component.html',
})
export class ListViewComponent extends BaseResultsView {}
