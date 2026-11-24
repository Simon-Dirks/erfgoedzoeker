# Getting Started

This guide will help you get Erfgoedzoeker up and running on your local machine.

## Prerequisites

::: info Integration Layer Dependency
Erfgoedzoeker requires an **integration layer** endpoint to query. NDE's integration layer specification is still in development, so both GraphQL and REST protocols are supported. You select the protocol via `api.type` in the config file.

Available integration layer implementations:

- **GraphQL** _(in development)_: [LOL (Linked Open Limburg)](https://codeberg.org/limburg/lol) provides a Docker Compose setup that spins up a local GraphQL endpoint at `http://localhost:4000/graphql`.
- **REST**: A hosted demo is available at `https://datalaag.erfgoedzoeker.nl/v1` (see [this repo](https://github.com/netwerk-digitaal-erfgoed/prototypes-data-layers) for self-hosting).
  :::

- [Node.js](https://nodejs.org/) v20.19.0 (or newer) and [pnpm](https://pnpm.io/)
- An integration layer endpoint (see above)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Simon-Dirks/erfgoedzoeker.git
cd Erfgoedzoeker-NDE
pnpm install
```

## Configuration

Erfgoedzoeker is configured through a single JSON file at `apps/erfgoedzoeker/public/config/erfgoedzoeker.config.json`. The easiest way to configure it is through the Configurator app:

```bash
pnpm run configurator:dev
```

Open `http://localhost:5173/`, adjust settings, download the generated JSON, and replace the config file. To configure it directly or learn about the schema, see [Configuration System](/guide/configuration-system).

## Running the Application

Start the development server:

```bash
pnpm run start
```

Navigate to `http://localhost:4200/` to see the application in action.

## Running with Docker

Every Erfgoedzoeker release is published as a container image, `ghcr.io/simon-dirks/erfgoedzoeker`, tagged with its version and as `latest`. It serves the app with nginx on port 8080.

The image contains the default configuration. To use your own, mount it over `/usr/share/nginx/html/config/erfgoedzoeker.config.json`:

```bash
docker run -p 8080:8080 \
  -v ./erfgoedzoeker.config.json:/usr/share/nginx/html/config/erfgoedzoeker.config.json:ro \
  ghcr.io/simon-dirks/erfgoedzoeker:latest
```

Because the configuration is read at startup, one image serves any number of instances, each with its own file. `/healthz` answers `200` for health checks.

To build the image yourself, run from the repository root:

```bash
docker build -f apps/erfgoedzoeker/Dockerfile -t erfgoedzoeker .
```
