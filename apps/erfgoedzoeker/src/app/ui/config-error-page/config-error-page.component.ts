import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';

@Component({
  selector: 'app-config-error-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './config-error-page.component.html',
})
export class ConfigErrorPageComponent {
  protected readonly errorMessage = inject(ConfigService).loadError;

  constructor() {
    const router = inject(Router);
    effect(() => {
      if (this.errorMessage() === null) {
        router.navigate(['/'], { replaceUrl: true });
      }
    });
  }
}
