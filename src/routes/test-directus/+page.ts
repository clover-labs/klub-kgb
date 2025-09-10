import { getBlogPosts } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	console.log('Testing API connection...');
	
	try {
		const posts = await getBlogPosts(fetch);
		console.log('Success! Fetched posts:', posts);
		
		return {
			success: true,
			posts,
			message: `Successfully fetched ${posts.length} blog posts via API`
		};
	} catch (error) {
		console.error('API connection failed:', error);
		
		return {
			success: false,
			posts: [],
			message: `Connection failed: ${error instanceof Error ? error.message : String(error)}`,
			error: error instanceof Error ? error.toString() : String(error)
		};
	}
};
