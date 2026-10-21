import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { normalizeToArray } from '../../../data-utils/value-normalization.util';
import { isNodeModel, NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { LinkWidget } from '../../generic/link-widget/link-widget.component';

interface ObjectWithName {
  name?: string;
  [key: string]: unknown;
}

interface RawCreator {
  role?: string[];
  creator?: ObjectWithName[];
}

interface NormalizedCreator {
  role: string[];
  nodeWithCreators: NodeModel;
}

@Component({
  selector: 'app-creator-widget',
  imports: [LinkWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './creator-widget.component.html',
})
export class CreatorWidget extends BaseWidget {
  normalizedCreators: Signal<NormalizedCreator[]> = computed<
    NormalizedCreator[]
  >(() => {
    return this.values()
      .map((value) => value as RawCreator)
      .map((wrapper) => {
        const allCreators: unknown[] = normalizeToArray(wrapper.creator);
        const creators: (NodeModel | string)[] = allCreators.flatMap<
          NodeModel | string
        >((creator) => {
          if (isNodeModel(creator)) return [creator];

          // Creators without an ID, but with a name
          const name = (creator as ObjectWithName).name;
          const creatorHasValidName =
            typeof name === 'string' && name.length > 0;
          return creatorHasValidName ? [name] : [];
        });
        return {
          role: normalizeToArray(wrapper.role),
          nodeWithCreators: { id: 'creators', creators } as NodeModel,
        };
      })
      .filter(
        (normalizedCreator) =>
          normalizedCreator.nodeWithCreators['creators'].length > 0,
      );
  });
}
