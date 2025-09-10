// Environment variables configuration
export const env = {
	DIRECTUS_URL: import.meta.env.VITE_DIRECTUS_URL || 'https://cms.cloverlabs.dev',
	DIRECTUS_COLLECTION_NAME: import.meta.env.VITE_DIRECTUS_COLLECTION_NAME || 'landing_test_posts'
} as const;
