import { RangeValue } from './range-value';

export type FilterValue = Set<string> | RangeValue;
export type Filters = Record<string, FilterValue>;
export type SerializableFilters = Record<string, string[] | RangeValue>;
