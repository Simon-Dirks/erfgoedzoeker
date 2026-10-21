import { Injectable } from '@angular/core';
import { NodePresentationConfig, Widget } from '@erfgoedzoeker/config-schema';
import {
  WidgetsByPosition,
  WidgetWithProperty,
} from './core/types/widgets-by-position';

@Injectable({ providedIn: 'root' })
export class WidgetService {
  getWidgetsByPosition(
    properties: string[],
    presentationConfig: NodePresentationConfig,
  ): WidgetsByPosition {
    const widgetsWithProperties: WidgetWithProperty[] =
      this.matchPropertiesToWidgets(properties, presentationConfig);

    return this.groupByPosition(widgetsWithProperties);
  }

  private matchPropertiesToWidgets(
    properties: string[],
    presentationConfig: NodePresentationConfig,
  ): WidgetWithProperty[] {
    const widgetsWithProperties: WidgetWithProperty[] = [];
    const propertiesSet = new Set(properties);

    const propertiesMatchedByNonFallbackWidgets = new Set<string>();
    presentationConfig.widgets.forEach((widget: Widget) => {
      const widgetProperties = widget.properties ?? [];
      if (!widget.isFallback && widgetProperties.length > 0) {
        widgetProperties.forEach((property: string) => {
          if (propertiesSet.has(property)) {
            propertiesMatchedByNonFallbackWidgets.add(property);
          }
        });
      }
    });

    const widgets = presentationConfig.widgets.filter(
      (widget: Widget) => !widget.hidden,
    );

    widgets.forEach((widget: Widget) => {
      const widgetProperties = widget.properties ?? [];
      const widgetHasProperties = widgetProperties.length > 0;
      if (widget.isFallback) {
        const unmatchedProperties = Array.from(propertiesSet).filter(
          (prop) => !propertiesMatchedByNonFallbackWidgets.has(prop),
        );
        unmatchedProperties.forEach((property: string) => {
          widgetsWithProperties.push({ property, widget });
        });
      } else if (widgetHasProperties) {
        widgetProperties.forEach((property: string) => {
          if (propertiesSet.has(property)) {
            widgetsWithProperties.push({ property, widget });
          }
        });
      } else {
        widgetsWithProperties.push({ property: '', widget });
      }
    });

    return widgetsWithProperties;
  }

  private groupByPosition(
    widgetsWithProperties: WidgetWithProperty[],
  ): WidgetsByPosition {
    const byPosition: WidgetsByPosition = {
      top: [],
      left: [],
      main: [],
      right: [],
      bottom: [],
    };

    widgetsWithProperties.forEach(({ property, widget }) => {
      const position = widget.options?.position || 'main';
      byPosition[position].push({ property, widget });
    });

    return byPosition;
  }
}
