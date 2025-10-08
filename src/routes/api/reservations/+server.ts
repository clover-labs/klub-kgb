import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createItem } from '@directus/sdk';
import { client } from '$lib/directus';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate required fields
		if (!data.email || !data.phone || !data.event || !data.people) {
			return json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			);
		}

		if (!data.agreeToTerms) {
			return json(
				{ error: 'Must agree to terms' },
				{ status: 400 }
			);
		}

		// Create reservation in Directus
		const reservation = await client.request(
			createItem('kgb_reservations', {
				email: data.email,
				phone: data.phone,
				event: data.event,
				people: data.people,
				notes: data.notes || '',
				status: 'pending'
			})
		);

		return json({ success: true, id: reservation.id });
	} catch (error) {
		console.error('Error creating reservation:', error);
		return json(
			{ error: 'Failed to create reservation' },
			{ status: 500 }
		);
	}
};
