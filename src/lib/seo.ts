import type { AvailableLanguageTag } from "$lib/paraglide/runtime";

export const siteConfig = {
	name: "Klub KGB Maribor",
	url: "https://klub-kgb.si",
	defaultImage: "/og-image.png",
	twitterHandle: "@kgbmaribor",
};

export interface SEOConfig {
	title: string;
	description: string;
	url?: string;
	image?: string;
	type?: "website" | "article" | "profile";
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	locale?: AvailableLanguageTag;
}

export function createSEOConfig(config: SEOConfig) {
	const fullUrl = config.url
		? `${siteConfig.url}${config.url}`
		: siteConfig.url;
	const imageUrl = config.image
		? config.image.startsWith("http")
			? config.image
			: `${siteConfig.url}${config.image}`
		: `${siteConfig.url}${siteConfig.defaultImage}`;

	return {
		title: config.title,
		description: config.description,
		url: fullUrl,
		website: siteConfig.name,
		image: imageUrl,
		...(config.author && { author: config.author }),
		twitter: {
			card: "summary_large_image" as const,
			site: siteConfig.twitterHandle,
			creator: siteConfig.twitterHandle,
		},
	};
}

// Default descriptions for common pages
export const defaultDescriptions = {
	sl: {
		home: "Klub KGB Maribor - koncerti, stand-up komedija in kulturni dogodki v središču Maribora od leta 1998",
		events:
			"Prihajajoči dogodki v Klubu KGB Maribor - koncerti, stand-up komedija in še več",
		news: "Novice in objave iz Kluba KGB Maribor",
		about:
			"Spoznajte Klub KGB Maribor - prostor, ki gosti dobre ljudi in dogodke že od leta 1998 dalje",
		venue: "Najem prostorov v Klubu KGB Maribor za vaše dogodke",
		contact: "Stopite v stik s Klubom KGB Maribor",
	},
	en: {
		home: "Klub KGB Maribor - concerts, stand-up comedy and cultural events in the heart of Maribor since 1998",
		events:
			"Upcoming events at Klub KGB Maribor - concerts, stand-up comedy and more",
		news: "News and updates from Klub KGB Maribor",
		about:
			"About Klub KGB Maribor - a space hosting great people and events since 1998",
		venue: "Venue rental at Klub KGB Maribor for your events",
		contact: "Get in touch with Klub KGB Maribor",
	},
};
