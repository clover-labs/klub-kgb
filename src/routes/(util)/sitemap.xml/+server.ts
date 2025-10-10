import { getBlogPosts, getPastEvents, getNewsPosts, getArtists } from '$lib/directus.js';
import type { RequestHandler } from './$types';
import { generateEventUrl } from '$lib/utils/slug.js';
import { siteConfig } from '$lib/seo.js';

interface SitemapUrl {
	loc: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

function formatDate(date: Date | string): string {
	const d = typeof date === 'string' ? new Date(date) : date;
	return d.toISOString().split('T')[0]; // Returns YYYY-MM-DD
}

function generateSitemap(urls: SitemapUrl[]): string {
	const urlEntries = urls
		.map(
			({ loc, lastmod, changefreq, priority }) => `
	<url>
		<loc>${loc}</loc>
		${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
		${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
		${priority !== undefined ? `<priority>${priority.toFixed(1)}</priority>` : ''}
	</url>`
		)
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${urlEntries}
</urlset>`;
}

export const GET: RequestHandler = async () => {
	try {
		const baseUrl = siteConfig.url;
		const languages = ['sl', 'en'];
		const urls: SitemapUrl[] = [];

		// Static pages with language variants
		const staticPages = [
			{ path: '', priority: 1.0, changefreq: 'daily' as const }, // Homepage
			{ path: '/about', priority: 0.8, changefreq: 'monthly' as const },
			{ path: '/venue', priority: 0.8, changefreq: 'monthly' as const },
			{ path: '/venue-rental', priority: 0.7, changefreq: 'monthly' as const },
			{ path: '/contact', priority: 0.7, changefreq: 'monthly' as const },
			{ path: '/faq', priority: 0.6, changefreq: 'monthly' as const },
			{ path: '/booking', priority: 0.6, changefreq: 'monthly' as const },
			{ path: '/for-artists', priority: 0.6, changefreq: 'monthly' as const },
			{ path: '/events', priority: 0.9, changefreq: 'daily' as const },
			{ path: '/events/upcoming', priority: 0.9, changefreq: 'daily' as const },
			{ path: '/events/archive', priority: 0.7, changefreq: 'weekly' as const },
			{ path: '/news', priority: 0.8, changefreq: 'weekly' as const },
			{ path: '/artists', priority: 0.7, changefreq: 'weekly' as const }
		];

		// Add static pages with language variants and xhtml:link alternates
		for (const page of staticPages) {
			for (const lang of languages) {
				urls.push({
					loc: `${baseUrl}/${lang}${page.path}`,
					lastmod: formatDate(new Date()),
					changefreq: page.changefreq,
					priority: page.priority
				});
			}
		}

		// Fetch dynamic content
		const [upcomingEvents, pastEvents, newsPosts, artists] = await Promise.all([
			getBlogPosts(),
			getPastEvents(),
			getNewsPosts(),
			getArtists()
		]);

		// Add upcoming events (higher priority)
		for (const event of upcomingEvents) {
			const eventUrl = generateEventUrl(event);
			const lastmod = event.date_updated || event.date_created;

			for (const lang of languages) {
				urls.push({
					loc: `${baseUrl}/${lang}${eventUrl}`,
					lastmod: lastmod ? formatDate(lastmod) : undefined,
					changefreq: 'daily',
					priority: 0.9
				});
			}
		}

		// Add past events (lower priority)
		for (const event of pastEvents) {
			const eventUrl = generateEventUrl(event);
			const lastmod = event.date_updated || event.date_created;

			for (const lang of languages) {
				urls.push({
					loc: `${baseUrl}/${lang}${eventUrl}`,
					lastmod: lastmod ? formatDate(lastmod) : undefined,
					changefreq: 'monthly',
					priority: 0.5
				});
			}
		}

		// Add news posts
		for (const post of newsPosts) {
			for (const lang of languages) {
				urls.push({
					loc: `${baseUrl}/${lang}/news/${post.slug}`,
					lastmod: post.date_published ? formatDate(post.date_published) : undefined,
					changefreq: 'weekly',
					priority: 0.7
				});
			}
		}

		// Add artist pages
		for (const artist of artists) {
			for (const lang of languages) {
				urls.push({
					loc: `${baseUrl}/${lang}/artists/${artist.slug}`,
					lastmod: artist.date_updated ? formatDate(artist.date_updated) : undefined,
					changefreq: 'weekly',
					priority: 0.6
				});
			}
		}

		const sitemap = generateSitemap(urls);

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
};
