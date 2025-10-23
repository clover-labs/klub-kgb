import type { PageLoad } from './$types';

const breadcrumbs = [
	{
		label: 'Domov',
		href: '/'
	},
	{
		label: 'Dogodki',
		href: '/events',
		children: [
			{
				label: 'Prihajajoči dogodki',
				href: '/dogodki/prihajajoci'
			}
		]
	},
	{
		label: 'Arhiv',
		href: '/dogodki/arhiv'
	}
];


export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/api/archive');
		const pastEvents = await response.json();

		return {
			pastEvents,
			breadcrumbs
		};
	} catch (error) {
		console.error('Error loading past events:', error);
		return {
			pastEvents: [],
			breadcrumbs
		};
	}
};
