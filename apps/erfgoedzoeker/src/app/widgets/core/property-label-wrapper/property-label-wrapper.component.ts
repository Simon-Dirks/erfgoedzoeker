import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { WidgetOptions } from '@erfgoedzoeker/config-schema';
import { getIconOrUndefined } from '@erfgoedzoeker/icon-registry';

@Component({
  selector: 'app-property-label-wrapper',
  imports: [NgIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './property-label-wrapper.component.html',
})
export class PropertyLabelWrapperComponent {
  property = input.required<string>();
  options = input<WidgetOptions>({});

  showLabel = computed(() => this.options().showPropertyLabel !== false);
  displayLabel = computed(
    () => this.options().propertyLabel || this.property(),
  );
  icon = computed(() => getIconOrUndefined(this.options().icon));
}
