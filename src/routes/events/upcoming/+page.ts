import { getBlogPosts } from '$lib/api.js';
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
				label: 'Arhiv',
				href: '/dogodki/arhiv'
			}
		]
	},
	{
		label: 'Prihajajoči dogodki',
		href: '/dogodki/prihajajoci'
	}
];

export const load: PageLoad = async ({ fetch }) => {
	const upcomingEvents = await getBlogPosts(fetch);

	return {
		upcomingEvents,
		breadcrumbs
	};
};
