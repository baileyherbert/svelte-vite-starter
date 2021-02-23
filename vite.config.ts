/**
 * Change this to `true` to generate source maps alongside your production bundle. This is useful for debugging, but
 * will increase total bundle size and expose your source code.
 */
const sourceMapsInProduction = false;

/**
 * Enable or disable CSS code splitting. When enabled, CSS imported in async chunks will be inlined into the async
 * chunk itself and inserted when the chunk is loaded. If disabled, all CSS in the entire project will be extracted
 * into a single CSS file.
 */
const cssCodeSplit = true;

/*********************************************************************************************************************/
/**********                                              Vite                                               **********/
/*********************************************************************************************************************/

import { defineConfig } from 'vite';

import path from 'path';
import fs from 'fs';

import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';
import tsconfig from './tsconfig.json';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const config = defineConfig({
	plugins: [
		legacy({
			targets: pkg.browserslist
		}),
		svelte({
			emitCss: isProduction,
			preprocess: sveltePreprocess(),
			compilerOptions: {
				dev: isDevelopment,
			},

			// @ts-ignore This is temporary until the type definitions are fixed!
			hot: isDevelopment
		}),
	],
	server: {
		host: 'localhost',
		port: 5000
	},
	build: {
		sourcemap: sourceMapsInProduction,
		cssCodeSplit
	},
	css: {
		postcss: {
			plugins: [
				autoprefixer()
			]
		}
	}
});

// Load path aliases from the tsconfig.json file
if (typeof config === 'object') {
	const aliases = tsconfig.compilerOptions.paths;

	for (const alias in aliases) {
		const paths = aliases[alias].map((p: string) => path.resolve(__dirname, p));

		// Our tsconfig uses glob path formats, whereas webpack just wants directories
		// We'll need to transform the glob format into a format acceptable to webpack

		const wpAlias = alias.replace(/(\\|\/)\*$/, '');
		const wpPaths = paths.map((p: string) => p.replace(/(\\|\/)\*$/, ''));

		if (!config.resolve) config.resolve = {};
		if (!config.resolve.alias) config.resolve.alias = {};

		if (config.resolve && config.resolve.alias && !(wpAlias in config.resolve.alias)) {
			config.resolve.alias[wpAlias] = wpPaths.length > 1 ? wpPaths : wpPaths[0];
		}
	}
}

export default config;
