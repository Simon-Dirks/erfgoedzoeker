# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

Erfgoedzoeker is a reusable, flexible heritage data browser (Angular SPA). The purpose of this project is to be a standard, reusable solution for two Netwerk Digitaal Erfgoed (NDE) [behavior profiles](https://zenodo.org/records/14938780/files/Gedragprofielen-digitaal-erfgoed.pdf):

1. Targeted search: users arrive with a concrete question and search/filter/sort to it.
2. Browsing and discovery: users have no specific query and are drawn along by visual/narrative triggers, related-content links, timelines/maps, etc.

Erfgoedzoeker is pre-1.0 and under active development. Do not overinvest in backward compatibility unless asked.

Erfgoedzoeker as a presentation layer consumes an "integration layer", which is the term NDE uses for the API this app talks to. The integration layer is currently protocol-agnostic and may end up being GraphQL, REST, or something else. Do not assume or hardcode GraphQL-specific behavior outside `src/app/api/graphql/`, which is today's implementation, not the contract.

## Monorepo Structure

This is a pnpm workspace with the following packages:

- `apps/erfgoedzoeker` — the Angular SPA (main app)
- `apps/configurator` — a standalone React app for editing the JSON config
- `packages/config-schema` — Zod schemas that are the single source of truth for config types and the JSON Schema
- `packages/icon-registry` — shared icon registry package

## Configuration System

Erfgoedzoeker is configured through a single JSON file at `apps/erfgoedzoeker/public/config/erfgoedzoeker.config.json`. The Zod schemas in `packages/config-schema/src/` are the authoritative definition of every configurable property. The JSON Schema at `apps/erfgoedzoeker/public/config/erfgoedzoeker.config.schema.json` is auto-generated from those Zod schemas. Never edit it by hand.

When adding or changing a configurable property:

1. Update the Zod schema in `packages/config-schema/src/`
2. Run `pnpm run generate:config-schema` to regenerate the JSON Schema
3. Update `apps/erfgoedzoeker/public/config/erfgoedzoeker.config.json` if needed

End-users configure Erfgoedzoeker via the Configurator app (`pnpm run configurator:dev`). They download the resulting JSON and drop it into `apps/erfgoedzoeker/public/config/erfgoedzoeker.config.json`.

## Testing

### Unit tests (Vitest)

The project uses [Vitest](https://vitest.dev/) for unit tests. Test files live alongside the source they cover and use the `.spec.ts` suffix.

- Run all unit tests: `pnpm run test:unit`
- Run a single file: `pnpm --filter @erfgoedzoeker/app exec vitest run <path/to/file.spec.ts>`

### E2E / Accessibility tests (Playwright)

Playwright is used as the project's e2e testing tool. Accessibility checks are part of that suite. Run `pnpm run test:e2e` to execute (among others) the accessibility specs in `e2e/a11y/`, which scan key pages with `@axe-core/playwright` (WCAG 2.0/2.1/2.2 A+AA tags). Run `pnpm run test:e2e:install` once to fetch browsers before the first run. Add a spec for any new route/widget you add.

## Accessibility

The app must conform to **WCAG 2.2 Level AA** across the board.

- Treat WCAG 2.2 AA as a blocking requirement for any UI change, not just new features.
- Don't regress existing conformance.
- axe-core misses some checks (e.g. focus-not-obscured, dragging alternatives, reading order). For non-trivial UI changes, also do a manual keyboard-only pass and spot-check with AXE DevTools/Lighthouse.
- Pay particular attention to interactive/custom widgets (`src/app/ui/draggable-list`, map/image viewers, custom presentation widgets) as these are the most likely to silently break keyboard or screen-reader support.

## Documentation

The VitePress site in `docs/guide/` (published at [docs.erfgoedzoeker.nl](https://docs.erfgoedzoeker.nl)) is the source of truth for developer-facing documentation.

- When a change affects developer-facing behavior (config schema, widget/view APIs, the integration layer contract), update the relevant page(s) in `docs/guide/` in the same change. Don't leave docs to a follow-up.
- The configuration UI (what properties mean, how to use facets/views/widgets) is documented inside the Configurator app itself, don't duplicate it in `docs/guide/`.
- Adding a new custom widget or view type needs a note in `docs/guide/custom-widgets.md` or `docs/guide/custom-views.md`.
- Validate docs changes with `pnpm run docs:build` before considering the task done. VitePress will fail on broken links/structure.
- `README.md` and package-level docs should stay minimal (quick start, links). Substantive documentation belongs in `docs/guide/`, not the README.

## Git / PR Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, etc.). Release-please parses commit history to version and changelog automatically.
- `CHANGELOG.md` and the `version` in `package.json` are generated/updated by release-please (`release-please-config.json`, `.release-please-manifest.json`). Don't change these manually.
