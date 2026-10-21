import { Widget } from '@erfgoedzoeker/config-schema';

export interface WidgetWithProperty {
  property: string;
  widget: Widget;
}

export interface WidgetsByPosition {
  top: WidgetWithProperty[];
  left: WidgetWithProperty[];
  main: WidgetWithProperty[];
  right: WidgetWithProperty[];
  bottom: WidgetWithProperty[];
}
