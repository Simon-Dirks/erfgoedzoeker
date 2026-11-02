import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { featherX } from '@ng-icons/feather-icons';
import { DrawerToggleButtonComponent } from './drawer-toggle-button/drawer-toggle-button.component';

@Component({
  selector: 'app-drawer-layout',

  imports: [CommonModule, DrawerToggleButtonComponent, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drawer-layout.component.html',
})
export class DrawerLayoutComponent implements AfterViewInit {
  drawerId = input<string>('drawer');
  sidebarWidth = input<string>('18rem');
  forceOpen = input<boolean>(true);
  sidebarTitle = input<string>('');
  sidebarTitleBadge = input<string>();
  clearAllFilters = output<void>();

  drawerCheckbox = viewChild<ElementRef<HTMLInputElement>>('drawerCheckbox');

  isOpen = signal(this.forceOpen());

  protected readonly featherX = featherX;

  constructor() {
    effect(() => {
      this.isOpen.set(this.forceOpen());
    });
  }

  ngAfterViewInit() {
    const checkboxRef = this.drawerCheckbox();
    if (checkboxRef) {
      const checkbox = checkboxRef.nativeElement;
      checkbox.addEventListener('change', () => {
        this.isOpen.set(checkbox.checked);
      });
    }
  }

  toggleDrawer() {
    this.isOpen.update((value) => !value);
  }
}
