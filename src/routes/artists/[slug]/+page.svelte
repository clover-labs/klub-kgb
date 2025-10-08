<script lang="ts">
	import type { PageData } from './$types';
	import { generateEventUrl } from '$lib/utils/slug';
	import { Globe, Youtube, Instagram, Facebook, Music } from '@lucide/svelte';

	let { data }: { data: PageData } = $props();
	const { artist } = data;

	function getImageUrl(imageId: string): string {
		return `https://cms.cloverlabs.dev/assets/${imageId}`;
	}

	function getFallbackImage(): string {
		return '/beetle-placeholder.svg';
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('sl-SI', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{artist.stage_name} - Klub KGB Maribor</title>
	<meta name="description" content={artist.bio || artist.description || `${artist.stage_name} - nastopi v Klubu KGB Maribor`} />
</svelte:head>

<main class="min-h-screen bg-off-white-100">
	<!-- Breadcrumbs + Back Button -->
	<div class="w-full border-b border-gray-200 bg-white px-4 py-4 md:px-12">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<!-- Back Button -->
			<a
				href="/artists"
				class="inline-flex items-center gap-2 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:text-prototype-orange-500"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Nazaj
			</a>

			<!-- Breadcrumbs -->
			<nav class="hidden items-center gap-2 text-sm font-calluna-sans-light md:flex">
				<a href="/" class="text-gray-600 transition-colors hover:text-prototype-orange-500">Domov</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<a href="/artists" class="text-gray-600 transition-colors hover:text-prototype-orange-500">Izvajalci</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<span class="text-pitch-black-100">{artist.stage_name}</span>
			</nav>
		</div>
	</div>

	<div class="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
		<!-- Artist Header -->
		<div class="overflow-hidden rounded-lg bg-white shadow-lg">
			<div class="flex flex-col gap-8 bg-gradient-to-r from-prototype-orange-500 to-brick-red-500 p-8 md:flex-row md:p-12">
				{#if artist.image}
					<div class="h-64 w-64 flex-shrink-0 overflow-hidden rounded-lg shadow-xl">
						<img
							src={getImageUrl(artist.image)}
							alt={artist.stage_name}
							class="h-full w-full object-cover"
							onerror={(e) => {
								const target = e.target;
								if (target && target instanceof HTMLImageElement) {
									target.src = getFallbackImage();
								}
							}}
						/>
					</div>
				{:else}
					<div class="flex h-64 w-64 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
						<span class="text-8xl font-calluna-sans-bold text-white">
							{artist.stage_name.charAt(0).toUpperCase()}
						</span>
					</div>
				{/if}

				<div class="flex flex-1 flex-col justify-center">
					<h1 class="text-4xl font-calluna-sans-bold text-white md:text-5xl">
						{artist.stage_name}
					</h1>
					{#if artist.first_name || artist.last_name}
						<p class="mt-2 text-lg font-calluna-sans-light text-white/80">
							{[artist.first_name, artist.last_name].filter(Boolean).join(' ')}
						</p>
					{/if}

					{#if artist.genre}
						<p class="mt-2 text-xl font-calluna-sans-semibold text-white/90">
							{Array.isArray(artist.genre) ? artist.genre.join(', ') : artist.genre}
						</p>
					{/if}

					{#if artist.country}
						<p class="mt-2 font-calluna-sans-light text-white/80">
							📍 {artist.country}
						</p>
					{/if}

					<!-- Social Links -->
					{#if artist.website || artist.spotify || artist.instagram || artist.facebook || artist.youtube}
						<div class="mt-6 flex flex-wrap gap-3">
							{#if artist.website}
								<a
									href={artist.website}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-calluna-sans-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
								>
									<Globe class="h-5 w-5" />
									Website
								</a>
							{/if}
							{#if artist.spotify}
								<a
									href={artist.spotify}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-calluna-sans-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
								>
									<Music class="h-5 w-5" />
									Spotify
								</a>
							{/if}
							{#if artist.instagram}
								<a
									href={artist.instagram}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-calluna-sans-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
								>
									<Instagram class="h-5 w-5" />
									Instagram
								</a>
							{/if}
							{#if artist.facebook}
								<a
									href={artist.facebook}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-calluna-sans-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
								>
									<Facebook class="h-5 w-5" />
									Facebook
								</a>
							{/if}
							{#if artist.youtube}
								<a
									href={artist.youtube}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-calluna-sans-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30"
								>
									<Youtube class="h-5 w-5" />
									YouTube
								</a>
							{/if}
						</div>
					{/if}
				</div>
			</div>

			<!-- Bio -->
			{#if artist.bio || artist.description}
				<div class="border-t border-gray-200 p-8 md:p-12">
					<h2 class="mb-4 text-2xl font-calluna-sans-bold text-pitch-black-100">
						O izvajalcu
					</h2>
					{#if artist.bio}
						<div class="prose prose-lg max-w-none font-calluna-sans-light text-gray-700">
							{@html artist.bio}
						</div>
					{:else if artist.description}
						<p class="font-calluna-sans-light text-gray-700">
							{artist.description}
						</p>
					{/if}
				</div>
			{/if}

			<!-- Associated Acts -->
			{#if artist.associated_acts && artist.associated_acts.length > 0}
				<div class="border-t border-gray-200 p-8 md:p-12">
					<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
						Povezani izvajalci
					</h2>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
						{#each artist.associated_acts as act}
							<a
								href={`/artists/${act.slug || act.id}`}
								class="group overflow-hidden rounded-lg bg-gray-50 transition-all hover:shadow-md"
							>
								{#if act.image}
									<div class="aspect-square overflow-hidden bg-gray-200">
										<img
											src={getImageUrl(act.image)}
											alt={act.stage_name}
											class="h-full w-full object-cover transition-transform group-hover:scale-105"
										/>
									</div>
								{:else}
									<div class="flex aspect-square items-center justify-center bg-gradient-to-br from-prototype-orange-500 to-brick-red-500">
										<span class="text-4xl font-calluna-sans-bold text-white">
											{act.stage_name.charAt(0).toUpperCase()}
										</span>
									</div>
								{/if}
								<div class="p-3">
									<p class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-prototype-orange-500">
										{act.stage_name}
									</p>
									{#if act.genre}
										<p class="mt-1 text-xs font-calluna-sans-light text-gray-600">
											{Array.isArray(act.genre) ? act.genre.join(', ') : act.genre}
										</p>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Upcoming Events -->
		{#if artist.upcoming_events && artist.upcoming_events.length > 0}
			<div class="mt-8 rounded-lg bg-white p-8 shadow-lg md:p-12">
				<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
					Prihajajoči dogodki
				</h2>
				<div class="grid grid-cols-1 gap-4">
					{#each artist.upcoming_events as event}
						<a
							href={generateEventUrl(event)}
							class="group flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-mean-green-500 hover:shadow-md"
						>
							<div class="flex items-center gap-4">
								{#if event.image}
									<div class="h-16 w-16 overflow-hidden rounded-lg bg-gray-200">
										<img
											src={getImageUrl(event.image)}
											alt={event.title}
											class="h-full w-full object-cover"
										/>
									</div>
								{/if}
								<div>
									<p class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-mean-green-500">
										{event.title}
									</p>
									<p class="mt-1 text-sm font-calluna-sans-light text-gray-600">
										{formatDate(event.event_date)}
									</p>
								</div>
							</div>
							<svg class="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Past Events -->
		{#if artist.past_events && artist.past_events.length > 0}
			<div class="mt-8 rounded-lg bg-white p-8 shadow-lg md:p-12">
				<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
					Pretekli dogodki
				</h2>
				<div class="grid grid-cols-1 gap-4">
					{#each artist.past_events as event}
						<a
							href={generateEventUrl(event)}
							class="group flex items-center justify-between rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-brick-red-500 hover:shadow-md"
						>
							<div class="flex items-center gap-4">
								{#if event.image}
									<div class="h-16 w-16 overflow-hidden rounded-lg bg-gray-200">
										<img
											src={getImageUrl(event.image)}
											alt={event.title}
											class="h-full w-full object-cover"
										/>
									</div>
								{/if}
								<div>
									<p class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-brick-red-500">
										{event.title}
									</p>
									<p class="mt-1 text-sm font-calluna-sans-light text-gray-600">
										{formatDate(event.event_date)}
									</p>
								</div>
							</div>
							<svg class="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</main>
