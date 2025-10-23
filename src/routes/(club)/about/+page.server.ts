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
                label: 'Kontakt',
                href: '/kontakt'
            },
            {
                label: 'Vprašanja in odgovori',
                href: '/faq'
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
		label: 'O nas',
		href: '/o-nas'
	}
];

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumbs
	};
};