import type { PageLoad } from './$types';
import type { BlogPost } from '$lib/types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { year, month } = params;
	const yearNum = parseInt(year);

	const monthMap: Record<string, number> = {
		'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'maj': 4, 'jun': 5,
		'jul': 6, 'avg': 7, 'sep': 8, 'okt': 9, 'nov': 10, 'dec': 11
	};

	const monthNum = monthMap[month];

	// Fetch both upcoming and past events
	const [upcomingResponse, pastResponse] = await Promise.all([
		fetch('/api/blog'),
		fetch('/api/archive')
	]);

	const upcoming: BlogPost[] = upcomingResponse.ok ? await upcomingResponse.json() : [];
	const past: BlogPost[] = pastResponse.ok ? await pastResponse.json() : [];
	const allEvents = [...upcoming, ...past];

	// Filter events by year and month
	const monthEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.event_date);
		return eventDate.getFullYear() === yearNum && eventDate.getMonth() === monthNum;
	});

	// Sort by date (newest first)
	monthEvents.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime());

	// Get month name
	const monthName = new Date(yearNum, monthNum, 1).toLocaleDateString('sl-SI', { month: 'long' });

	const breadcrumbs = [
		{
			label: 'Domov',
			href: '/'
		},
		{
			label: 'Dogodki',
			href: '/events'
		},
		{
			label: yearNum.toString(),
			href: `/events/${yearNum}`
		},
		{
			label: monthName,
			href: `/events/${yearNum}/${month}`
		}
	];

	return {
		breadcrumbs,
		year: yearNum,
		month: monthNum,
		monthSlug: month,
		monthName,
		events: monthEvents
	};
};
