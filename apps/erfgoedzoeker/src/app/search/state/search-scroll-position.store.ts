import { inject, Injectable } from '@angular/core';
import { SearchResponseCacheStore } from './search-response-cache.store';

@Injectable({
  providedIn: 'root',
})
export class SearchScrollPositionStore {
  private searchCache = inject(SearchResponseCacheStore);
  private positions = new Map<string, number>();

  saveCurrent(scrollY: number): void {
    const key = this.searchCache.currentSearchKey();
    if (!key) return;
    this.positions.set(key, scrollY);
  }

  popForCurrent(): number | undefined {
    const key = this.searchCache.currentSearchKey();
    if (!key) return undefined;
    const scrollY = this.positions.get(key);
    this.positions.delete(key);
    return scrollY;
  }
}
