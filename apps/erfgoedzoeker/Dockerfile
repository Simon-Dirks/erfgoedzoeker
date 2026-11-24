# Erfgoedzoeker as a container image: the static build, served by nginx.
#
# Build from the repository root:
#
#   docker build -f apps/erfgoedzoeker/Dockerfile -t erfgoedzoeker .
#
# The app reads its configuration at startup from the URL
# /config/erfgoedzoeker.config.json, so one image serves any number of
# instances: mount your own file over
# /usr/share/nginx/html/config/erfgoedzoeker.config.json.

# The output is static files, so build once on the builder’s own platform
# rather than once per target platform under emulation.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /src
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @erfgoedzoeker/config-schema --filter @erfgoedzoeker/icon-registry run build
RUN pnpm run build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY apps/erfgoedzoeker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/apps/erfgoedzoeker/dist/erfgoedzoeker/browser /usr/share/nginx/html
EXPOSE 8080
