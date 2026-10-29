import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherInfo } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-wip-banner',
  imports: [NgIcon],
  templateUrl: './wip-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherInfo })],
})
export class WipBannerComponent {
  private banner = viewChild.required<ElementRef<HTMLElement>>('banner');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const el = this.banner().nativeElement;
      const updateHeight = () =>
        document.documentElement.style.setProperty(
          '--wip-banner-height',
          `${el.offsetHeight}px`,
        );

      updateHeight();

      const observer = new ResizeObserver(updateHeight);
      observer.observe(el);

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        document.documentElement.style.removeProperty('--wip-banner-height');
      });
    });
  }
}
