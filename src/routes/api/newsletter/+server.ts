import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { subscribeToNewsletter } from '$lib/beehiiv';

export const POST: RequestHandler = async ({ request, url }) => {
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

		// Get UTM parameters from request URL
		const utmSource = url.searchParams.get('utm_source') || 'website';
		const utmMedium = url.searchParams.get('utm_medium') || 'newsletter-form';
		const utmCampaign = url.searchParams.get('utm_campaign') || undefined;
		const referringSite = url.searchParams.get('ref') || undefined;

		// Subscribe to Beehiiv
		const result = await subscribeToNewsletter({
			email,
			reactivate_existing: false,
			send_welcome_email: true,
			utm_source: utmSource,
			utm_medium: utmMedium,
			utm_campaign: utmCampaign,
			referring_site: referringSite
		});

		if (result.errors && result.errors.length > 0) {
			console.error('Beehiiv subscription error:', result.errors);
			return json(
				{ error: result.errors[0].message || 'Failed to subscribe to newsletter' },
				{ status: 400 }
			);
		}

		return json({
			success: true,
			message: 'Successfully subscribed to newsletter',
			data: result.data
		});

	} catch (error) {
		console.error('Newsletter subscription error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
