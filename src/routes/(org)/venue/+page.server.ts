import type { PageServerLoad } from './$types';

const breadcrumbs = [
	{ label: 'Domov', href: '/' },
	{
		label: 'O Klubu',
		children: [
			{
				label: 'Vprašanja in odgovori',
				href: '/faq'
			},
			{
				label: 'Kontakt',
				href: '/kontakt'
			},
			{
				label: 'O nas',
				href: '/o-nas'
			},
			{
				label: 'Najem prostora',
				href: '/najem-prostora'
			},
		]
	},
	{ label: 'O prostoru', href: '/venue' },
];

export const load: PageServerLoad = async () => {
	return {
		breadcrumbs,
	};
};