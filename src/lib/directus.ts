import { createDirectus, rest, readItems } from "@directus/sdk";
import type { BlogPost, Artist, News, FAQ } from "./types.js";
import { env } from "./env.js";

// Create Directus client with proper configuration
export const client = createDirectus(env.PUBLIC_DIRECTUS_URL).with(rest());

export async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		const now = new Date().toISOString();

		const posts = await client.request(
			readItems(env.PUBLIC_DIRECTUS_COLLECTION_NAME, {
				fields: [
					"id",
					"status",
					"date_created",
					"date_updated",
					"image",
					"title",
					"description",
					"content",
					"event_date",
					"link",
					"slug",
					"artist_description",
					"performers",
				],
				sort: ["event_date"], // Sort by event_date ascending (earliest events first)
				filter: {
					_and: [
						{
							status: {
								_eq: "published", // Only get published posts
							},
						},
						{
							event_date: {
								_gte: now, // event_date greater than or equal to now (upcoming/current events only)
							},
						},
					],
				},
			})
		);

		return posts as BlogPost[];
	} catch (error) {
		// Silently return empty array on any error
		return [];
	}
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
	try {
		const post = await client.request(
			readItems(env.PUBLIC_DIRECTUS_COLLECTION_NAME, {
				fields: [
					"id",
					"status",
					"date_created",
					"date_updated",
					"image",
					"title",
					"description",
					"content",
					"event_date",
				],
				filter: {
					id: {
						_eq: parseInt(id), // Convert string to number since your IDs are numbers
					},
					status: {
						_eq: "published",
					},
				},
				limit: 1,
			})
		);

		return post.length > 0 ? (post[0] as BlogPost) : null;
	} catch (error) {
		// Silently return null on any error
		return null;
	}
}

// Get news posts (sorted by date published, newest first)
export async function getNewsPosts(): Promise<News[]> {
	try {
		const posts = await client.request(
			readItems("kgb_news", {
				fields: ["id", "status", "title", "slug", "date_published"],
				sort: ["-date_published"], // Sort by date_published descending (newest first)
				filter: {
					status: {
						_eq: "published",
					},
				},
			})
		);

		return posts as News[];
	} catch (error) {
		console.error("Error fetching news posts:", error);
		return [];
	}
}

// Get a single news post by ID or slug
export async function getNewsPost(idOrSlug: string): Promise<News | null> {
	try {
		const isNumeric = /^\d+$/.test(idOrSlug);

		const filter = isNumeric
			? { id: { _eq: parseInt(idOrSlug) }, status: { _eq: "published" } }
			: { slug: { _eq: idOrSlug }, status: { _eq: "published" } };

		const posts = await client.request(
			readItems("kgb_news", {
				fields: ["id", "status", "title", "slug", "content", "date_published", "related_event"],
				filter,
				limit: 1,
			})
		);

		if (posts.length === 0) return null;

		const newsPost = posts[0] as any;

		// If there's a related event ID, fetch the full event details
		if (newsPost.related_event) {
			try {
				const eventId =
					typeof newsPost.related_event === "object"
						? newsPost.related_event.id
						: newsPost.related_event;

				const events = await client.request(
					readItems(env.PUBLIC_DIRECTUS_COLLECTION_NAME, {
						fields: [
							"id",
							"title",
							"slug",
							"description",
							"event_date",
							"image",
							"link",
						],
						filter: {
							id: { _eq: eventId },
							status: { _eq: "published" },
						},
						limit: 1,
					})
				);

				if (events.length > 0) {
					newsPost.related_event = events[0];
				}
			} catch (err) {
				console.error("Error fetching related event:", err);
				newsPost.related_event = null;
			}
		}

		return newsPost as News;
	} catch (error) {
		console.error("Error fetching news post:", error);
		return null;
	}
}

