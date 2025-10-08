import { getBlogPosts } from '$lib/directus.js';
import type { RequestHandler } from './$types';
import { env } from '$lib/env.js';

function generateAgentsMd(posts: any[]): string {
	const baseUrl = env.PUBLIC_BASE_URL || 'https://klub-kgb.si';
	const now = new Date().toISOString();

	const upcomingEvents = posts
		.filter(post => new Date(post.event_date) > new Date())
		.sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
		.slice(0, 5)
		.map(post => {
			const eventDate = new Date(post.event_date).toISOString();
			return `    - id: ${post.id}
      title: "${post.title}"
      date: ${eventDate}
      description: "${post.description}"
      ticketUrl: ${post.link ? `"${post.link}"` : 'null'}`;
		}).join('\n');

	return `# Klub KGB - AI Agent Interface

## Overview
This document provides structured information for AI agents interacting with Klub KGB (Kulturno-glasbeni brlog) website and services.

## Available Actions

### 1. Get Event Information
- **Endpoint**: ${baseUrl}/api/blog
- **Method**: GET
- **Description**: Retrieve list of all published events
- **Response**: JSON array of event objects

### 2. Get Specific Event
- **Endpoint**: ${baseUrl}/api/blog/{id}
- **Method**: GET
- **Description**: Get detailed information about a specific event
- **Parameters**:
  - id: Event ID (number)
- **Response**: JSON event object with full content
- **Note**: Events are also accessible via human-friendly URLs at ${baseUrl}/events/{year}/{month}/{slug}

### 3. Subscribe to Newsletter
- **Endpoint**: ${baseUrl}/api/newsletter
- **Method**: POST
- **Description**: Subscribe email to event notifications
- **Payload**:
  \`\`\`json
  {
    "email": "user@example.com"
  }
  \`\`\`
- **Response**: Success/error status

## Data Feeds

### RSS Feed
- **URL**: ${baseUrl}/rss.xml
- **Format**: RSS 2.0
- **Content**: All published events with descriptions and links

### Human-Readable Context
- **URL**: ${baseUrl}/llms.txt
- **Format**: Plain text
- **Content**: Structured information about the club and events

## Current Events

### Upcoming Events
\`\`\`yaml
events:
${upcomingEvents || '  - No upcoming events currently scheduled'}
\`\`\`

## Contact Information
- **Email**: info@klub-kgb.si
- **Ticket Sales**: https://olaii.com/organizer/866/klub-kgb
- **Location**: Maribor, Slovenia

## Agent Guidelines

1. **Event Queries**: Use the /api/blog endpoint to fetch current event data
2. **Ticket Information**: Direct users to individual event ticketUrl fields or the main ticket page
3. **Newsletter Signup**: Use POST to /api/newsletter with valid email
4. **Content Language**: Primary language is Slovenian (sl-SI)
5. **Time Zone**: Europe/Ljubljana (CET/CEST)

## Rate Limiting
- Requests should be cached for at least 1 hour (Cache-Control: max-age=3600)
- Be respectful of server resources

## Metadata
- **Last Updated**: ${now}
- **API Version**: 1.0
- **Organization**: Klub KGB - Kulturno-glasbeni brlog
`;
}

export const GET: RequestHandler = async () => {
	try {
		const posts = await getBlogPosts();
		const agentsMd = generateAgentsMd(posts);

		return new Response(agentsMd, {
			headers: {
				'Content-Type': 'text/markdown; charset=utf-8',
				'Cache-Control': 'max-age=3600'
			}
		});
	} catch (error) {
		console.error('Error generating agents.md:', error);
		return new Response('Error generating agents.md', { status: 500 });
	}
};