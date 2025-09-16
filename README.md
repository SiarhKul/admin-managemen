# Admin Management (Nx Workspace)

## Prerequisites

- Node.js 20.x LTS and npm
- Nx CLI installed globally

```bash
npm i -g nx@latest
```

## Install

```bash
npm install
```

## Run (client and server together)

Use Nx to serve both apps in parallel:

```bash
npx nx run-many --target=serve --projects=client,server --parallel=2
```

This starts:

- `apps/client` Vite dev server (frontend)
- `apps/server` Express API server (backend)

Client is configured to proxy API calls to the server. Ensure both apps are running.

## Useful commands

- Serve only client:

```bash
npx nx serve client
```

- Serve only server:

```bash
npx nx serve server
```
