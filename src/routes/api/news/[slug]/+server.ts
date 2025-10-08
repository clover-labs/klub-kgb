import { json } from '@sveltejs/kit';
import { getNewsPost } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const post = await getNewsPost(params.slug);

		if (!post) {
			return json({ error: 'Post not found' }, { status: 404 });
		}

		return json(post);
	} catch (error) {
		console.error('API Error fetching news post:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};