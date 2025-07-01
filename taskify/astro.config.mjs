import AstroPWA from "@vite-pwa/astro";
// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	integrations: [
		svelte(),
		AstroPWA({
			includeAssets: ["/icon.ico", "/manifest.json", "/fonts/*.ttf"],
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
