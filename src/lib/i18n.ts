import { createI18n } from "@inlang/paraglide-sveltekit";
import * as runtime from "$lib/paraglide/runtime.js";
import * as m from "$lib/paraglide/messages.js";

export const i18n = createI18n(runtime, {
	prefixDefaultLanguage: "never",
	exclude: [/^\/api\/.*/], // Exclude API routes from i18n
	pathnames: {
		// Route translations: canonical path -> localized paths
		"/events": {
			sl: "/dogodki",
			en: "/events",
		},
		"/events/upcoming": {
			sl: "/dogodki/prihajajoči",
			en: "/events/upcoming",
		},
		"/events/archive": {
			sl: "/dogodki/arhiv",
			en: "/events/archive",
		},
		"/artists": {
			sl: "/izvajalci",
			en: "/artists",
		},
		"/news": {
			sl: "/novice",
			en: "/news",
		},
		"/contact": {
			sl: "/kontakt",
			en: "/contact",
		},
		"/about": {
			sl: "/o-nas",
			en: "/about",
		},
		"/faq": {
			sl: "/pogosta-vprasanja",
			en: "/faq",
		},
		"/venue-rental": {
			sl: "/najem-prostora",
			en: "/venue-rental",
		},
		"/booking": {
			sl: "/nastopi",
			en: "/booking",
		},
		"/for-artists": {
			sl: "/za-umetnike",
			en: "/for-artists",
		},
		"/venue": {
			sl: "/prostor",
			en: "/venue",
		},
	},
});

export { m };
