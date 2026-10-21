import {
  Component,
  inject,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-banner',
  templateUrl: './header-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class HeaderBannerComponent {
  private router = inject(Router);
  hideSubtitle = input(false);

  goToHome(): void {
    this.router.navigate(['/'], {
      queryParams: {},
    });
  }
}
