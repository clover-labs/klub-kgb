import { error } from '@sveltejs/kit';
import { env } from '$lib/env.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const imageId = params.id;
		
		// Construct the Directus asset URL with full domain
		const directusImageUrl = `https://cms.cloverlabs.dev/assets/${imageId}`;
		
		console.log('Fetching image from:', directusImageUrl);
		
		// Fetch the image from Directus
		const response = await fetch(directusImageUrl);
		
		if (!response.ok) {
			console.error('Image fetch failed:', response.status, response.statusText);
			throw error(404, 'Image not found');
		}
		
		// Get the image data and content type
		const imageBuffer = await response.arrayBuffer();
		const contentType = response.headers.get('content-type') || 'image/jpeg';
		
		console.log('Successfully fetched image:', imageId, 'Content-Type:', contentType);
		
		// Return the image with proper headers
		return new Response(imageBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
				'Content-Length': imageBuffer.byteLength.toString()
			}
		});
	} catch (err) {
		console.error('Error proxying image:', err);
		throw error(500, 'Failed to load image');
	}
};
