/**
 * Prefix used for details page URIs.
 * Example: https://erfgoedzoeker.nl/details/http://example.com is resolved to: https://erfgoedzoeker.nl/details/uri:http://example.com
 */
export const URI_PREFIX = 'uri:' as const;

export function addUriPrefix(id: string): string {
  return `${URI_PREFIX}${id}`;
}

export function removeUriPrefix(uri: string): string {
  if (uri.startsWith(URI_PREFIX)) {
    return uri.substring(URI_PREFIX.length);
  }
  return uri;
}

export function hasUriPrefix(uri: string): boolean {
  return uri.startsWith(URI_PREFIX);
}
