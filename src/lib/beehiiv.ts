// Beehiiv API v2 Integration
const BEEHIIV_API_KEY = 'qENCoTzSGACUHXExpjx0PGj3kLu2IDIRxVXB9IJ09DJt3lJMppm0kQjEFxzApKik';
const BEEHIIV_PUBLICATION_ID = 'pub_8efd4500-bf8f-4614-b8ce-94d62b2da2e6';
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

export interface BeehiivSubscribeParams {
	email: string;
	reactivate_existing?: boolean;
	send_welcome_email?: boolean;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
	referring_site?: string;
}

export interface BeehiivSubscribeResponse {
	data?: {
		id: string;
		email: string;
		status: string;
		created: number;
	};
	errors?: Array<{
		message: string;
	}>;
}

/**
 * Subscribe an email address to the Beehiiv publication
 * @see https://developers.beehiiv.com/docs/v2/1c0c1f2eaa10b-create-a-subscription
 */
export async function subscribeToNewsletter(
	params: BeehiivSubscribeParams
): Promise<BeehiivSubscribeResponse> {
	try {
		const response = await fetch(
			`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${BEEHIIV_API_KEY}`
				},
				body: JSON.stringify({
					email: params.email,
					reactivate_existing: params.reactivate_existing ?? false,
					send_welcome_email: params.send_welcome_email ?? true,
					utm_source: params.utm_source,
					utm_medium: params.utm_medium,
					utm_campaign: params.utm_campaign,
					referring_site: params.referring_site
				})
			}
		);

		const data = await response.json();

		if (!response.ok) {
			console.error('Beehiiv API error:', data);
			return { errors: data.errors || [{ message: 'Failed to subscribe' }] };
		}

		return { data };
	} catch (error) {
		console.error('Error subscribing to Beehiiv:', error);
		return { errors: [{ message: 'Network error occurred' }] };
	}
}
