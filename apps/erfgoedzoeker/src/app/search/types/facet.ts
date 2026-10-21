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
