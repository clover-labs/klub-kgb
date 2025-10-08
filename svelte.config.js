import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { paraglide } from "@inlang/paraglide-sveltekit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Use Cloudflare adapter for production deployment
    adapter: adapter(),
    alias: {
      $lib: "./src/lib",
    },
  },

  vite: {
    plugins: [
      paraglide({
        project: "./project.inlang",
        outdir: "./src/lib/paraglide",
      }),
    ],
  },
};

export default config;
