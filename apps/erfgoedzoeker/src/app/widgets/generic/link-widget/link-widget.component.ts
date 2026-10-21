import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NodeLinkListComponent } from '../../../node/node-link-list/node-link-list.component';
import { isNodeModel, NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { TextWidget } from '../text-widget/text-widget.component';
import { LinkWidgetOptions } from './link-widget.options';

@Component({
  selector: 'app-link-widget',
  imports: [CommonModule, TextWidget, NodeLinkListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './link-widget.component.html',
})
export class LinkWidget extends BaseWidget {
  nodeValues = computed(() => {
    return this.values().filter((value) => isNodeModel(value));
  });

  literalValues = computed(() => {
    return this.values().filter((value) => !isNodeModel(value));
  });

  nodeWithLiteralValues = computed<NodeModel>(() => ({
    id: 'literal-values',
    literals: this.literalValues(),
  }));

  typedOptions = computed(() => this.options() as LinkWidgetOptions);

  textOptions = computed(() => ({
    showPropertyLabel: false,
    asH2: this.typedOptions().asH2,
    bold: this.typedOptions().bold,
    largeFont: this.typedOptions().largeFont,
    maxLength: this.typedOptions().maxLength,
    enableHighlights: this.typedOptions().enableHighlights,
  }));
}
