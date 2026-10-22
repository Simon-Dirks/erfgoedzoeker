import { computed, inject, Injectable } from '@angular/core';
import { IconKey, RangeFilterConfig } from '@erfgoedzoeker/config-schema';
import { getIcon } from '@erfgoedzoeker/icon-registry';
import { ConfigService } from '../../../config/config.service';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private configService = inject(ConfigService);

  private readonly filterConfigMap = computed(() => {
    const filters = this.configService.filters();
    return new Map(filters.map((config) => [config.name, config]));
  });

  private readonly filterOrderMap = computed(() => {
    const filters = this.configService.filters();
    return new Map(filters.map((config, index) => [config.name, index]));
  });

  getVisibleRangeFilterConfigs(): RangeFilterConfig[] {
    return this.configService
      .filters()
      .filter(
        (f): f is RangeFilterConfig =>
          f.type === 'dateRange' || f.type === 'numberRange',
      )
      .filter((f) => !f.hidden);
  }

  isHidden(name: string): boolean {
    return this.filterConfigMap().get(name)?.hidden ?? false;
  }

  getLabel(name: string): string {
    return this.filterConfigMap().get(name)?.label ?? name;
  }

  getIconKey(name: string): IconKey | undefined {
    return this.filterConfigMap().get(name)?.icon;
  }

  getIcon(name: string): string | undefined {
    const iconKey = this.getIconKey(name);
    return iconKey ? getIcon(iconKey) : undefined;
  }

  sortFilters<T extends { name: string }>(items: T[]): T[] {
    const orderMap = this.filterOrderMap();
    return [...items].sort((a, b) => {
      const orderA = orderMap.get(a.name) ?? 999;
      const orderB = orderMap.get(b.name) ?? 999;
      return orderA - orderB;
    });
  }
}
