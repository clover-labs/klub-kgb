import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFAQs } from '$lib/directus';

export const GET: RequestHandler = async () => {
	try {
		const faqs = await getFAQs();
		return json(faqs);
	} catch (error) {
		console.error('API Error fetching FAQs:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
