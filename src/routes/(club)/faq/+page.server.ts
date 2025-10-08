import type { PageServerLoad } from './$types';
import { getFAQs } from '$lib/directus';

export const load: PageServerLoad = async () => {
	const faqs = await getFAQs();
	return {
		faqs
	};
};
