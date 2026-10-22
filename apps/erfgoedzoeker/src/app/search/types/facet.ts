import { FilterValue } from './filters';

export interface FacetValue {
  type: 'FacetValue';
  value: string | boolean;
  label?: string;
  count: number;
}

export interface Facet {
  type: 'OrderedCollection';
  name: string;
  orderedItems: FacetValue[];
}

export function isFacetValue(v: FilterValue | undefined): v is Set<string> {
  return v instanceof Set;
}
