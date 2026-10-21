import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { addUriPrefix, hasUriPrefix } from './details-page-uri-prefix';
import { isValidDetailsUri } from './details-route.matcher';

/**
 * Custom URL serializer that handles details routes with unencoded URIs.
 * Example: https://erfgoedzoeker.nl/details/http://example.com or https://erfgoedzoeker.nl/details/uri:http://example.com.
 */
export class ErfgoedzoekerUrlSerializer implements UrlSerializer {
  private defaultSerializer = new DefaultUrlSerializer();

  // Matches details routes, format: /details/{uri}?{query}
  private readonly DETAILS_ROUTE_PATTERN = /^\/details\/(.+?)(\?.*)?$/;

  parse(url: string): UrlTree {
    const detailsMatch = url.match(this.DETAILS_ROUTE_PATTERN);
    if (!detailsMatch) {
      return this.defaultSerializer.parse(url);
    }

    const [, uriPart, queryString = ''] = detailsMatch;
    const normalizedUri = this.normalizeWithUriPrefix(uriPart);
    const encodedUri = encodeURIComponent(normalizedUri);

    return this.defaultSerializer.parse(`/details/${encodedUri}${queryString}`);
  }

  serialize(tree: UrlTree): string {
    const serialized = this.defaultSerializer.serialize(tree);
    const detailsMatch = serialized.match(this.DETAILS_ROUTE_PATTERN);

    if (!detailsMatch) {
      return serialized;
    }

    const [, encodedUriPart, queryString = ''] = detailsMatch;
    const decodedUri = decodeURIComponent(encodedUriPart);

    if (isValidDetailsUri(decodedUri)) {
      const normalizedUri = this.normalizeWithUriPrefix(decodedUri);
      return `/details/${normalizedUri}${queryString}`;
    }

    return serialized;
  }

  private normalizeWithUriPrefix(uri: string): string {
    if (hasUriPrefix(uri)) {
      return uri;
    }
    if (uri.startsWith('http://') || uri.startsWith('https://')) {
      return addUriPrefix(uri);
    }
    return uri;
  }
}
