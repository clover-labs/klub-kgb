import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createItem } from '@directus/sdk';
import { client } from '$lib/directus';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate required fields
		if (!data.name || !data.email || !data.message) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(data.email)) {
			return json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Create venue rental inquiry in Directus
		const inquiry = await client.request(
			createItem('kgb_venue_rental', {
				name: data.name,
				email: data.email,
				phone: data.phone || '',
				event_date: data.eventDate || null,
				event_type: data.eventType || '',
				guest_count: data.guestCount || null,
				message: data.message,
				status: 'pending'
			})
		);

		return json({ success: true, id: inquiry.id });
	} catch (error) {
		console.error('Error creating venue rental inquiry:', error);
		return json(
			{ error: 'Failed to create venue rental inquiry' },
			{ status: 500 }
		);
	}
};
