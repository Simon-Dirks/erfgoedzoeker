import { FilterValue } from './filters';

export type RangeValue = { min?: string; max?: string };

export function isRangeValue(v: FilterValue): v is RangeValue {
  return typeof v === 'object' && v !== null && ('min' in v || 'max' in v);
}

export function hasActiveBounds(v: RangeValue): boolean {
  return !!(v.min || v.max);
}
