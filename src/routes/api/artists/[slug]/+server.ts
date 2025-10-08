import { json } from '@sveltejs/kit';
import { getArtist } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const artist = await getArtist(params.slug);

		if (!artist) {
			return json({ error: 'Artist not found' }, { status: 404 });
		}

		return json(artist);
	} catch (error) {
		console.error('API Error fetching artist:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};