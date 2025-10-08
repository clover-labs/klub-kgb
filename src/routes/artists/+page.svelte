<script lang="ts">
	import type { PageData } from './$types';
	import type { Artist } from '$lib/types';

	let { data }: { data: PageData } = $props();
	const { artists } = data;

	let searchQuery: string = $state("");

	function getImageUrl(imageId: string): string {
		return `https://cms.cloverlabs.dev/assets/${imageId}`;
	}

	function getFallbackImage(): string {
		return '/beetle-placeholder.svg';
	}

	// Filtered artists based on search
	const filteredArtists = $derived.by(() => {
		if (!searchQuery.trim()) {
			return artists;
		}

		const query = searchQuery.toLowerCase().trim();
		return artists.filter((artist: Artist) => {
			const stageName = artist.stage_name?.toLowerCase() || '';
			const firstName = artist.first_name?.toLowerCase() || '';
			const lastName = artist.last_name?.toLowerCase() || '';
			const genre = Array.isArray(artist.genre) ? artist.genre.join(' ').toLowerCase() : '';
			const description = artist.description?.toLowerCase() || '';

			return stageName.includes(query) ||
				firstName.includes(query) ||
				lastName.includes(query) ||
				genre.includes(query) ||
				description.includes(query);
		});
	});
</script>

<svelte:head>
	<title>Izvajalci - Klub KGB Maribor</title>
	<meta name="description" content="Izvajalci in glasbeniki, ki nastopajo v Klubu KGB Maribor" />
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-prototype-orange-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl"
			>
				Izvajalci
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl">
				Spoznajte glasbenike in umetnike, ki nastopajo pri nas
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
						placeholder="Išči izvajalce..."
						class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
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
				{filteredArtists.length}
				{filteredArtists.length === 1
					? "izvajalec"
					: filteredArtists.length === 2
						? "izvajalca"
						: filteredArtists.length === 3 || filteredArtists.length === 4
							? "izvajalci"
							: "izvajalcev"}
			</div>
		</div>
	</section>

	<!-- Artists Grid -->
	<section class="w-full px-4 pb-12 md:px-12 md:pb-16">
		<div class="mx-auto max-w-7xl">
			{#if filteredArtists.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredArtists as artist (artist.id)}
						<article class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
							<a href={`/artists/${artist.slug || artist.id}`} class="block">
								<div class="relative h-64 overflow-hidden bg-gray-200">
									{#if artist.image}
										<img
											src={getImageUrl(artist.image)}
											alt={artist.stage_name}
											class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											onerror={(e) => {
												const target = e.target;
												if (target && target instanceof HTMLImageElement) {
													target.src = getFallbackImage();
												}
											}}
										/>
									{:else}
										<div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-prototype-orange-500 to-brick-red-500">
											<span class="text-6xl font-calluna-sans-bold text-white">
												{artist.stage_name.charAt(0).toUpperCase()}
											</span>
										</div>
									{/if}
								</div>

								<div class="p-6">
									<h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-prototype-orange-500">
										{artist.stage_name}
									</h2>
									{#if artist.first_name || artist.last_name}
										<p class="mt-1 text-sm font-calluna-sans-light text-gray-500">
											{[artist.first_name, artist.last_name].filter(Boolean).join(' ')}
										</p>
									{/if}

									{#if artist.genre}
										<p class="mt-2 text-sm font-calluna-sans-semibold uppercase tracking-wide text-mean-green-500">
											{Array.isArray(artist.genre) ? artist.genre.join(', ') : artist.genre}
										</p>
									{/if}

									{#if artist.description}
										<p class="mt-3 line-clamp-3 font-calluna-sans-light text-gray-600">
											{artist.description}
										</p>
									{/if}

									<div class="mt-4 flex gap-3">
										{#if artist.website}
											<span class="text-gray-400 transition-colors group-hover:text-prototype-orange-500" title="Website">
												<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
												</svg>
											</span>
										{/if}
										{#if artist.spotify}
											<span class="text-gray-400 transition-colors group-hover:text-mean-green-500" title="Spotify">
												<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
													<path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
												</svg>
											</span>
										{/if}
										{#if artist.instagram}
											<span class="text-gray-400 transition-colors group-hover:text-brick-red-500" title="Instagram">
												<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
													<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
												</svg>
											</span>
										{/if}
									</div>
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
						Ni najdenih izvajalcev
					</h3>
					<p class="text-center font-calluna-sans-light text-gray-600">
						{#if searchQuery.trim()}
							Poskusite z drugim iskanjem.
						{:else}
							Trenutno ni podatkov o izvajalcih.
						{/if}
					</p>
					{#if searchQuery.trim()}
						<button
							onclick={() => {
								searchQuery = "";
							}}
							class="mt-4 rounded-lg bg-prototype-orange-500 px-6 py-2 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-prototype-orange-400"
						>
							Ponastavi iskanje
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</section>
</main>
