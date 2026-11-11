import {
  MaybeMultiple,
  normalizeToFirst,
} from '../../../data-utils/value-normalization.util';

export interface SizeQuantity {
  statement?: MaybeMultiple<string>;
  description?: MaybeMultiple<string>;
  value?: number;
  unitText?: string;
  unitCode?: { name?: MaybeMultiple<string> };
  valueReference?: { name?: MaybeMultiple<string> };
}

export function toSizeLabel(quantity: SizeQuantity): string {
  const { value, unitText, unitCode, valueReference } = quantity;
  const statement = normalizeToFirst<string>(quantity.statement);

  if (statement) return statement;

  const measured = normalizeToFirst<string>(valueReference?.name);
  const part = normalizeToFirst<string>(quantity.description);
  const dimension =
    measured && part && measured !== part
      ? `${measured} (${part})`
      : measured || part;
  const unit = unitText ?? normalizeToFirst<string>(unitCode?.name);
  const measurement = [value, unit].filter((part) => part != null);
  const measurementString = measurement.join(' ');

  return [dimension, measurementString].filter(Boolean).join(': ');
}
