import { json } from '@sveltejs/kit';
import { getNewsPosts } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const posts = await getNewsPosts();
		return json(posts);
	} catch (error) {
		console.error('API Error fetching news posts:', error);
		return json([], { status: 500 });
	}
};