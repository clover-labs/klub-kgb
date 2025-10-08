import { json } from '@sveltejs/kit';
import { getPastEvents } from '$lib/directus.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const pastEvents = await getPastEvents();
		return json(pastEvents);
	} catch (error) {
		console.error('API Error fetching past events:', error);
		return json([], { status: 500 });
	}
};