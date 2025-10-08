import type { Handle } from "@sveltejs/kit";
import { i18n } from "$lib/i18n";

// Disable AsyncLocalStorage for Cloudflare Workers compatibility
// Safe for serverless environments where each request spawns a new instance
export const handle: Handle = i18n.handle({
	disableAsyncLocalStorage: true,
});
