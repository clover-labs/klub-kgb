// Environment variables configuration
export const env = {
	PUBLIC_DIRECTUS_URL: import.meta.env.APP_DIRECTUS_URL || 'https://cms.cloverlabs.dev',
	PUBLIC_DIRECTUS_COLLECTION_NAME: import.meta.env.APP_DIRECTUS_COLLECTION_NAME || 'landing_test_posts'
} as const;
