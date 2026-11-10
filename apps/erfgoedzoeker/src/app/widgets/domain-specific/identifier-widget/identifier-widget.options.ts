import { TextWidgetOptions } from '../../generic/text-widget/text-widget.options';

export interface IdentifierWidgetOptions extends TextWidgetOptions {
  excludePropertyIds?: string[];
}
