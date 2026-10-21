import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  AssociatedMediaNode,
  toImageModel,
} from '../../../node/types/associated-media.node';
import { ImageSkeletonComponent } from '../../../ui/image/image-skeleton/image-skeleton.component';
import { ImageWithSkeletonComponent } from '../../../ui/image/image-with-skeleton/image-with-skeleton.component';
import { Dimensions } from '../../../ui/image/types/dimensions';
import { ImageModel } from '../../../ui/image/types/image.model';
import { BaseWidget } from '../../base-widget';
import { IiifImageService } from '../iiif-widget/iiif-image.service';
import { ImageGalleryWidgetOptions } from './image-gallery-widget.options';

@Component({
  selector: 'app-image-gallery-widget',
  imports: [
    CommonModule,
    NgTemplateOutlet,
    ImageWithSkeletonComponent,
    ImageSkeletonComponent,
  ],
  templateUrl: './image-gallery-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './image-gallery-widget.component.scss',
})
export class ImageGalleryWidget extends BaseWidget implements OnDestroy {
  override readonly stopClickPropagation = true;

  private iiifService = inject(IiifImageService);
  private lightbox?: PhotoSwipeLightbox;
  readonly galleryId = `gallery-${crypto.randomUUID()}`;
  readonly imagesWithDimensions = signal<ImageModel[]>([]);

  protected readonly Array = Array;

  private get maxThumbnails(): number | undefined {
    const options = this.options() as ImageGalleryWidgetOptions;
    return options.maxThumbnails;
  }

  readonly displayedThumbnails = computed(() => {
    const images = this.imagesWithDimensions();
    const max = this.maxThumbnails;
    return max ? images.slice(0, max) : images;
  });

  readonly expectedThumbnailCount = computed(() => {
    const images = this.getImagesData();
    const max = this.maxThumbnails;
    return max ? Math.min(images.length, max) : images.length;
  });

  get isLightboxEnabled(): boolean {
    const options = this.options() as ImageGalleryWidgetOptions;
    return options.enableLightbox ?? true;
  }

  readonly isLoadingImageDimensions = computed(() => {
    // TODO: Ensure that this returns false when loading finishes, but no images are available
    return this.imagesWithDimensions().length === 0;
  });

  constructor() {
    super();
    effect(() => {
      const images = this.getImagesData();
      if (images.length > 0) {
        this.loadImageDimensions(images);
      }
    });
  }

  private getImagesData(): ImageModel[] {
    return (this.values() as AssociatedMediaNode[])
      .map((media: AssociatedMediaNode) => toImageModel(media))
      .filter((img) => img.src !== '');
  }

  private loadImageDimensions(images: ImageModel[]): void {
    const dimensionRequests: Observable<ImageModel>[] = images.map((img) => {
      if (!img.iiifInfoUrl) {
        // TODO: Add alternative way of retrieving image dimensions if IIIF is not available
        console.warn('IIIF info URL not available for image:', img.src);
        return of(img);
      }

      return this.iiifService.getImageDimensions(img.iiifInfoUrl).pipe(
        map((dimensions: Dimensions | null) => ({
          ...img,
          dimensions: dimensions || undefined,
        })),
      );
    });

    forkJoin(dimensionRequests).subscribe(
      (imagesWithDimensions: ImageModel[]) => {
        this.imagesWithDimensions.set(imagesWithDimensions);

        if (this.isLightboxEnabled) {
          setTimeout(() => {
            this.initializeLightbox();
          });
        }
      },
    );
  }

  private initializeLightbox(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: `#${this.galleryId}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      errorMsg: 'Er ging iets mis bij het laden van de afbeelding',
    });
    // this.lightbox.addFilter(
    //   'contentErrorElement',
    //   (contentErrorElement, content) => {
    //     const el = document.createElement('div');
    //     el.className = 'pswp__error-msg';
    //     el.innerHTML = `<img src="https://placehold.co/600x400.png" alt="Image unavailable" />`;
    //     return el;
    //   },
    // );
    // this.lightbox.addFilter('placeholderSrc', (placeholderSrc, content) => {
    //   return 'https://placehold.co/600x400.png';
    // });

    this.lightbox.init();
  }

  onThumbnailError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x400?text=X';
  }

  ngOnDestroy(): void {
    if (this.lightbox) {
      this.lightbox.destroy();
    }
  }
}
