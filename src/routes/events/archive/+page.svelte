<script lang="ts">
	import type { PageData } from './$types';
	import type { BlogPost } from '$lib/types';
	import BlogCard from '$lib/components/BlogCard.svelte';

	let { data }: { data: PageData } = $props();
	const { pastEvents } = data;

	let searchQuery: string = $state("");
	let selectedYear: number | "all" = $state("all");

	// Get unique years from events
	const availableYears = $derived.by(() => {
		const years = new Set(pastEvents.map((event: BlogPost) =>
			new Date(event.event_date).getFullYear()
		));
		return Array.from(years).sort((a, b) => b - a);
	});

	// Filtered events based on search and year
	const filteredEvents = $derived.by(() => {
		let filtered = pastEvents;

		// Filter by year
		if (selectedYear !== "all") {
			filtered = filtered.filter((event: BlogPost) =>
				new Date(event.event_date).getFullYear() === selectedYear
			);
		}

		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter((event: BlogPost) =>
				event.title.toLowerCase().includes(query) ||
				event.description?.toLowerCase().includes(query)
			);
		}

		return filtered;
	});

	function setYearFilter(year: number | "all") {
		selectedYear = year;
	}
</script>

<svelte:head>
	<title>Arhiv - Klub KGB Maribor</title>
	<meta name="description" content="Arhiv preteklih dogodkov in prireditev v Klubu KGB Maribor" />
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-brick-red-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-white md:text-5xl lg:text-6xl"
			>
				Arhiv dogodkov
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-white md:text-xl">
				Pretekli dogodki in prireditve v Klubu KGB Maribor
			</p>
		</div>
	</section>

	<!-- Filters and Search -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto max-w-7xl">
			<!-- Search Bar -->
			<div class="mb-6">
				<div class="relative">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Išči dogodke..."
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

			<!-- Year Filter Buttons -->
			<div class="flex flex-wrap gap-2">
				<button
					onclick={() => setYearFilter("all")}
					class="rounded-full px-6 py-2 font-calluna-sans-semibold transition-colors {selectedYear ===
					'all'
						? 'bg-brick-red-500 text-white'
						: 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
				>
					Vsi
				</button>
				{#each availableYears as year}
					<button
						onclick={() => setYearFilter(year)}
						class="rounded-full px-6 py-2 font-calluna-sans-semibold transition-colors {selectedYear ===
						year
							? 'bg-brick-red-500 text-white'
							: 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
					>
						{year}
					</button>
				{/each}
			</div>

			<!-- Results Count -->
			<div class="mt-4 text-sm font-calluna-sans-light text-gray-600">
				{filteredEvents.length}
				{filteredEvents.length === 1
					? "dogodek"
					: filteredEvents.length === 2
						? "dogodka"
						: filteredEvents.length === 3 || filteredEvents.length === 4
							? "dogodki"
							: "dogodkov"}
			</div>
		</div>
	</section>

	<!-- Events Grid -->
	<section class="w-full px-4 pb-12 md:px-12 md:pb-16">
		<div class="mx-auto max-w-7xl">
			{#if filteredEvents.length > 0}
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredEvents as event (event.id)}
						<BlogCard post={event} />
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
						{#if searchQuery.trim() || selectedYear !== "all"}
							Poskusite z drugim iskanjem ali spremenite filter.
						{:else}
							Arhiv je trenutno prazen.
						{/if}
					</p>
					{#if searchQuery.trim() || selectedYear !== "all"}
						<button
							onclick={() => {
								searchQuery = "";
								selectedYear = "all";
							}}
							class="mt-4 rounded-lg bg-brick-red-500 px-6 py-2 font-calluna-sans-semibold text-white transition-colors hover:bg-brick-red-900"
						>
							Ponastavi filtere
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</section>
</main>
