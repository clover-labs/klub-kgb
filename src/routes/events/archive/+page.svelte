<script lang="ts">
  import type { PageData } from "./$types";
  import type { BlogPost } from "$lib/types";
  import EventCard from "$lib/components/EventCard.svelte";
  import * as m from "$lib/paraglide/messages";
  import Chip from "$lib/components/ui/chip/chip.svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button";
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import { flip } from "svelte/animate";
  import EventCarousel from "$lib/components/EventCarousel.svelte";

  let { data }: { data: PageData } = $props();
  const { pastEvents } = data;

  let searchQuery: string = $state("");
  let selectedYear: number | "all" = $state("all");

  // Get unique years from events
  const availableYears = $derived.by(() => {
    const years = new Set(
      pastEvents.map((event: BlogPost) =>
        new Date(event.event_date).getFullYear()
      )
    );
    return Array.from(years).sort(
      (a: unknown, b: unknown) => (b as number) - (a as number)
    );
  });

  // Filtered events based on search and year
  const filteredEvents = $derived.by(() => {
    let filtered = pastEvents;

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter(
        (event: BlogPost) =>
          new Date(event.event_date).getFullYear() === selectedYear
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (event: BlogPost) =>
          event.title.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  function setYearFilter(year: number | "all") {
    selectedYear = year;
  }

  const isMobile = $derived(globalThis.innerWidth < 768);
</script>

<svelte:head>
  <title>Arhiv - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Arhiv preteklih dogodkov in prireditev v Klubu KGB Maribor"
  />
</svelte:head>

<main class="flex flex-col md:gap-8 gap-4 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-left bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/events.png');"
  >
    <!-- Hero content -->
    <h1
      class="w-full text-mean-green-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">{m.common_archive()}</span>
      {m.events_archive_title()}
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Pretekli dogodki in prireditve v Klubu KGB Maribor
    </p>
  </section>

  <!-- Filters and Search -->
  <section class="w-full">
    <div class="mx-auto max-w-7xl flex flex-col gap-4 px-4 md:px-0">
      <!-- Search Bar -->
      <Command.Root
        class="rounded-full md:min-w-[450px] border-1 border-slate-300 shadow-sm"
      >
        <Command.Input bind:value={searchQuery} />
      </Command.Root>

      <!-- Year Filter Buttons -->
      <div class="flex flex-wrap gap-2">
        <Chip
          isActive={selectedYear === "all"}
          onClick={() => setYearFilter("all")}
          label={m.events_filter_all()}
        />
        {#each availableYears as year}
          <Chip
            isActive={selectedYear === year}
            onClick={() => setYearFilter(year as number)}
            label={String(year)}
          />
        {/each}
      </div>

      <!-- Results Count -->
      <div class="-mt-2 text-sm font-calluna-sans-light text-gray-600">
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
    <!-- Events Grid -->
    <div
      class="w-full flex justify-center flex-col gap-2 md:gap-8 mt-4 md:mt-8"
    >
      {#if filteredEvents.length > 0}
        {#if isMobile}
          <EventCarousel events={filteredEvents} />
        {:else}
          <div class="mx-auto max-w-7xl">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {#each filteredEvents as event, index (event.id)}
                <div
                  class="group overflow-hidden rounded-lg transition-all w-full gap-auto"
                  animate:flip={{ duration: 300 }}
                >
                  <EventCard post={event} />
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <Empty.Root>
          <Empty.Header>
            <Empty.Media variant="default">
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
            </Empty.Media>
            <Empty.Title>{m.events_no_results_title()}</Empty.Title>
            <Empty.Description>
              {#if searchQuery.trim()}
                {m.events_no_results_search()}
              {:else}
                {m.events_no_results_period()}
              {/if}
            </Empty.Description>
          </Empty.Header>
          {#if searchQuery.trim() || selectedYear !== "all"}
            <Empty.Content>
              <Button
                onclick={() => {
                  searchQuery = "";
                  selectedYear = "all";
                }}
                variant="brick-red"
                size="sm">{m.events_reset_filters()}</Button
              >
            </Empty.Content>
          {/if}
        </Empty.Root>
      {/if}
    </div>
  </section>

  <section
    id="newsletter"
    class="w-full bg-pitch-black-200 py-20 mt-12 md:mt-18 px-4 md:px-0"
  >
    <div class="w-full max-w-7xl mx-auto flex flex-col items-center gap-4">
      <h2
        class="text-really-white-100 text-3xl md:text-6xl font-calluna-sans-bold uppercase text-center"
      >
        {m.events_stay()}
        <span class="text-prototype-orange-500">{m.events_informed()}</span>
      </h2>
      <h5
        class="text-really-white-100 text-lg md:text-2xl font-calluna-sans-light text-center"
      >
        {m.events_newsletter_cta()}
      </h5>
      <NewsletterForm class="mt-12 w-full" />
      <a
        href="/events/upcoming"
        class="text-mean-green-500 text-lg font-calluna-sans-semibold group flex items-center"
      >
        {m.home_latest_news_cta()}
        <span
          class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
          >→</span
        >
      </a>
    </div>
  </section>
</main>
