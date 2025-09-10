import { getBlogPosts } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const blogPosts = await getBlogPosts(fetch);
	
	return {
		blogPosts
	};
};
