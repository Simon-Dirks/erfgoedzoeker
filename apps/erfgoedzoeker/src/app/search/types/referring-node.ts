import { NodeModel } from '../../node/types/node.model';

export interface ReferringNodesResponse {
  totalCount: number;
  nodes: NodeModel[];
}
