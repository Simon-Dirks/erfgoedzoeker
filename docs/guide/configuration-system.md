# Configuration System

Erfgoedzoeker is configured through a single JSON file. A [Zod](https://zod.dev/) schema is the single source of truth from which both the JSON Schema and Erfgoedzoeker TypeScript types are derived.

<img src="../erfgoedzoeker-configurator.jpg" alt="Erfgoedzoeker Configurator" />

<span class="media-caption">The Erfgoedzoeker Configurator allows you to generate a Erfgoedzoeker configuration file (<code>erfgoedzoeker.config.json</code>) through an intuitive web interface.</span>

## Configuring Erfgoedzoeker

Use the **Configurator** app (a standalone React app) to edit configuration:

1. Run the Configurator: `pnpm run configurator:dev`
2. Open `http://localhost:5173/` and adjust settings
3. Download the generated JSON
4. Replace `apps/erfgoedzoeker/public/config/erfgoedzoeker.config.json` with the downloaded file

If you prefer, you can also edit the JSON config file (`erfgoedzoeker.config.json`) directly in your editor. The `$schema` reference at the top provides autocompletion and validation in your editor:

```json
{
  "$schema": "./erfgoedzoeker.config.schema.json",
  "api": {
    "type": "graphql",
    "baseUrl": "http://localhost:4000/graphql"
  },
  "facets": [],
  "views": { ... }
}
```

## How It Works

```mermaid
flowchart TD
    ZOD["Zod schema\n(source of truth)\n<code>packages/config-schema/src/</code>"]
    JSON_SCHEMA["JSON Schema (generated)\n<code>erfgoedzoeker.config.schema.json</code>"]
    CONFIG["Config file\n<code>erfgoedzoeker.config.json</code>"]
    CONF(["Configurator\n<code>apps/configurator</code>"])
    APP(["Erfgoedzoeker app\n<code>apps/erfgoedzoeker</code>"])

    ZOD -->|"pnpm run generate:config-schema"| JSON_SCHEMA
    ZOD -->|"TS types + runtime validation"| APP
    JSON_SCHEMA -->|"drives form UI"| CONF
    CONFIG -->|"loaded + validated at startup"| APP
    CONFIG -.->|"starting values"| CONF
    CONF -.->|"user downloads + replaces"| CONFIG

    classDef default padding:0px 1px
```

The Zod schema is the single source of truth. It generates the JSON Schema and provides TypeScript types and runtime validation directly to the Erfgoedzoeker app. The Configurator uses the JSON Schema to render its form UI and outputs a JSON config file that the app loads at startup.

## Modifying the Schema

When adding or changing a configurable property, update the Zod schema in `packages/config-schema/src/`, then run `pnpm run generate:config-schema` to regenerate the JSON Schema. The Configurator and editor tooling pick up the changes automatically.

If your schema change affects the shape of the config (new required fields, renamed keys, etc.), you might need to update `erfgoedzoeker.config.json` accordingly (see [Configuring Erfgoedzoeker](#configuring-erfgoedzoeker)).

## Icon Registry

The icon registry (`packages/icon-registry/src/index.ts`) maps string icon keys to SVG strings from the [@ng-icons](https://ng-icons.github.io/ng-icons/) library. The available keys are defined as a Zod enum (`IconKey`) in `packages/config-schema/src/icon.schema.ts`.

<img src="../configurator-icons.jpg" alt="Configurator Icons" />

<span class="media-caption">Selecting a facet icon from the icon registry through the Erfgoedzoeker Configurator.</span>

### Adding a New Icon

#### 1. Add the key to the schema

In `packages/config-schema/src/icon.schema.ts`, add the new key to the `IconKeySchema` enum:

```ts
export const IconKeySchema = z.enum([
  // ... existing keys
  'new-icon',
]);
```

Then regenerate the JSON Schema so the Configurator and editor tooling pick it up:

```sh
pnpm run generate:config-schema
```

#### 2. Register the icon

Import the icon from `@ng-icons/feather-icons` (or another [@ng-icons](https://ng-icons.github.io/ng-icons/) icon set) and add it to `ICON_REGISTRY` in `packages/icon-registry/src/index.ts`:

```ts
import {
  // ... existing imports
  featherNewIcon,
} from '@ng-icons/feather-icons';

export const ICON_REGISTRY: Record<IconKey, string> = {
  // ... existing entries
  'new-icon': featherNewIcon,
};
```
