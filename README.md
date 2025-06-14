# RankscaleAI Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

You can start a development server for different languages.

### Start English Version (Default)

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Start Chinese Version

```bash
npm run start:zh
```

This command starts the development server with Chinese (`zh-CN`) as the active locale.

## Build

To build the website for production:

### Build English Version (Default)

```bash
npm run build
```

### Build for All Languages

Docusaurus builds all languages by default with the standard `build` command. The output will be in the `build/` directory, with subdirectories for each locale (e.g., `build/zh-CN`).

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
