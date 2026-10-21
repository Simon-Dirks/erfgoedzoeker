import { DestroyRef, inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private destroyRef = inject(DestroyRef);

  readonly isDesktop = signal(
    typeof window !== 'undefined' && window.innerWidth >= 1024,
  );

  constructor() {
    if (typeof window !== 'undefined') {
      const updateDesktop = () => {
        this.isDesktop.set(window.innerWidth >= 1024);
      };

      window.addEventListener('resize', updateDesktop);

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('resize', updateDesktop);
      });
    }
  }
}
