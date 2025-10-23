import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const response = await fetch(`/api/news/${params.slug}`);

		if (!response.ok) {
			throw error(404, 'Novica ni bila najdena');
		}

		const post = await response.json();

		if (!post) {
			throw error(404, 'Novica ni bila najdena');
		}

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
						href: '/artists'
					}
				]
			},
			{
				label: 'Novice',
				href: '/news'
			},
			{
				label: post.title,
				href: `/news/${params.slug}`
			}
		];

		return {
			breadcrumbs,
			post,
		};
	} catch (err) {
		console.error('Error loading news post:', err);
		throw error(404, 'Novica ni bila najdena');
	}
};