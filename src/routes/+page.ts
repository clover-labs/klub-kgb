import { getBlogPosts } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const upcomingEvents = await getBlogPosts(fetch);
	
	return {
		upcomingEvents
	};
};
