import { computed, Injectable, signal } from '@angular/core';
import { ErfgoedzoekerConfig } from '@erfgoedzoeker/config-schema';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private config = signal<ErfgoedzoekerConfig | null>(null);

  readonly loadError = signal<string | null>(null);

  readonly apiType = computed(() => this.config()?.api.type ?? 'graphql');
  readonly apiBaseUrl = computed(() => this.config()?.api.baseUrl ?? '');
  readonly facets = computed(() => this.config()?.facets ?? []);
  readonly imagePaths = computed(() => this.config()?.imagePaths ?? ['image']);
  readonly detailsPresentation = computed(
    () => this.config()?.detailsPresentation,
  );
  readonly views = computed(() => this.config()?.views);
  readonly defaultView = computed(
    () => this.config()?.views?.defaultView ?? 'list',
  );

  initialize(config: ErfgoedzoekerConfig): void {
    this.config.set(config);
  }

  setLoadError(message: string): void {
    this.loadError.set(message);
  }
}
