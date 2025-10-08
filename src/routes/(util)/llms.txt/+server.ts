import { getBlogPosts } from '$lib/directus.js';
import type { RequestHandler } from './$types';
import { env } from '$lib/env.js';

function generateLlmsTxt(posts: any[]): string {
	const baseUrl = env.PUBLIC_BASE_URL || 'https://klub-kgb.si';
	const now = new Date().toISOString();

	const upcomingEvents = posts
		.filter(post => new Date(post.event_date) > new Date())
		.sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
		.slice(0, 10)
		.map(post => {
			const eventDate = new Date(post.event_date).toLocaleDateString('sl-SI', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
			const ticketLink = post.link ? `\n  Vstopnice: ${post.link}` : '';
			return `- ${post.title}
  Datum: ${eventDate}
  Opis: ${post.description}${ticketLink}`;
		}).join('\n\n');

	const pastEvents = posts
		.filter(post => new Date(post.event_date) <= new Date())
		.sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
		.slice(0, 5)
		.map(post => `- ${post.title} (${new Date(post.event_date).toLocaleDateString('sl-SI')})`)
		.join('\n');

	return `# Klub KGB (Kulturno-glasbeni brlog)

## O klubu
Klub KGB (Kulturno-glasbeni brlog) je klub v Mariboru, ki deluje v središču mesta. Organiziramo raznolike kulturne dogodke, koncerte, stand-up komične večere, predstave in družabna srečanja.

## Kontakt
- Email: info@klub-kgb.si
- Spletna stran: ${baseUrl}
- RSS Feed: ${baseUrl}/rss.xml
- Lokacija: Maribor, Slovenija

## Vstopnice
Vstopnice za dogodke so na voljo prek: https://olaii.com/organizer/866/klub-kgb

## Prihajajoči dogodki
${upcomingEvents || 'Trenutno ni napovedanih dogodkov.'}

## Nedavni pretekli dogodki
${pastEvents || 'Ni preteklih dogodkov.'}

## Newsletter
Prijavite se na naše e-novice za obveščanje o prihajajočih dogodkih.

## Poslanstvo
Klub KGB je prostor za kulturo, glasbo in druženje v Mariboru. Naše poslanstvo je ustvarjati vključujoč prostor za umetnost, zabavo in skupnost.

---
Zadnja posodobitev: ${now}`;
}

export const GET: RequestHandler = async () => {
	try {
		const posts = await getBlogPosts();
		const llmsTxt = generateLlmsTxt(posts);

		return new Response(llmsTxt, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'max-age=3600'
			}
		});
	} catch (error) {
		console.error('Error generating llms.txt:', error);
		return new Response('Error generating llms.txt', { status: 500 });
	}
};