// Get past events (event_date is in the past)
export async function getPastEvents(): Promise<BlogPost[]> {
	try {
		const now = new Date().toISOString();

		const posts = await client.request(
			readItems(env.PUBLIC_DIRECTUS_COLLECTION_NAME, {
				fields: [
					"id",
					"status",
					"date_created",
					"date_updated",
					"image",
					"title",
					"description",
					"content",
					"event_date",
					"link",
					"slug",
					"artist_description",
					"performers",
				],
				sort: ["-event_date"], // Sort by event_date descending (most recent past events first)
				filter: {
					_and: [
						{
							status: {
								_eq: "published",
							},
						},
						{
							event_date: {
								_lt: now, // event_date less than now (in the past)
							},
						},
					],
				},
			})
		);

		return posts as BlogPost[];
	} catch (error) {
		return [];
	}
}

// Get all artists
export async function getArtists(): Promise<Artist[]> {
	try {
		const artists = await client.request(
			readItems("kgb_artists", {
				fields: [
					"id",
					"status",
					"date_created",
					"date_updated",
					"first_name",
					"last_name",
					"stage_name",
					"slug",
					"image",
					"genre",
					"category",
					"country",
					"description",
					"website",
					"spotify",
					"instagram",
					"facebook",
					"youtube",
				],
				sort: ["stage_name"], // Sort alphabetically by stage name
				filter: {
					status: {
						_eq: "published",
					},
				},
			})
		);

		return artists as Artist[];
	} catch (error) {
		console.error("Error fetching artists:", error);
		return [];
	}
}

// Get a single artist by slug or ID
export async function getArtist(slugOrId: string): Promise<Artist | null> {
	try {
		// Try to parse as number first (ID), otherwise treat as slug
		const isNumeric = /^\d+$/.test(slugOrId);

		const filter = isNumeric
			? { id: { _eq: parseInt(slugOrId) }, status: { _eq: "published" } }
			: { slug: { _eq: slugOrId }, status: { _eq: "published" } };

		const artist = await client.request(
			readItems("kgb_artists", {
				fields: [
					"id",
					"status",
					"date_created",
					"date_updated",
					"first_name",
					"last_name",
					"stage_name",
					"slug",
					"image",
					"genre",
					"category",
					"country",
					"description",
					"bio",
					"website",
					"spotify",
					"instagram",
					"facebook",
					"youtube",
				],
				filter,
				limit: 1,
			})
		);

		if (artist.length > 0) {
			const artistData = artist[0] as Artist;

			// Initialize empty arrays for events
			artistData.upcoming_events = [];
			artistData.past_events = [];

			// Try to fetch events related to this artist
			try {
				const now = new Date().toISOString();

				const allEvents = await client.request(
					readItems(env.PUBLIC_DIRECTUS_COLLECTION_NAME, {
						fields: [
							"id",
							"title",
							"description",
							"event_date",
							"image",
							"slug",
							"link",
						],
						filter: {
							status: { _eq: "published" },
							artist_id: { _eq: artistData.id },
						},
						sort: ["event_date"],
					})
				);

				// Split into upcoming and past events
				artistData.upcoming_events = allEvents.filter(
					(event: any) => new Date(event.event_date) >= new Date(now)
				) as BlogPost[];

				artistData.past_events = allEvents
					.filter((event: any) => new Date(event.event_date) < new Date(now))
					.reverse() as BlogPost[]; // Reverse to show most recent first
			} catch (eventsError) {
				// If related events query fails, just continue without events
				console.error("Error fetching related events:", eventsError);
			}

			return artistData;
		}

		return null;
	} catch (error) {
		console.error("Error fetching artist:", error);
		return null;
	}
}

// Get all FAQs
export async function getFAQs(): Promise<FAQ[]> {
	try {
		const faqs = await client.request(
			readItems("kgb_faq", {
				fields: [
					"id",
					"status",
					"date_created",
					"date_updated",
					"question",
					"answer",
					"important_note",
					"warning_note",
					"tip_note",
					"info_note",
					"category",
					"sort",
					"slug",
					"is_featured",
				],
				sort: ["category", "sort", "date_created"],
				filter: { status: { _eq: "published" } },
			})
		);
		return faqs as FAQ[];
	} catch (error) {
		console.error("Error fetching FAQs:", error);
		return [];
	}
}
