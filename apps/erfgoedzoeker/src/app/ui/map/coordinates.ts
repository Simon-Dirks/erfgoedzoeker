export type Coordinates = {
  latitude: number;
  longitude: number;
};

export function isCoordinates(obj: unknown): obj is Coordinates {
  if (!obj || typeof obj !== 'object') return false;
  const candidate = obj as Record<string, unknown>;
  return (
    typeof candidate['latitude'] === 'number' &&
    typeof candidate['longitude'] === 'number'
  );
}
