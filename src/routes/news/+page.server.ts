import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/news');
		const newsPosts = await response.json();

		return {
			newsPosts
		};
	} catch (error) {
		console.error('Error loading news:', error);
		return {
			newsPosts: []
		};
	}
};