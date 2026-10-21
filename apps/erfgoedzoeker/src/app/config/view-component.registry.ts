import { Type } from '@angular/core';
import { ViewComponentKey } from '@erfgoedzoeker/config-schema';
import { BaseResultsView } from '../search/views/base-results-view';
import { GridViewComponent } from '../search/views/grid-view/grid-view.component';
import { ListViewComponent } from '../search/views/list-view/list-view.component';
import { MapViewComponent } from '../search/views/map-view/map-view.component';
import { TimelineViewComponent } from '../search/views/timeline-view/timeline-view.component';

export const VIEW_COMPONENT_REGISTRY: Record<
  ViewComponentKey,
  Type<BaseResultsView>
> = {
  'list-view': ListViewComponent,
  'grid-view': GridViewComponent,
  'map-view': MapViewComponent,
  'timeline-view': TimelineViewComponent,
} as const;

export function getViewComponent(key: ViewComponentKey): Type<BaseResultsView> {
  return VIEW_COMPONENT_REGISTRY[key];
}
