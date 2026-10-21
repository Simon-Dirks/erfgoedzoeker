# Creating Custom Views

While Erfgoedzoeker provides built-in views (list, grid, map, timeline), you can create custom views for specialized search result presentations.

## When to Create a Custom View

Create a custom view when:

- You need a specialized layout for search results
- The built-in views don't provide the presentation you need

For simple customization, consider adjusting existing view options (e.g. `pageSize`, `showPagination`) through the [Configurator](/guide/configuration-system) first.

## Creating a View Component

### 1. Create the Component

Create a new [Angular component](https://angular.dev/essentials/components#defining-a-component) in `src/app/search/views/`:

```
src/app/search/views/
├── list-view/
│   ├── list-view.component.ts
│   └── list-view.component.html
└── your-view/
    ├── your-view.component.ts
    └── your-view.component.html
```

### 2. Extend BaseResultsView

Your component must extend `BaseResultsView` to access the view system's core functionality:

```ts
import { Component } from '@angular/core';
import { NodeComponent } from '../../node/node.component';
import { BaseResultsView } from '../base-results-view';

@Component({
  selector: 'app-your-view',
  imports: [NodeComponent],
  templateUrl: './your-view.component.html',
})
export class YourView extends BaseResultsView {}
```

### 3. Use BaseResultsView Properties

`BaseResultsView` provides these input properties:

- **`results()`** - Array of search result nodes (e.g., `[{ id: "...", type: "CreativeWork", name: "..." }, ...]`)
- **`totalResults()`** - Total number of results available
- **`currentPage()`** - Current page number
- **`pageSize()`** - Number of results per page
- **`options()`** - Configuration options passed from the view config (e.g., `{ pageSize: 20, showPagination: true, ... }`)
- **`presentationConfig()`** - Object presentation configuration for rendering nodes

### 4. Create the Template

Create your template using the base properties. Use `<app-node>` to render individual results:

```html
<div class="your-custom-layout">
  @for (result of results(); track result.id) {
  <app-node [data]="result" [presentationConfig]="presentationConfig()" />
  }
</div>
```

### 5. Register the View

Add your view to the registry in `src/app/config/views/view-component.registry.ts`:

```ts
import { YourView } from '../../search/views/your-view/your-view.component';

export const VIEW_COMPONENT_REGISTRY = {
  'list-view': ListViewComponent,
  'grid-view': GridViewComponent,
  'map-view': MapViewComponent,
  'your-view': YourView, // Add your view
} as const;
```

### 6. Use in Configuration

Once registered, reference your view by its `componentId` in `erfgoedzoeker.config.json` (or via the [Configurator](/guide/configuration-system)):

```json
{
  "views": {
    "defaultView": "your-view",
    "views": [
      {
        "type": "your-view",
        "componentId": "your-view",
        "icon": "layout-grid",
        "label": "Your View",
        "options": {
          "pageSize": 20,
          "showPagination": true,
          "showResultsCount": true
        },
        "presentationConfig": { "widgets": [] }
      }
    ]
  }
}
```
