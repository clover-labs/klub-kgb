import type { PageLoad } from './$types';
import type { BlogPost } from '$lib/types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { year } = params;
	const yearNum = parseInt(year);

	// Fetch both upcoming and past events
	const [upcomingResponse, pastResponse] = await Promise.all([
		fetch('/api/blog'),
		fetch('/api/archive')
	]);

	const upcoming: BlogPost[] = upcomingResponse.ok ? await upcomingResponse.json() : [];
	const past: BlogPost[] = pastResponse.ok ? await pastResponse.json() : [];
	const allEvents = [...upcoming, ...past];

	// Filter events by year
	const yearEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.event_date);
		return eventDate.getFullYear() === yearNum;
	});

	// Sort by date (newest first)
	yearEvents.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

	return {
		year: yearNum,
		events: yearEvents
	};
};
