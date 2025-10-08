import type { PageLoad } from './$types';
import type { BlogPost } from '$lib/types';

export const load: PageLoad = async ({ params, fetch, url }) => {
	const { year, month, slug } = params;

	// Fetch all events and find the one matching the slug and date
	// We'll need to fetch from both upcoming and past events
	const [upcomingResponse, pastResponse] = await Promise.all([
		fetch('/api/blog'),
		fetch('/api/archive')
	]);

	const upcoming: BlogPost[] = upcomingResponse.ok ? await upcomingResponse.json() : [];
	const past: BlogPost[] = pastResponse.ok ? await pastResponse.json() : [];
	const allEvents = [...upcoming, ...past];

	// Find the event that matches the year, month, and slug
	const event = allEvents.find((e) => {
		const eventDate = new Date(e.event_date);
		const eventYear = eventDate.getFullYear();
		const eventMonth = eventDate.getMonth();

		const monthMap: Record<string, number> = {
			'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'maj': 4, 'jun': 5,
			'jul': 6, 'avg': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'dec': 11
		};

		const urlMonth = monthMap[month];
		const urlYear = parseInt(year);

		// Generate slug from title if not present
		const eventSlug = e.slug || e.title
			.toLowerCase()
			.trim()
			.replace(/č/g, 'c')
			.replace(/š/g, 's')
			.replace(/ž/g, 'z')
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '');

		return eventYear === urlYear && eventMonth === urlMonth && eventSlug === slug;
	});

	if (!event) {
		throw new Error('Event not found');
	}

	// Get referrer for back button
	const referrer = url.searchParams.get('from') || '/';

	// Determine if event is past or upcoming
	const isEventPast = new Date(event.event_date) < new Date();

	// Get related events (3 events from the same category - upcoming or past)
	const relatedEvents = (isEventPast ? past : upcoming)
		.filter(e => e.id !== event.id) // Exclude current event
		.slice(0, 3);

	return {
		event,
		referrer,
		relatedEvents
	};
};
