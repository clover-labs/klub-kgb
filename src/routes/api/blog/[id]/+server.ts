import { json } from '@sveltejs/kit';
import { getBlogPost } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const post = await getBlogPost(params.id);
		if (!post) {
			return json({ error: 'Post not found' }, { status: 404 });
		}
		return json(post);
	} catch (error) {
		console.error('API Error fetching blog post:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
