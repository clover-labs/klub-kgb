<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { newsPosts } = data;

	let searchQuery: string = $state("");

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

	// Filtered news based on search
	const filteredNews = $derived.by(() => {
		if (!searchQuery.trim()) {
			return newsPosts;
		}

		const query = searchQuery.toLowerCase().trim();
		return newsPosts.filter((post) =>
			post.title.toLowerCase().includes(query) ||
			post.description?.toLowerCase().includes(query)
		);
	});
</script>

<svelte:head>
	<title>Novice - Klub KGB Maribor</title>
	<meta name="description" content="Najnovejše novice in obvestila iz Kluba KGB Maribor" />
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-brick-red-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-white md:text-5xl lg:text-6xl"
			>
				Novice
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-white md:text-xl">
				Najnovejše novice in obvestila iz Kluba KGB Maribor
			</p>
		</div>
	</section>

	<!-- Search Section -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto max-w-7xl">
			<!-- Search Bar -->
			<div class="mb-6">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Išči novice..."
						class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
					/>
					<svg
						class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>

			<!-- Results Count -->
			<div class="mt-4 text-sm font-calluna-sans-light text-gray-600">
				{filteredNews.length}
				{filteredNews.length === 1
					? "novica"
					: filteredNews.length === 2
						? "novici"
						: filteredNews.length === 3 || filteredNews.length === 4
							? "novice"
							: "novic"}
			</div>
		</div>
	</section>

	<!-- News Grid -->
	<section class="w-full px-4 pb-12 md:px-12 md:pb-16">
		<div class="mx-auto max-w-7xl">
			{#if filteredNews.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredNews as post (post.id)}
						<article class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
							<a href={`/news/${post.slug || post.id}`} class="block">
								{#if post.image}
									<div class="relative h-48 overflow-hidden bg-gray-200">
										<img
											src={getImageUrl(post.image)}
											alt={post.title}
											class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
									{#if post.date_published}
										<time class="text-xs font-calluna-sans-light text-gray-500" datetime={post.date_published}>
											{formatDate(post.date_published)}
										</time>
									{/if}

									<h2 class="mt-2 text-xl font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-brick-red-500">
										{post.title}
									</h2>

									{#if post.description}
										<p class="mt-3 line-clamp-3 font-calluna-sans-light text-gray-600">
											{post.description}
										</p>
									{/if}

									<span class="mt-4 inline-flex items-center font-calluna-sans-semibold text-brick-red-500 transition-colors group-hover:text-brick-red-900">
										Preberi več
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
						Ni najdenih novic
					</h3>
					<p class="text-center font-calluna-sans-light text-gray-600">
						{#if searchQuery.trim()}
							Poskusite z drugim iskanjem.
						{:else}
							Trenutno ni novih novic. Preverite pozneje!
						{/if}
					</p>
					{#if searchQuery.trim()}
						<button
							onclick={() => {
								searchQuery = "";
							}}
							class="mt-4 rounded-lg bg-brick-red-500 px-6 py-2 font-calluna-sans-semibold text-white transition-colors hover:bg-brick-red-900"
						>
							Ponastavi iskanje
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</section>
</main>
