import { createDirectus, rest, readItems } from '@directus/sdk';
import type { BlogPost } from './types.js';
import { env } from './env.js';

// Create Directus client with proper configuration
const client = createDirectus(env.DIRECTUS_URL).with(rest());

export async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		const posts = await client.request(readItems(env.DIRECTUS_COLLECTION_NAME, {
			fields: ['id', 'status', 'date_created', 'date_updated', 'image', 'title', 'description'],
			sort: ['-date_created'], // Sort by newest first
			filter: {
				status: {
					_eq: 'published' // Only get published posts
				}
			}
		}));
		
		return posts as BlogPost[];
	} catch (error) {
		// Silently return empty array on any error
		return [];
	}
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
	try {
		const post = await client.request(readItems(env.DIRECTUS_COLLECTION_NAME, {
			fields: ['id', 'status', 'date_created', 'date_updated', 'image', 'title', 'description', 'content'],
			filter: {
				id: {
					_eq: parseInt(id) // Convert string to number since your IDs are numbers
				},
				status: {
					_eq: 'published'
				}
			},
			limit: 1
		}));
		
		return post.length > 0 ? post[0] as BlogPost : null;
	} catch (error) {
		// Silently return null on any error
		return null;
	}
}
