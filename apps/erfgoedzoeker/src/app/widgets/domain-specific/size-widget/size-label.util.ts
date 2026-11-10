export interface SizeQuantity {
  statement?: string;
  description?: string;
  value?: number;
  unitText?: string;
  unitCode?: { name?: string };
  valueReference?: { name?: string };
}

export function toSizeLabel(quantity: SizeQuantity): string {
  const { statement, description, value, unitText, unitCode, valueReference } =
    quantity;

  if (statement) return statement;

  const dimension = valueReference?.name || description;
  const unit = unitText ?? unitCode?.name;
  const measurement = [value, unit].filter((part) => part != null);
  const measurementString = measurement.join(' ');

  return [dimension, measurementString].filter(Boolean).join(': ');
}
