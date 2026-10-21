export interface NodeModel {
  id: string;
  type?: string | string[];
  name?: string | string[];
  [key: string]: any;
}

export function isNodeModel(value: any): value is NodeModel {
  return value && typeof value === 'object' && 'id' in value;
}
