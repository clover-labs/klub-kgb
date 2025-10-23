import type { PageServerLoad } from "./$types";

const breadcrumbs = [
	{
		label: 'Domov',
		href: '/'
	},
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
				href: '/o-nas',
			},
			{
				label: 'O prostoru',
				href: '/venue'
			}
		]
	},
	{
		label: 'Najem prostora',
		href: '/najem-prostora'
	}
];

export const load: PageServerLoad = async () => {
	return {
		breadcrumbs,
	};
};