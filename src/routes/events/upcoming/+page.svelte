<script lang="ts">
	import type { PageData } from "../../(events)/upcoming/$types";
	import BlogCard from "$lib/components/BlogCard.svelte";
	import NewsletterForm from "$lib/components/NewsletterForm.svelte";
	import * as m from "$lib/paraglide/messages";

	let { data }: { data: PageData } = $props();
	const { upcomingEvents } = data;

	type FilterType = "all" | "thisWeek" | "nextWeek" | "future";

	let activeFilter: FilterType = $state("all");
	let searchQuery: string = $state("");

	// Helper functions for date filtering
	function getStartOfWeek(date: Date): Date {
		const d = new Date(date);
		const day = d.getDay();
		const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
		return new Date(d.setDate(diff));
	}

	function getEndOfWeek(date: Date): Date {
		const start = getStartOfWeek(date);
		const end = new Date(start);
		end.setDate(end.getDate() + 6);
		end.setHours(23, 59, 59, 999);
		return end;
	}

	function isInThisWeek(eventDate: Date, today: Date): boolean {
		const startOfWeek = getStartOfWeek(today);
		const endOfWeek = getEndOfWeek(today);
		return eventDate >= startOfWeek && eventDate <= endOfWeek;
	}

	function isInNextWeek(eventDate: Date, today: Date): boolean {
		const startOfNextWeek = new Date(getStartOfWeek(today));
		startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
		const endOfNextWeek = getEndOfWeek(startOfNextWeek);
		return eventDate >= startOfNextWeek && eventDate <= endOfNextWeek;
	}

	function isInFuture(eventDate: Date, today: Date): boolean {
		const startOfNextWeek = new Date(getStartOfWeek(today));
		startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
		const endOfNextWeek = getEndOfWeek(startOfNextWeek);
		return eventDate > endOfNextWeek;
	}

	// Filtered and searched events
	const filteredEvents = $derived.by(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// First filter by date
		let filtered = upcomingEvents;
		if (activeFilter === "thisWeek") {
			filtered = upcomingEvents.filter((event) => {
				const eventDate = new Date(event.event_date);
				return isInThisWeek(eventDate, today);
			});
		} else if (activeFilter === "nextWeek") {
			filtered = upcomingEvents.filter((event) => {
				const eventDate = new Date(event.event_date);
				return isInNextWeek(eventDate, today);
			});
		} else if (activeFilter === "future") {
			filtered = upcomingEvents.filter((event) => {
				const eventDate = new Date(event.event_date);
				return isInFuture(eventDate, today);
			});
		}

		// Then filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			filtered = filtered.filter(
				(event) =>
					event.title.toLowerCase().includes(query) ||
					event.description?.toLowerCase().includes(query)
			);
		}

		return filtered;
	});

	function setFilter(filter: FilterType) {
		activeFilter = filter;
	}
</script>

<svelte:head>
	<title>{m.events_upcoming_title()}</title>
	<meta name="description" content={m.events_upcoming_meta_description()} />
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-mean-green-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl"
			>
				{m.events_upcoming_hero_title()}
			</h1>
			<p
				class="mt-4 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl"
			>
				{m.events_upcoming_hero_subtitle()}
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
						placeholder={m.events_search_placeholder()}
						class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
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

			<!-- Filter Buttons -->
			<div class="flex flex-wrap gap-2">
				<button
					onclick={() => setFilter("all")}
					class="rounded-full px-6 py-2 font-calluna-sans-semibold transition-colors {activeFilter ===
					'all'
						? 'bg-mean-green-500 text-pitch-black-100'
						: 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
				>
					{m.events_filter_all()}
				</button>
				<button
					onclick={() => setFilter("thisWeek")}
					class="rounded-full px-6 py-2 font-calluna-sans-semibold transition-colors {activeFilter ===
					'thisWeek'
						? 'bg-mean-green-500 text-pitch-black-100'
						: 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
				>
					{m.events_filter_this_week()}
				</button>
				<button
					onclick={() => setFilter("nextWeek")}
					class="rounded-full px-6 py-2 font-calluna-sans-semibold transition-colors {activeFilter ===
					'nextWeek'
						? 'bg-mean-green-500 text-pitch-black-100'
						: 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
				>
					{m.events_filter_next_week()}
				</button>
				<button
					onclick={() => setFilter("future")}
					class="rounded-full px-6 py-2 font-calluna-sans-semibold transition-colors {activeFilter ===
					'future'
						? 'bg-mean-green-500 text-pitch-black-100'
						: 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
				>
					{m.events_filter_future()}
				</button>
			</div>

			<!-- Results Count -->
			<div class="mt-4 text-sm font-calluna-sans-light text-gray-600">
				{filteredEvents.length}
				{filteredEvents.length === 1
					? m.events_count_single()
					: filteredEvents.length === 2
						? m.events_count_dual()
						: filteredEvents.length === 3 || filteredEvents.length === 4
							? m.events_count_few()
							: m.events_count_many()}
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
						{m.events_no_results_title()}
					</h3>
					<p class="text-center font-calluna-sans-light text-gray-600">
						{#if searchQuery.trim()}
							{m.events_no_results_search()}
						{:else}
							{m.events_no_results_period()}
						{/if}
					</p>
					{#if searchQuery.trim() || activeFilter !== "all"}
						<button
							onclick={() => {
								searchQuery = "";
								activeFilter = "all";
							}}
							class="mt-4 rounded-lg bg-mean-green-500 px-6 py-2 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-400"
						>
							{m.events_reset_filters()}
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="w-full bg-off-white-100 px-4 py-12 md:px-12">
		<div class="mx-auto max-w-7xl">
			<h2 class="text-3xl font-calluna-sans-semibold text-pitch-black-100">
				{m.events_stay_informed()}
			</h2>
			<p class="mt-2 font-calluna-sans-light text-gray-700">
				{m.events_newsletter_cta()}
			</p>
			<div class="mt-6">
				<NewsletterForm />
			</div>
		</div>
	</section>
</main>
