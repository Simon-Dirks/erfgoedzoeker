import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { Widget } from '@erfgoedzoeker/config-schema';
import { getWidgetComponent } from '../../../config/widget-component.registry';
import { NodeModel } from '../../../node/types/node.model';
import { BaseWidget } from '../../base-widget';
import { LinkWidget } from '../../generic/link-widget/link-widget.component';
import { PropertyLabelWrapperComponent } from '../property-label-wrapper/property-label-wrapper.component';

@Component({
  selector: 'app-dynamic-widget',

  templateUrl: './dynamic-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PropertyLabelWrapperComponent, LinkWidget, NgTemplateOutlet],
})
export class DynamicWidgetComponent implements AfterViewInit {
  data = input.required<NodeModel>();
  property = input.required<string>();
  widget = input.required<Widget>();

  widgetContainer = viewChild.required('widgetContainer', {
    read: ViewContainerRef,
  });

  private componentRef?: ComponentRef<BaseWidget>;
  private destroyRef = inject(DestroyRef);

  widgetInstance = signal<BaseWidget | undefined>(undefined);

  shouldHideWidget = computed(() => {
    const instance = this.widgetInstance();
    return instance?.shouldHide() ?? false;
  });

  stopClickPropagation = computed(
    () => this.widgetInstance()?.stopClickPropagation ?? false,
  );

  onClick(event: MouseEvent) {
    if (this.stopClickPropagation()) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  constructor() {
    effect(() => {
      this.data();
      this.property();
      this.widget();
      this.recreateWidget();
    });
  }

  ngAfterViewInit() {
    this.createWidget();
  }

  private createWidget() {
    const widget = this.widget();
    const componentClass = getWidgetComponent(widget.componentId);
    this.componentRef = this.widgetContainer().createComponent(componentClass);
    this.componentRef.setInput('node', this.data());
    this.componentRef.setInput('property', this.property());
    this.componentRef.setInput('options', widget.options ?? {});

    this.widgetInstance.set(this.componentRef.instance);

    this.destroyRef.onDestroy(() => {
      this.componentRef?.destroy();
    });
  }

  private recreateWidget() {
    if (!this.componentRef) return;

    this.componentRef.destroy();
    this.widgetContainer().clear();
    this.widgetInstance.set(undefined);
    this.createWidget();
  }
}
