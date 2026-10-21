import { CommonModule } from '@angular/common';
import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseWidget } from '../../base-widget';
import { SeparatorWidgetOptions } from './separator-widget.options';

@Component({
  selector: 'app-separator-widget',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './separator-widget.component.html',
})
export class SeparatorWidget extends BaseWidget {
  protected readonly separatorOptions = computed(
    () => this.options() as SeparatorWidgetOptions,
  );
}
