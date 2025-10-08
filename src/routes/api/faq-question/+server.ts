import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createItem } from '@directus/sdk';
import { client } from '$lib/directus';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		// Validate required fields
		if (!data.name || !data.email || !data.topic || !data.question) {
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

		// Create FAQ question in Directus
		const question = await client.request(
			createItem('kgb_faq_questions', {
				name: data.name,
				email: data.email,
				topic: data.topic,
				question: data.question,
				status: 'pending'
			})
		);

		return json({ success: true, id: question.id });
	} catch (error) {
		console.error('Error creating FAQ question:', error);
		return json(
			{ error: 'Failed to submit question' },
			{ status: 500 }
		);
	}
};
