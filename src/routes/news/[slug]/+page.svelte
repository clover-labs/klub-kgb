<script lang="ts">
	import type { PageData } from './$types';
	import { Share2, ArrowLeft, Calendar, ExternalLink } from '@lucide/svelte';
	import { generateEventUrl } from '$lib/utils/slug';

	let { data }: { data: PageData } = $props();
	const { post } = data;

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('sl-SI', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatEventDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('sl-SI', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getImageUrl(imageId: string): string {
		return `https://cms.cloverlabs.dev/assets/${imageId}`;
	}

	function getFallbackImage(): string {
		return '/placeholder-image-large.svg';
	}

	function sharePost() {
		if (navigator.share) {
			navigator.share({
				title: post.title,
				text: post.description,
				url: window.location.href
			});
		}
	}
</script>

<svelte:head>
	<title>{post.title} - Novice - Klub KGB Maribor</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	{#if post.image}
		<meta property="og:image" content={getImageUrl(post.image)} />
	{/if}
</svelte:head>

<main class="min-h-screen bg-off-white-100">
	<!-- Breadcrumbs + Back Button -->
	<div class="w-full border-b border-gray-200 bg-white px-4 py-4 md:px-12">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<!-- Back Button -->
			<a
				href="/news"
				class="inline-flex items-center gap-2 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:text-prototype-orange-500"
			>
				<ArrowLeft class="h-5 w-5" />
				Nazaj
			</a>

			<!-- Breadcrumbs -->
			<nav class="hidden items-center gap-2 text-sm font-calluna-sans-light md:flex">
				<a href="/" class="text-gray-600 transition-colors hover:text-prototype-orange-500">Domov</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<a href="/news" class="text-gray-600 transition-colors hover:text-prototype-orange-500">Novice</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<span class="text-pitch-black-100 line-clamp-1 max-w-xs">{post.title}</span>
			</nav>
		</div>
	</div>

	<div class="mx-auto max-w-5xl px-4 py-8 md:px-12 md:py-12">
		<!-- News Article Card -->
		<article class="overflow-hidden rounded-lg bg-white shadow-lg">
			<!-- Header Image -->
			{#if post.image}
				<div class="relative h-96 overflow-hidden bg-gray-200">
					<img
						src={getImageUrl(post.image)}
						alt={post.title}
						class="h-full w-full object-cover"
						onerror={(e) => {
							const target = e.target;
							if (target && target instanceof HTMLImageElement) {
								target.src = getFallbackImage();
							}
						}}
					/>
				</div>
			{/if}

			<!-- Content -->
			<div class="p-8 md:p-12">
				<!-- Meta -->
				<div class="mb-6 flex flex-wrap items-center gap-4">
					{#if post.date_created}
						<div class="inline-flex items-center gap-2 text-sm font-calluna-sans-light text-gray-600">
							<Calendar class="h-4 w-4" />
							<time datetime={post.date_created}>
								{formatDate(post.date_created)}
							</time>
						</div>
					{/if}

					<!-- Share Button -->
					<button
						onclick={sharePost}
						class="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 px-4 py-2 font-calluna-sans-semibold text-pitch-black-100 transition-all hover:border-prototype-orange-500 hover:text-prototype-orange-500"
					>
						<Share2 class="h-4 w-4" />
						Deli
					</button>
				</div>

				<!-- Title -->
				<h1 class="mb-6 text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl">
					{post.title}
				</h1>

				<!-- Description -->
				{#if post.description}
					<p class="mb-8 text-xl font-calluna-sans-light leading-relaxed text-gray-700">
						{post.description}
					</p>
				{/if}

				<!-- Body Content -->
				{#if post.content}
					<div class="prose prose-lg max-w-none font-calluna-sans-light text-gray-700">
						{@html post.content}
					</div>
				{:else}
					<div class="rounded-lg border-2 border-gray-200 bg-gray-50 p-8 text-center">
						<p class="font-calluna-sans-light text-gray-600">
							Ta novica še nima vsebine. Prosimo preverite pozneje!
						</p>
					</div>
				{/if}
			</div>
		</article>

		<!-- Related Event -->
		{#if post.related_event}
			<div class="mt-8 rounded-lg border-2 border-mean-green-500 bg-white p-6 shadow-lg md:p-8">
				<div class="mb-4 flex items-center gap-2">
					<div class="h-1 w-12 bg-mean-green-500"></div>
					<h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
						Povezan dogodek
					</h2>
				</div>

				<a
					href={generateEventUrl(post.related_event)}
					class="group flex flex-col gap-4 md:flex-row md:items-center"
				>
					{#if post.related_event.image}
						<div class="h-48 w-full overflow-hidden rounded-lg bg-gray-200 md:h-32 md:w-48 md:flex-shrink-0">
							<img
								src={getImageUrl(post.related_event.image)}
								alt={post.related_event.title}
								class="h-full w-full object-cover transition-transform group-hover:scale-105"
							/>
						</div>
					{/if}

					<div class="flex-1">
						<h3 class="mb-2 text-xl font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-mean-green-500">
							{post.related_event.title}
						</h3>

						{#if post.related_event.description}
							<p class="mb-3 font-calluna-sans-light text-gray-600 line-clamp-2">
								{post.related_event.description}
							</p>
						{/if}

						<div class="flex flex-wrap items-center gap-4">
							<div class="inline-flex items-center gap-2 text-sm font-calluna-sans-light text-gray-600">
								<Calendar class="h-4 w-4" />
								{formatEventDate(post.related_event.event_date)}
							</div>

							<span class="inline-flex items-center gap-2 font-calluna-sans-semibold text-mean-green-500 transition-colors group-hover:gap-3">
								Poglej dogodek
								<ExternalLink class="h-4 w-4" />
							</span>
						</div>
					</div>
				</a>
			</div>
		{/if}

		<!-- Back to News Button -->
		<div class="mt-8 flex justify-center">
			<a
				href="/news"
				class="inline-flex items-center gap-2 rounded-lg bg-prototype-orange-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-all hover:bg-prototype-orange-400"
			>
				<ArrowLeft class="h-5 w-5" />
				Nazaj na novice
			</a>
		</div>
	</div>
</main>
