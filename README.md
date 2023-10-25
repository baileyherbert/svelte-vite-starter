# Svelte Vite Starter

A starter template for [Svelte](https://svelte.dev) that comes preconfigured with [Vite](https://vitejs.dev/),
TypeScript, SCSS, Babel, Autoprefixer, and HMR.

- [Getting started](#getting-started)
  - [Installation](#installation)
  - [Starting the development server](#starting-the-development-server)
  - [Building for production](#building-for-production)
- [Usage](#usage)
  - [Global stylesheets](#global-stylesheets)
  - [Browsers list](#browsers-list)
  - [Babel customization](#babel-customization)
  - [Source maps in production](#source-maps-in-production)
  - [Import path aliases](#import-path-aliases)

---

## Getting started

### Installation

Pull the template files into the current working directory with [`degit`](https://github.com/Rich-Harris/degit) and
then install dependencies.

```bash
npx degit baileyherbert/svelte-vite-starter
npm install
```

### Starting the development server

Run the `dev` script to start a live development server with hot module replacement. Then check the output for a link
to the app, which is usually `http://localhost:5000/`:

```bash
npm run dev
```

### Building for production

Run the `build` script to bundle the app for production. The bundle will be created at `/dist/assets/` and the `dist`
directory will contain all files you need to host the app:

```bash
npm run build
```

> 💡 **Tip:** You can quickly test the production build by running `npm run preview` locally.

---

## Usage

### Global stylesheets

Edit the `index.html` file and add additional `<link>` references to stylesheets:

```html
<link rel="stylesheet" type="text/css" href="/src/styles/index.scss">
```

You can specify `css`, `scss`, and `sass` files here, and they will be compiled and minified as necessary. These styles
will be added to the bundle in the order specified. Svelte's styles will always load last.

> 💡 **Note:** The paths to these assets must start with `/` in order to resolve.

### Browsers list

The bundle will be transpiled to run on the browsers specified in `package.json`:

```json
"browserslist": [
    "defaults"
]
```

If you wish to customize this, please refer to the list of
[example browserslist queries](https://github.com/browserslist/browserslist#full-list).

### Babel customization

Production builds are transpiled with Babel automatically. If you wish to disable this, edit the `vite.config.ts` file:

```ts
const useBabel = false;
```

### Source maps in production

Source maps are generated automatically during development. They are not included in production builds by default. If
you wish to change this behavior, edit the `vite.config.ts` file:

```ts
const sourceMapsInProduction = true;
```

### Import path aliases

Define import path aliases from the `tsconfig.json` file. For example:

```json
"paths": {
    "src/*": ["src/*"],
    "@stores/*": ["src/stores/*"]
}
```

You can then import files under these aliases and Vite will resolve them. Your code editor should also use them
for automatic imports:

```ts
import { users } from '@stores/users'; // src/stores/users.ts
```

The root directory is configured as a base path for imports. This means you can also import modules with an absolute
path from anywhere in the project instead of using a large number of `..` to traverse directories.

```ts
import { users } from 'src/stores/users';
```
