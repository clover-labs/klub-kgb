import { json } from '@sveltejs/kit';
import { getArtists } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const artists = await getArtists();
		return json(artists);
	} catch (error) {
		console.error('API Error fetching artists:', error);
		return json([], { status: 500 });
	}
};