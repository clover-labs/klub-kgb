import type { BlogPost } from './types.js';

const API_BASE = '/api';

export async function getBlogPosts(fetchFn: typeof fetch = fetch): Promise<BlogPost[]> {
	try {
		const response = await fetchFn(`${API_BASE}/blog`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching blog posts from API:', error);
		return [];
	}
}

export async function getBlogPost(id: string, fetchFn: typeof fetch = fetch): Promise<BlogPost | null> {
	try {
		const response = await fetchFn(`${API_BASE}/blog/${id}`);
		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching blog post from API:', error);
		return null;
	}
}
