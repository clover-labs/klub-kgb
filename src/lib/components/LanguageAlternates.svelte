<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/seo';
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';

	interface Props {
		languages?: AvailableLanguageTag[];
	}

	let { languages = ['sl', 'en'] as AvailableLanguageTag[] }: Props = $props();

	// Get current path without language prefix
	const currentPath = $derived($page.url.pathname);

	// Generate alternate URLs for each language
	const alternates = $derived(
		languages.map((lang) => {
			// Remove any existing language prefix and add the new one
			const pathWithoutLang = currentPath.replace(/^\/(sl|en)/, '');
			const langPath = `/${lang}${pathWithoutLang}`;

			return {
				lang,
				url: `${siteConfig.url}${langPath}`
			};
		})
	);
</script>

<svelte:head>
	{#each alternates as alternate}
		<link rel="alternate" hreflang={alternate.lang} href={alternate.url} />
	{/each}
	<!-- x-default points to Slovenian as the default -->
	<link rel="alternate" hreflang="x-default" href={`${siteConfig.url}${currentPath.replace(/^\/(sl|en)/, '/sl')}`} />
</svelte:head>
