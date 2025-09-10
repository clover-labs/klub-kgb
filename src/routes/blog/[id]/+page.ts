import { getBlogPost } from '$lib/api.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const post = await getBlogPost(params.id, fetch);
	
	if (!post) {
		throw new Error('Blog post not found');
	}
	
	return {
		post
	};
};
