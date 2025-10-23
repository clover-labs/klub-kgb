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
                label: 'O nas',
                href: '/o-nas'
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
		label: 'Kontakt',
		href: '/kontakt'
	}
];

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		breadcrumbs
	};
};