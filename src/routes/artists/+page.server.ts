import type { PageServerLoad } from './$types';

const breadcrumbs = [
	{
		label: 'Domov',
		href: '/'
	},
	{
		label: 'Vsebina',
		children: [
			{
				label: 'Novice',
				href: '/novice'
			}
		]
	},
	{
		label: 'Izvajalci',
		href: '/izvajalci'
	}
];

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/artists');
		const artists = await response.json();

		return {
			artists,
			breadcrumbs
		};
	} catch (error) {
		console.error('Error loading artists:', error);
		return {
			artists: [],
			breadcrumbs
		};
	}
};