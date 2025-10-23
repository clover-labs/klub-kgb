import type { PageLoad } from './$types';
import { getBlogPosts } from '$lib/api';

const breadcrumbs = [
    {
        label: 'Domov',
        href: '/'
    },
    {
        label: 'Dogodki',
        href: '/events'
    }
];

export const load: PageLoad = async ({ fetch }) => {
    const archive = await fetch('/api/archive');
	const upcoming = await getBlogPosts(fetch);
    const archiveEvents = await archive.json();
    return { breadcrumbs, upcomingEvents: upcoming, archiveEvents };
};
