import { json } from '@sveltejs/kit';
import { getBlogPosts } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const posts = await getBlogPosts();
		return json(posts);
	} catch (error) {
		console.error('API Error fetching blog posts:', error);
		return json([], { status: 500 });
	}
};
