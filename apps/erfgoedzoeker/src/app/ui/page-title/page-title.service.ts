import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  private readonly PREFIX = 'Erfgoedzoeker • ';
  private titleService = inject(Title);

  setTitle(title: string): void {
    this.titleService.setTitle(`${this.PREFIX}${title}`);
  }

  setTitleWithFallback(
    title: string | null | undefined,
    fallback: string,
  ): void {
    const finalTitle = title || fallback;
    this.setTitle(finalTitle);
  }
}
