import { NodeModel } from './node.model';

export type IsPartOfNode = NodeModel & {
  publisher?: NodeModel;
  license?: NodeModel;
};
