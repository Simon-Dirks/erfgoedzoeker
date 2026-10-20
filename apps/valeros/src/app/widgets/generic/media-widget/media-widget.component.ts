import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { BaseWidget } from '../../base-widget';
import { TifyIiifWidget } from '../iiif-widget/tify-iiif-widget/tify-iiif-widget.component';
import { UniversalviewerIiifWidget } from '../iiif-widget/universalviewer-iiif-widget/universalviewer-iiif-widget.component';
import { ImageGalleryWidget } from '../image-gallery-widget/image-gallery-widget.component';
import { MediaWidgetOptions } from './media-widget.options';

@Component({
  selector: 'app-media-widget',
  imports: [ImageGalleryWidget, TifyIiifWidget, UniversalviewerIiifWidget],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './media-widget.component.html',
})
export class MediaWidget extends BaseWidget {
  override readonly stopClickPropagation = true;

  readonly hasManifest = computed(() => {
    return this.values().length > 0;
  });

  readonly viewerType = computed(() => {
    return (this.options() as MediaWidgetOptions).iiifViewer ?? 'tify';
  });
}
