import { NodeModel } from '../../node/types/node.model';
import { Facet } from './facet';

export interface SearchResponse {
  id: string;
  type: 'OrderedCollectionPage';
  partOf: {
    id: string;
    type: 'OrderedCollection';
    totalItems: number;
    first?: string;
    last?: string;
    facets?: Facet[];
  };
  next?: string;
  prev?: string;
  startIndex: number;
  orderedItems: NodeModel[];
}
