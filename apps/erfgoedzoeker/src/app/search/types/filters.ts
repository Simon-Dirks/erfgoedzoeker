type FacetName = string;
type FacetValue = string;

export type Filters = Record<FacetName, Set<FacetValue>>;

export type SerializableFilters = Record<FacetName, FacetValue[]>;
