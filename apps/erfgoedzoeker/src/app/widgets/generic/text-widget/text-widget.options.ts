import { WidgetOptions } from '@erfgoedzoeker/config-schema';

export interface TextWidgetOptions extends WidgetOptions {
  asH2?: boolean;
  largeFont?: boolean;
  bold?: boolean;
  maxLength?: number;
  enableHighlights?: boolean;
}
