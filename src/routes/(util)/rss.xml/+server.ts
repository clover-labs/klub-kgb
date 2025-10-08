import { getBlogPosts } from '$lib/directus.js';
import type { RequestHandler } from './$types';
import { env } from '$lib/env.js';
import { generateEventUrl } from '$lib/utils/slug.js';
import type { BlogPost } from '$lib/types.js';

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function generateRssFeed(posts: BlogPost[]): string {
	const baseUrl = env.PUBLIC_BASE_URL || 'https://klub-kgb.si';
	const now = new Date().toUTCString();

	const items = posts.map(post => {
		const pubDate = new Date(post.event_date || post.date_created).toUTCString();
		const eventUrl = `${baseUrl}${generateEventUrl(post)}`;
		const link = post.link || eventUrl;
		const imageUrl = post.image ? `${env.PUBLIC_DIRECTUS_URL}/assets/${post.image}` : '';

		return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${escapeXml(link)}</link>
			<description>${escapeXml(post.description)}</description>
			<pubDate>${pubDate}</pubDate>
			<guid isPermaLink="true">${eventUrl}</guid>
			${imageUrl ? `<enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />` : ''}
			${post.content ? `<content:encoded><![CDATA[${post.content}]]></content:encoded>` : ''}
		</item>`;
	}).join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>Klub KGB - Kulturno-glasbeni brlog</title>
		<link>${baseUrl}</link>
		<description>Klub KGB - Kulturno-glasbeni brlog Maribor</description>
		<language>sl</language>
		<lastBuildDate>${now}</lastBuildDate>
		<atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
		${items}
	</channel>
</rss>`;
}

export const GET: RequestHandler = async () => {
	try {
		const posts = await getBlogPosts();
		const rssFeed = generateRssFeed(posts);

		return new Response(rssFeed, {
			headers: {
				'Content-Type': 'application/rss+xml; charset=utf-8',
				'Cache-Control': 'max-age=3600'
			}
		});
	} catch (error) {
		console.error('Error generating RSS feed:', error);
		return new Response('Error generating RSS feed', { status: 500 });
	}
};