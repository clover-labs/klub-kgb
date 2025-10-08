import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

// Paraglide handles i18n automatically via vite plugin
export const handle: Handle = sequence();
