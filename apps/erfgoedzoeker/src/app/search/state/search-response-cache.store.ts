import { Injectable, signal } from '@angular/core';
import { SearchResponse } from '../types/search-response';

const MAX_CACHED_SEARCHES = 20;

@Injectable({
  providedIn: 'root',
})
export class SearchResponseCacheStore {
  private responses = new Map<string, SearchResponse>();
  currentSearchKey = signal<string | null>(null);

  get(key: string): SearchResponse | undefined {
    return this.responses.get(key);
  }

  set(key: string, response: SearchResponse): void {
    this.responses.set(key, response);

    if (this.responses.size > MAX_CACHED_SEARCHES) {
      const oldestKey = this.responses.keys().next().value;
      if (oldestKey !== undefined) {
        this.responses.delete(oldestKey);
      }
    }
  }

  setSearchKey(
    q: string,
    page: number,
    pageSize: number,
    sort: string | null,
    filters: string,
  ): string {
    const key = JSON.stringify([q, page, pageSize, sort, filters]);
    this.currentSearchKey.set(key);
    return key;
  }
}
