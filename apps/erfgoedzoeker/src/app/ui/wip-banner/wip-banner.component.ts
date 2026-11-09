import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherInfo, featherX } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-wip-banner',
  imports: [NgIcon],
  templateUrl: './wip-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherInfo, featherX })],
})
export class WipBannerComponent {
  protected readonly isDismissed = signal(false);
  private banner = viewChild<ElementRef<HTMLElement>>('banner');
  private destroyRef = inject(DestroyRef);
  private resizeObserver?: ResizeObserver;

  constructor() {
    afterNextRender(() => {
      if (this.readDismissedState()) {
        this.isDismissed.set(true);
        return;
      }

      const el = this.banner()?.nativeElement;
      if (!el) return;

      const updateHeight = () =>
        document.documentElement.style.setProperty(
          '--wip-banner-height',
          `${el.offsetHeight}px`,
        );

      updateHeight();

      const observer = new ResizeObserver(updateHeight);
      observer.observe(el);
      this.resizeObserver = observer;

      this.destroyRef.onDestroy(() => this.cleanupBanner());
    });
  }

  protected dismiss(): void {
    this.isDismissed.set(true);

    try {
      sessionStorage.setItem('wip-banner-dismissed', 'true');
    } catch {
      console.warn('Could not save WIP banner dismissal to session storage');
    }

    this.cleanupBanner();
  }

  private readDismissedState(): boolean {
    try {
      return sessionStorage.getItem('wip-banner-dismissed') === 'true';
    } catch {
      return false;
    }
  }

  private cleanupBanner(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    document.documentElement.style.removeProperty('--wip-banner-height');
  }
}
