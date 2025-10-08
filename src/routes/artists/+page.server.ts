import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/artists');
		const artists = await response.json();

		return {
			artists
		};
	} catch (error) {
		console.error('Error loading artists:', error);
		return {
			artists: []
		};
	}
};