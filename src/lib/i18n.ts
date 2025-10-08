import { createI18n } from "@inlang/paraglide-sveltekit";
import * as runtime from "$lib/paraglide/runtime.js";

export const i18n = createI18n(runtime, {
	pathnames: {
		// Events
		"/events": {
			sl: "/dogodki",
			en: "/events"
		},
		"/events/upcoming": {
			sl: "/dogodki/prihajajoci",
			en: "/events/upcoming"
		},
		"/events/archive": {
			sl: "/dogodki/arhiv",
			en: "/events/archive"
		},

		// News
		"/news": {
			sl: "/novice",
			en: "/news"
		},
		"/news/[slug]": {
			sl: "/novice/[slug]",
			en: "/news/[slug]"
		},

		// Artists
		"/artists": {
			sl: "/izvajalci",
			en: "/artists"
		},
		"/artists/[slug]": {
			sl: "/izvajalci/[slug]",
			en: "/artists/[slug]"
		},

		// About
		"/about": {
			sl: "/o-nas",
			en: "/about"
		},

		// Contact
		"/contact": {
			sl: "/kontakt",
			en: "/contact"
		},

		// FAQ
		"/faq": {
			sl: "/vprasanja",
			en: "/faq"
		},

		// Venue Rental
		"/venue-rental": {
			sl: "/najem-prostora",
			en: "/venue-rental"
		},

		// For Artists / Booking
		"/for-artists": {
			sl: "/za-izvajalce",
			en: "/for-artists"
		},
		"/booking": {
			sl: "/rezervacije",
			en: "/booking"
		}
	}
});
