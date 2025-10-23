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
				label: 'Izvajalci',
				href: '/izvajalci'
			},
		]
	},
	{
		label: 'Novice',
		href: '/news'
	}
];

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/news');
		const newsPosts = await response.json();

		return {
			breadcrumbs,
			newsPosts
		};
	} catch (error) {
		console.error('Error loading news:', error);
		return {
			breadcrumbs,
			newsPosts: []
		};
	}
};