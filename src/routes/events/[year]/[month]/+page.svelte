<script lang="ts">
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/types';
	import { generateEventUrl } from '$lib/utils/slug';

	let { data }: { data: PageData } = $props();
	const { year, monthName, events } = data;

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('sl-SI', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getImageUrl(imageId: string): string {
		return `https://cms.cloverlabs.dev/assets/${imageId}`;
	}

	function getFallbackImage(): string {
		return '/placeholder-image.svg';
	}
</script>

<svelte:head>
	<title>{monthName} {year} - Klub KGB Maribor</title>
	<meta name="description" content="Dogodki v {monthName} {year} v Klubu KGB Maribor" />
</svelte:head>

<main class="min-h-screen bg-off-white-100">
	<!-- Breadcrumbs -->
	<div class="w-full border-b border-gray-200 bg-white px-4 py-4 md:px-12">
		<div class="mx-auto max-w-7xl">
			<nav class="flex items-center gap-2 text-sm font-calluna-sans-light">
				<a href="/" class="text-gray-600 transition-colors hover:text-mean-green-500">Domov</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<a href="/events/upcoming" class="text-gray-600 transition-colors hover:text-mean-green-500">Dogodki</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<a href="/events/{year}" class="text-gray-600 transition-colors hover:text-mean-green-500">{year}</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<span class="capitalize text-pitch-black-100">{monthName}</span>
			</nav>
		</div>
	</div>

	<!-- Hero Section -->
	<section class="w-full bg-brick-red-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1 class="text-4xl font-calluna-sans-bold capitalize text-white md:text-5xl lg:text-6xl">
				{monthName} {year}
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-white md:text-xl">
				Dogodki v {monthName} {year}
			</p>
		</div>
	</section>

	<!-- Events Grid -->
	<section class="w-full px-4 py-8 md:px-12 md:py-12">
		<div class="mx-auto max-w-7xl">
			{#if events.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each events as event: BlogPost (event.id)}
						<article class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
							<a href={generateEventUrl(event)} class="block">
								{#if event.image}
									<div class="relative h-48 overflow-hidden rounded-t-lg bg-gray-200">
										<img
											src={getImageUrl(event.image)}
											alt={event.title}
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

								<div class="p-6">
									<time class="text-xs font-calluna-sans-light text-gray-500" datetime={event.event_date}>
										{formatDate(event.event_date)}
									</time>

									<h3 class="mt-2 text-xl font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-brick-red-500">
										{event.title}
									</h3>

									{#if event.description}
										<p class="mt-3 line-clamp-3 font-calluna-sans-light text-gray-600">
											{event.description}
										</p>
									{/if}

									<span class="mt-4 inline-flex items-center font-calluna-sans-semibold text-brick-red-500 transition-colors group-hover:text-brick-red-900">
										Preberi ve
										<svg class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</span>
								</div>
							</a>
						</article>
					{/each}
				</div>
			{:else}
				<!-- No Results State -->
				<div class="flex flex-col items-center justify-center py-16">
					<svg
						class="mb-4 h-16 w-16 text-gray-300"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
						/>
					</svg>
					<h3 class="mb-2 text-xl font-calluna-sans-semibold text-gray-700">
						Ni najdenih dogodkov
					</h3>
					<p class="text-center font-calluna-sans-light text-gray-600">
						V {monthName} {year} ni bilo dogodkov.
					</p>
				</div>
			{/if}
		</div>
	</section>
</main>
