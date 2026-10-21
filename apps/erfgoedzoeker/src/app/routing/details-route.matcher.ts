import { UrlMatchResult, UrlSegment } from '@angular/router';
import { hasUriPrefix } from './details-page-uri-prefix';

export function isValidDetailsUri(uri: string): boolean {
  return (
    hasUriPrefix(uri) || uri.startsWith('http://') || uri.startsWith('https://')
  );
}

export function detailsRouteMatcher(
  segments: UrlSegment[],
): UrlMatchResult | null {
  if (segments.length < 2 || segments[0].path !== 'details') {
    return null;
  }

  const encodedId = segments[1].path;
  let decodedId: string;

  try {
    decodedId = decodeURIComponent(encodedId);
  } catch {
    decodedId = encodedId;
  }

  if (!isValidDetailsUri(decodedId)) {
    return null;
  }

  return {
    consumed: segments.slice(0, 2),
    posParams: {
      id: new UrlSegment(decodedId, {}),
    },
  };
}
