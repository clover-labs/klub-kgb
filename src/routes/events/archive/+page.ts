import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/archive');
		const pastEvents = await response.json();

		return {
			pastEvents
		};
	} catch (error) {
		console.error('Error loading past events:', error);
		return {
			pastEvents: []
		};
	}
};
