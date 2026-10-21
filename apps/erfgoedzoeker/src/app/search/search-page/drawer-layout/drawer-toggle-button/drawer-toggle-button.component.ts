import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-drawer-toggle-button',

  imports: [CommonModule, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drawer-toggle-button.component.html',
})
export class DrawerToggleButtonComponent {
  drawerId = input<string>('drawer');
  labelWhenOpen = input<string>('Verberg filters');
  labelWhenClosed = input<string>('Toon filters');
  buttonClass = input<string>('btn');
  isOpen = input<boolean>(true);
  icon = input<string>();
  iconSize = input<string>('16');
  iconOnly = input<boolean>(false);
  badge = input<string>();

  toggle = output<void>();

  onToggle() {
    this.toggle.emit();
  }
}
