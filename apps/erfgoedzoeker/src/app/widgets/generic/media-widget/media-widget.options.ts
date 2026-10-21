import { WidgetOptions } from '@erfgoedzoeker/config-schema';

export type IIIFViewerType = 'tify' | 'universalviewer';

export interface MediaWidgetOptions extends WidgetOptions {
  iiifViewer?: IIIFViewerType;
}
