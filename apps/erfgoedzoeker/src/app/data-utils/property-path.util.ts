import { normalizeToArray } from './value-normalization.util';

function getPropertyFromObject(
  obj: unknown,
  propertyKey: string,
): unknown | undefined {
  const isObject =
    typeof obj === 'object' && obj !== null && !Array.isArray(obj);
  if (!isObject) return undefined;

  const hasProperty = propertyKey in obj;
  return hasProperty
    ? (obj as Record<string, unknown>)[propertyKey]
    : undefined;
}

function getFirstTruthyPropertyInArray(
  array: unknown[],
  propertyKey: string,
): unknown | undefined {
  for (const item of array) {
    const itemIsObject = item && typeof item === 'object';
    if (!itemIsObject) continue;

    const hasProperty = propertyKey in item;
    if (!hasProperty) continue;

    const propertyValue = (item as Record<string, unknown>)[propertyKey];
    const isTruthyValue =
      propertyValue !== undefined &&
      propertyValue !== null &&
      propertyValue !== '';
    if (isTruthyValue) {
      return propertyValue;
    }
  }
  return undefined;
}

export function getNestedValue(value: unknown, path: string): unknown {
  const pathSegments = path.split('.');

  return pathSegments.reduce((current: unknown, propertyKey: string) => {
    if (current === undefined || current === null) {
      return undefined;
    }

    if (Array.isArray(current)) {
      // E.g. Property path is 'associatedMedia.thumbnailUrl' → associatedMedia is an array → return first object where thumbnailUrl is truthy
      return getFirstTruthyPropertyInArray(current, propertyKey);
    }

    // E.g. Property path is 'creator.name' → creator is an object → return the name property from the creator object
    return getPropertyFromObject(current, propertyKey);
  }, value);
}

export function applyPropertyPath(values: unknown[], path: string): unknown[] {
  return values
    .map((v) => getNestedValue(v, path))
    .filter((v) => v !== null && v !== undefined)
    .flatMap((v) => normalizeToArray(v));
}
