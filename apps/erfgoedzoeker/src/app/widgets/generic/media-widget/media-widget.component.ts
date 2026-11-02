import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { normalizeToArray } from '../../../data-utils/value-normalization.util';
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

  readonly iiifProperty = computed(
    () => (this.options() as MediaWidgetOptions).iiifProperty ?? 'iiifManifest',
  );

  readonly imageProperty = computed(
    () =>
      (this.options() as MediaWidgetOptions).imageProperty ?? 'associatedMedia',
  );

  readonly hasManifest = computed(() => {
    return normalizeToArray(this.node()[this.iiifProperty()]).some(
      (value) => typeof value === 'string' && value.trim().length > 0,
    );
  });

  readonly displayMode = computed<'iiif' | 'image' | null>(() => {
    const property = this.property();
    if (this.hasManifest()) {
      return property === this.iiifProperty() ? 'iiif' : null;
    }

    return property === this.imageProperty() ? 'image' : null;
  });

  override readonly shouldHide = computed(() => this.displayMode() === null);

  readonly viewerType = computed(() => {
    return (this.options() as MediaWidgetOptions).iiifViewer ?? 'tify';
  });
}
