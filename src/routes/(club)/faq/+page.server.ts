import type { PageServerLoad } from './$types';
import { getFAQs } from '$lib/directus';

const breadcrumbs = [
	{
		label: 'Domov',
		href: '/'
	},
	{
		label: 'O Klubu',
		children: [
			{
				label: 'O nas',
				href: '/o-nas'
			},
			{
				label: 'Kontakt',
				href: '/kontakt'
			},
			{
				label: 'Najem prostora',
				href: '/najem-prostora'
			},
			{
				label: 'O prostoru',
				href: '/venue'
			}
		]
	},
	{
		label: 'Vprašanja in odgovori',
		href: '/faq'
	},
];

export const load: PageServerLoad = async () => {
	const faqs = await getFAQs();
	return {
		breadcrumbs,
		faqs,
	};
};
