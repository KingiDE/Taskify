// @ts-check
import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";

import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    AstroPWA({
      devOptions: {
        enabled: false, // enable caching in dev-mode (run dev)
      },
      includeAssets: [
        "/icon.ico",
        "/manifest.json",
        "/fonts/Poppins-Bold.ttf",
        "/fonts/Inter.ttf",
        "/icons/android/*.png",
        "/icons/windows/*.png",
        "/icons/ios/*.png",
      ],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

