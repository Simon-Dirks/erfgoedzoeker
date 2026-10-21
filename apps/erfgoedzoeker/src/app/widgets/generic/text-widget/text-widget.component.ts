import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { HighlightedTextComponent } from '../../../ui/highlighted-text/highlighted-text.component';
import { TruncatedTextComponent } from '../../../ui/truncated-text/truncated-text.component';
import { BaseWidget } from '../../base-widget';
import { TextWidgetOptions } from './text-widget.options';

@Component({
  selector: 'app-text-widget',

  templateUrl: './text-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, HighlightedTextComponent, TruncatedTextComponent],
})
export class TextWidget extends BaseWidget {
  asH2 = computed(() => {
    return (this.options() as TextWidgetOptions).asH2 === true;
  });

  largeFont = computed(() => {
    return (this.options() as TextWidgetOptions).largeFont === true;
  });

  bold = computed(() => {
    return (this.options() as TextWidgetOptions).bold === true;
  });

  maxLength = computed(() => {
    return (this.options() as TextWidgetOptions).maxLength;
  });

  enableHighlights = computed(() => {
    return (this.options() as TextWidgetOptions).enableHighlights === true;
  });
}
