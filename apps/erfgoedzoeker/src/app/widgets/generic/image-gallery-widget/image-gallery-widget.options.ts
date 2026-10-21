import { WidgetOptions } from '@erfgoedzoeker/config-schema';

export interface ImageGalleryWidgetOptions extends WidgetOptions {
  maxThumbnails?: number;
  enableLightbox?: boolean;
}
