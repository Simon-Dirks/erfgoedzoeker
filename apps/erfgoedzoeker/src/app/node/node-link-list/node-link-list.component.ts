import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NodeImageResolverService } from '../node-image-resolver.service';
import { NodeLinkVariant } from '../node-link/node-link-variant';
import { NodeLinkComponent } from '../node-link/node-link.component';
import { NodeModel } from '../types/node.model';

@Component({
  selector: 'app-node-link-list',
  imports: [NodeLinkComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './node-link-list.component.html',
})
export class NodeLinkListComponent {
  readonly nodes = input.required<NodeModel[]>();
  readonly mode = input<NodeLinkVariant | 'auto'>('auto');
  readonly isExternal = input<boolean | undefined>(undefined);

  protected imageResolver = inject(NodeImageResolverService);

  protected getNodeLinkVariant(node: NodeModel): NodeLinkVariant {
    if (this.mode() !== 'auto') {
      return this.mode() as NodeLinkVariant;
    }
    return this.imageResolver.hasImage(node) ? 'image-card' : 'inline';
  }
}
