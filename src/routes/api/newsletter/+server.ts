import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$lib/env';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	try {
		const { email } = await request.json();

		if (!email || typeof email !== 'string') {
			return json({ error: 'Email is required' }, { status: 400 });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return json({ error: 'Invalid email format' }, { status: 400 });
		}

		// Get client IP address
		const ipAddress = getClientAddress();

		// Prepare the payload for the webhook
		const currentTime = new Date().toISOString();
		const payload = {
			name: 'empty',
			email: email,
			'consent.given': 'true',
			'consent.marketing': 'true',
			'consent.timestamp': currentTime,
			submittedAt: currentTime,
			source: env.PUBLIC_APP_NAME,
			ipAddress: ipAddress
		};

		// Send POST request to the webhook
		const webhookResponse = await fetch('https://n8n.blendorsefaj.com/webhook/cc8c81f7-2878-49c5-be30-f3948f856703', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload)
		});

		if (!webhookResponse.ok) {
			console.error('Webhook request failed:', webhookResponse.status, webhookResponse.statusText);
			return json({ error: 'Failed to subscribe to newsletter' }, { status: 500 });
		}

		return json({ success: true, message: 'Successfully subscribed to newsletter' });

	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
