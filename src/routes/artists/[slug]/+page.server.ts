import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const response = await fetch(`/api/artists/${params.slug}`);

		if (!response.ok) {
			throw error(404, 'Izvajalec ni bil najden');
		}

		const artist = await response.json();

		if (!artist) {
			throw error(404, 'Izvajalec ni bil najden');
		}

		return {
			artist
		};
	} catch (err) {
		console.error('Error loading artist:', err);
		throw error(404, 'Izvajalec ni bil najden');
	}
};