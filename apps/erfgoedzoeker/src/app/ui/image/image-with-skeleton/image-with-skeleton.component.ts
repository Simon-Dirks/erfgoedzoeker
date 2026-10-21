import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ImageSkeletonComponent } from '../image-skeleton/image-skeleton.component';

@Component({
  selector: 'app-image-with-skeleton',
  imports: [ImageSkeletonComponent],
  templateUrl: './image-with-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block relative w-full h-full',
  },
})
export class ImageWithSkeletonComponent {
  src = input.required<string>();
  alt = input.required<string>();
  skeletonAspectRatio = input<string>('4/3');
  skeletonMinHeightPx = input<number>();
  objectFit = input<'cover' | 'contain'>('cover');
  imageError = output<Event>();

  protected readonly isLoading = signal(true);

  onImageLoaded(): void {
    this.isLoading.set(false);
  }

  onImageError(event: Event): void {
    this.isLoading.set(false);
    this.imageError.emit(event);
  }
}
