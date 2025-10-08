import { env as publicEnv } from "$env/dynamic/public";

// Environment variables configuration
export const env = {
  PUBLIC_DIRECTUS_URL:
    publicEnv.PUBLIC_LANDING_DIRECTUS_URL || "https://cms.cloverlabs.dev",
  PUBLIC_DIRECTUS_COLLECTION_NAME:
    publicEnv.PUBLIC_LANDING_DIRECTUS_COLLECTION_NAME || "kgb-posts",
  PUBLIC_APP_NAME: publicEnv.PUBLIC_APP_NAME || "klub-kgb",
  PUBLIC_BASE_URL: publicEnv.PUBLIC_BASE_URL || "https://klub-kgb.si",
} as const;
