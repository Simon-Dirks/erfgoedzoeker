import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent {
  readonly message = input.required<string>();
}
