import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IiifUrlTransformerService {
  transformManifestUrl(originalUrl: string): string {
    return `https://proxy.erfgoedzoeker.nl/${originalUrl}`;
  }
}
