import { describe, expect, it } from 'vitest';
import { toSizeLabel } from './size-label.util';

describe('toSizeLabel', () => {
  it('prefers the statement', () => {
    expect(
      toSizeLabel({
        statement: '10 x 20 cm',
        value: 10,
        unitText: 'cm',
      }),
    ).toBe('10 x 20 cm');
  });

  it('combines dimension, value and unit', () => {
    expect(
      toSizeLabel({
        valueReference: { name: 'Height' },
        value: 10,
        unitText: 'cm',
      }),
    ).toBe('Height: 10 cm');
  });

  it('falls back to description and unit code name', () => {
    expect(
      toSizeLabel({
        description: 'Width',
        value: 0,
        unitCode: { name: 'millimetre' },
      }),
    ).toBe('Width: 0 millimetre');
  });

  it('returns an empty string when there is nothing to show', () => {
    expect(toSizeLabel({})).toBe('');
  });
});
