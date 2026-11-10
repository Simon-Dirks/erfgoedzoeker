import { MaybeMultiple } from '../../data-utils/value-normalization.util';

export interface NodeModel {
  id: string;
  type?: MaybeMultiple<string>;
  name?: MaybeMultiple<string>;
  [key: string]: any;
}

export function isNodeModel(value: any): value is NodeModel {
  return value && typeof value === 'object' && 'id' in value;
}
