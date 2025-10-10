# SEO Implementation Summary

## Overview
Comprehensive SEO implementation using Svead library for Klub KGB website with support for multiple languages (Slovenian & English).

## Installation
- **Package**: `svead@next` (v0.0.12)
- Installed via: `bun add -D svead@next`

## Components Implemented

### 1. SEO Configuration (`src/lib/seo.ts`)
Central configuration file containing:
- Site configuration (name, URL, default OG image, Twitter handle)
- `createSEOConfig()` helper function for consistent meta tags
- Default descriptions for common pages in both languages (SL/EN)

**Key Settings:**
- Site Name: Klub KGB Maribor
- URL: https://klub-kgb.si
- Default OG Image: `/og-image.png`
- Twitter Handle: @kgbmaribor

### 2. Language Alternates (`src/lib/components/LanguageAlternates.svelte`)
- Automatically generates hreflang tags for all pages
- Supports Slovenian (sl) and English (en)
- Sets Slovenian as x-default language
- Integrated into root layout for site-wide coverage

### 3. Page-Specific SEO

#### Homepage (`src/routes/+page.svelte`)
- Uses Svead `<Head>` component
- Dynamic title and description from Paraglide i18n
- Type: website
- Automatically includes Open Graph and Twitter Card tags

#### Event Pages (`src/routes/events/[year]/[month]/[slug]/+page.svelte`)
**SEO Tags:**
- Title: `{event.title} - Klub KGB Maribor`
- Description: Event description
- Type: article
- Image: Event image from Directus CMS

**Structured Data (Schema.org):**
- Type: Event
- Includes: name, description, dates, location, organizer
- Ticket information (availability, pricing, sold out status)
- Address: Vojašniški trg 5, 2000 Maribor, SI

#### Venue Page (`src/routes/(org)/venue/+page.svelte`)
**SEO Tags:**
- Title: "Prostor - Klub KGB Maribor"
- Description: Technical specs and venue info

**Structured Data (Schema.org):**
- Type: MusicVenue
- Maximum capacity: 80 people
- Geographic coordinates
- Amenity features (sound, lighting, accessibility)
- Full address with postal code

#### News Pages (`src/routes/news/[slug]/+page.svelte`)
**SEO Tags:**
- Title: `{post.title} - Novice - Klub KGB Maribor`
- Description: Post description
- Type: article
- Author: Klub KGB Maribor

**Structured Data (Schema.org):**
- Type: Article
- Includes: headline, description, publication dates
- Publisher organization with logo
- Author information

## Features

### Automatic Meta Tags
All pages include:
- Title tag
- Meta description
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags (summary_large_image)
- Canonical URLs

### Multi-language Support
- SEO descriptions respect user's locale (SL/EN)
- Hreflang tags for language alternates
- Dynamic content from Paraglide i18n system

### Structured Data (JSON-LD)
Rich snippets for:
1. **Events** - Event schema with dates, location, tickets
2. **Venue** - MusicVenue schema with capacity, amenities
3. **News** - Article schema with publisher info

## File Changes

### New Files
- `src/lib/seo.ts` - SEO configuration and utilities
- `src/lib/components/LanguageAlternates.svelte` - Hreflang component
- `SEO_IMPLEMENTATION.md` - This documentation

### Modified Files
- `src/routes/+layout.svelte` - Added LanguageAlternates component
- `src/routes/+page.svelte` - Replaced svelte:head with Svead
- `src/routes/events/[year]/[month]/[slug]/+page.svelte` - Added SEO + EventSchema
- `src/routes/(org)/venue/+page.svelte` - Added SEO + MusicVenue schema
- `src/routes/news/[slug]/+page.svelte` - Added SEO + Article schema
- `package.json` - Added svead dependency

## Usage

### Adding SEO to a New Page

```svelte
<script lang="ts">
  import { Head } from 'svead';
  import { createSEOConfig } from '$lib/seo';
  import { languageTag } from '$lib/paraglide/runtime';

  const seo_config = createSEOConfig({
    title: 'Page Title - Klub KGB Maribor',
    description: 'Page description',
    url: '/page-url',
    type: 'website', // or 'article'
    locale: languageTag()
  });
</script>

<Head {seo_config} />
```

### Adding Structured Data

```svelte
<script lang="ts">
  import { SchemaOrg } from 'svead';

  const schema = {
    '@type': 'Organization',
    name: 'Klub KGB Maribor',
    // ... other schema properties
  };
</script>

<SchemaOrg {schema} />
```

## Best Practices

1. **Always include locale** - Pass `languageTag()` for language-aware SEO
2. **Use descriptive titles** - Follow pattern: "Specific - General - Klub KGB Maribor"
3. **Keep descriptions 150-160 chars** - For optimal display in search results
4. **Include images** - Specify custom OG images when available
5. **Update structured data** - Keep schema.org data current with page content

## Testing

To verify implementation:
1. Check meta tags: View page source or use browser dev tools
2. Test Open Graph: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. Test Twitter Cards: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. Test structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)
5. Validate hreflang: Check `<link rel="alternate">` tags in source

## Notes

- Svead automatically generates Open Graph and Twitter Card tags from the config
- The `x-default` hreflang points to Slovenian as the primary language
- Event schema includes dynamic ticket status (available, sold out, free entry)
- All image URLs are converted to absolute URLs for proper Open Graph display
