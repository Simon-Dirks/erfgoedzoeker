import { Injectable, Type, computed, inject } from '@angular/core';
import {
  NodePresentationConfig,
  ViewDefinition,
  ViewOptions,
  ViewType,
} from '@erfgoedzoeker/config-schema';
import { ConfigService } from '../../config/config.service';
import { getViewComponent } from '../../config/view-component.registry';
import { BaseResultsView } from './base-results-view';

@Injectable({ providedIn: 'root' })
export class ViewService {
  private configService = inject(ConfigService);

  readonly allViewDefinitions = computed(() => {
    const views = this.configService.views();
    return views?.views.filter((v: ViewDefinition) => !v.options.hidden) || [];
  });

  getViewComponent(viewType: ViewType): Type<BaseResultsView> | null {
    const definition = this.getViewDefinition(viewType);
    return definition ? getViewComponent(definition.componentId) : null;
  }

  getViewOptions(viewType: ViewType): ViewOptions {
    return this.getViewDefinition(viewType)?.options || {};
  }

  getViewDefinition(viewType: ViewType): ViewDefinition | null {
    const views = this.configService.views();
    return (
      views?.views.find((v: ViewDefinition) => v.type === viewType) || null
    );
  }

  getDefaultViewType(): ViewType {
    return this.configService.defaultView();
  }

  getViewPresentationConfig(
    viewType: ViewType,
  ): NodePresentationConfig | undefined {
    return this.getViewDefinition(viewType)?.presentationConfig;
  }
}
