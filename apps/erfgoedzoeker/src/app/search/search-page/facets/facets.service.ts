import { Injectable, computed, inject } from '@angular/core';
import { IconKey } from '@erfgoedzoeker/config-schema';
import { getIcon } from '@erfgoedzoeker/icon-registry';
import { ConfigService } from '../../../config/config.service';

@Injectable({ providedIn: 'root' })
export class FacetsService {
  private configService = inject(ConfigService);

  private readonly facetConfigMap = computed(() => {
    const facets = this.configService.facets();
    return new Map(facets.map((config) => [config.name, config]));
  });

  private readonly facetOrderMap = computed(() => {
    const facets = this.configService.facets();
    return new Map(facets.map((config, index) => [config.name, index]));
  });

  getFacetLabel(facetName: string): string {
    return this.facetConfigMap().get(facetName)?.label || facetName;
  }

  isFacetHidden(facetName: string): boolean {
    return this.facetConfigMap().get(facetName)?.hidden ?? false;
  }

  getFacetIconKey(facetName: string): IconKey | undefined {
    return this.facetConfigMap().get(facetName)?.icon;
  }

  getFacetIcon(facetName: string): string | undefined {
    const iconKey = this.getFacetIconKey(facetName);
    return iconKey ? getIcon(iconKey) : undefined;
  }

  sortFacets<T extends { name: string }>(facets: T[]): T[] {
    const orderMap = this.facetOrderMap();
    return [...facets].sort((a, b) => {
      const orderA = orderMap.get(a.name) ?? 999;
      const orderB = orderMap.get(b.name) ?? 999;
      return orderA - orderB;
    });
  }
}
