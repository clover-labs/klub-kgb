<script lang="ts">
	import type { PageData } from "./$types";
	import BlogCard from "$lib/components/BlogCard.svelte";
	import NewsletterForm from "$lib/components/NewsletterForm.svelte";
	import * as m from "$lib/paraglide/messages";
	import { Head } from "svead";
	import { createSEOConfig } from "$lib/seo";
	import { languageTag } from "$lib/paraglide/runtime";

	export let data: PageData;
	const { blogPosts } = data;

	const seo_config = createSEOConfig({
		title: m.home_title(),
		description: m.home_meta_description(),
		url: "/",
		type: "website",
		locale: languageTag()
	});
</script>

<Head {seo_config} />

<main class="flex flex-col gap-[5rem] md:gap-[12rem]">
	<!-- Hero Section -->
	<section
		class="bg-[url('/heroes/default.png')] bg-cover bg-center h-screen flex flex-col justify-start items-start"
	>
		<!-- Hero content -->
		<div
			class="w-full flex flex-col items-center lg:items-start justify-center h-full px-4 md:px-12 py-2 gap-4"
		>
			<h1
				class="w-full text-pitch-black-100 text-3xl lg:text-5xl font-bold font-calluna-sans-bold text-center lg:text-left"
			>
				{m.home_hero_title()}
			</h1>
			<p
				class="w-full sm:max-w-1/2 text-pitch-black-100 text-lg lg:text-2xl font-calluna-sans-light text-center lg:text-left"
			>
				{m.home_hero_subtitle()}
			</p>
			<a
				href="https://olaii.com/organizer/866/klub-kgb"
				target="_blank"
				class="w-full md:w-fit text-prototype-orange-500 text-xl lg:text-2xl font-calluna-sans-semibold group flex items-center justify-center md:justify-start"
			>
				{m.home_tickets_cta()} <span
					class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
					>→</span
				>
			</a>
		</div>
	</section>

	<!-- Event Section -->
	<section id="dogodki" class="w-full px-4 md:px-12 flex flex-col gap-8">
		<h2
			class="text-pitch-black-100 text-3xl md:text-4xl font-calluna-sans-semibold"
		>
			{m.home_events_title()}
		</h2>
		<div class="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
			{#each blogPosts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</section>

	<section id="newsletter" class="w-full px-4 md:px-12 flex flex-col gap-4">
		<h2 class="text-pitch-black-100 text-4xl font-calluna-sans-semibold">
			{m.home_newsletter_title()}
		</h2>
		<p
			class="text-pitch-black-100 text-sm md:text-lg font-calluna-sans-light mb-4"
		>
			{m.home_newsletter_subtitle()}
		</p>
		<NewsletterForm />
		<a
			href="/news"
			class="text-prototype-orange-500 text-lg font-calluna-sans-semibold group flex items-center"
		>
			{m.home_latest_news_cta()} <span
				class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
				>→</span
			>
		</a>
	</section>
</main>
