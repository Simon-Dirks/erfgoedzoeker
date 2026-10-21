# Creating Custom Widgets

While Erfgoedzoeker provides [built-in widgets](/guide/built-in-widgets) for common use cases, you can create custom widgets for domain-specific or specialized data presentation needs.

## When to Create a Custom Widget

Create a custom widget when:

- You need specialized rendering logic for a specific data type
- [Built-in widgets](/guide/built-in-widgets) don't provide the functionality you need

For simple customization of existing widgets, consider adjusting widget options (e.g. `propertyLabel`, `icon`, `position`) through the [Configurator](/guide/configuration-system) first.

## Creating a Widget Component

### 1. Create the Component

Create a new [Angular component](https://angular.dev/essentials/components#defining-a-component) in `src/app/widgets/`. The default structure organizes domain-specific widgets in `domain-specific/` and reusable widgets in `generic/`, but you can use any structure you prefer:

```
src/app/widgets/
├── domain-specific/
│   └── your-widget/
│       ├── your-widget.component.ts
│       └── your-widget.component.html
└── generic/
    └── another-widget/
        ├── another-widget.component.ts
        └── another-widget.component.html
```

### 2. Extend BaseWidget

Your component must extend `BaseWidget` to access the widget system's core functionality:

```ts
import { Component, computed, Signal } from '@angular/core';
import { BaseWidget } from '../../base-widget';

@Component({
  selector: 'app-your-widget',
  imports: [],
  templateUrl: './your-widget.component.html',
})
export class YourWidget extends BaseWidget {
  // Your custom logic here
}
```

### 3. Use BaseWidget Properties

`BaseWidget` provides these computed properties:

- **`node()`** - The current heritage object
- **`property()`** - The property name this widget is rendering (e.g., `"creator"`)
- **`options()`** - Configuration options passed from the widget config (e.g., `{ maxLength: 200, largeFont: true, ... }`)
- **`values()`** - Array of property values (e.g., `[{ id: "...", type: "Person", name: "John Doe" }, ...]`)

- **`showPropertyLabel()`** - Whether to show the property label
- **`propertyLabel()`** - The label text to display

::: tip Property Labels Are Automatic
You don't need to manually render `propertyLabel()` or check `showPropertyLabel()` in your widget template. The widget system automatically wraps your widget with `<app-property-label-wrapper>` which handles displaying the label, icon, and layout based on the widget's options. Your widget template should only focus on rendering the actual content. See `DynamicWidgetComponent` for implementation details.
:::

### 4. Implement Custom Logic

Use Angular signals to create derived state from the base properties. Example for formatting address data:

```ts
export class AddressWidget extends BaseWidget {
  addresses = computed<FormattedAddress[]>(() => {
    const rawAddresses = this.values() as PostalAddress[];
    return rawAddresses.map((address) => ({
      ...address,
      postalInfo: [address.postalCode, address.addressLocality]
        .filter(Boolean)
        .join(' '),
      regionInfo: [address.addressRegion, address.addressCountry]
        .filter(Boolean)
        .join(', '),
    }));
  });
}
```

### 5. Create the Template

Create your template using the base properties.

```html
@for (address of addresses(); track $index) {
<div>
  @if (address.streetAddress) {
  <div>{{ address.streetAddress }}</div>
  } @if (address.postalInfo) {
  <div>{{ address.postalInfo }}</div>
  } @if (address.regionInfo) {
  <div>{{ address.regionInfo }}</div>
  }
</div>
}
```

### 6. Register the Widget

Add your widget to the registry in `src/app/config/presentation/widgets/widget-component.registry.ts`:

```ts
import { YourWidget } from '../../../widgets/domain-specific/your-widget/your-widget.component';

export const WIDGET_COMPONENT_REGISTRY = {
  'text-widget': TextWidget,
  'link-widget': LinkWidget,
  // ... other widgets
  'your-widget': YourWidget, // Add your widget
} as const;
```

### 7. Use in Configuration

Once registered, reference your widget by its `componentId` in `erfgoedzoeker.config.json` (or via the [Configurator](/guide/configuration-system)):

```json
{
  "detailsPresentation": {
    "widgets": [
      {
        "id": "your-widget",
        "properties": ["yourProperty"],
        "componentId": "your-widget",
        "options": {
          "propertyLabel": "Your Property",
          "icon": "star"
        }
      }
    ]
  }
}
```

## Custom Widget Options

To add component-specific options, extend `WidgetOptions` (see [TextWidget](/guide/built-in-widgets#textwidget) for an example):

```ts
import { WidgetOptions } from '../../core/types/node-presentation-config';

export interface YourWidgetOptions extends WidgetOptions {
  customOption?: string;
  anotherOption?: boolean;
}

export class YourWidget extends BaseWidget {
  customOptions = computed(() => this.options() as YourWidgetOptions);

  customValue = computed(() => {
    return this.customOptions().customOption ?? 'default';
  });
}
```

Then pass custom options in the JSON config:

```json
{
  "id": "your-widget",
  "properties": ["yourProperty"],
  "componentId": "your-widget",
  "options": {
    "propertyLabel": "Your Property",
    "customOption": "special-value",
    "anotherOption": true
  }
}
```
