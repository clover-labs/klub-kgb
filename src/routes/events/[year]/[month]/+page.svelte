<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Command from "$lib/components/ui/command";
  import type { PageData } from "./$types";
  import EventCard from "$lib/components/EventCard.svelte";
  import * as Empty from "$lib/components/ui/empty";
  import * as m from "$lib/paraglide/messages";
  import { flip } from "svelte/animate";

  let { data }: { data: PageData } = $props();
  const { year, monthName, events } = data;

  let searchQuery = $state("");

  const filteredEvents = $derived.by(() => {
    return events.filter((event) => {
      return event.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  const resetFilters = () => {
    searchQuery = "";
  };
</script>

<svelte:head>
  <title>{monthName} {year} - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Dogodki v {monthName} {year} v Klubu KGB Maribor"
  />
</svelte:head>

<main class="flex flex-col gap-8">
  <!-- Hero Section -->
  <section class="h-100 flex flex-col justify-center items-center gap-6">
    <!-- Hero content -->
    <h1
      class="w-full text-mean-green-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      {monthName}
      <span class="text-pitch-black-100">{year}</span>
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Vsi dogodki {monthName}
      {year}
    </p>
  </section>

  <!-- Events Grid -->
  <section class="w-full px-4 py-8 md:px-12 md:py-12">
    <div class="mx-auto max-w-7xl flex flex-col gap-4">
      <!-- Search Bar -->
      <Command.Root
        class="rounded-full md:min-w-[450px] border-1 border-slate-300 shadow-sm"
      >
        <Command.Input bind:value={searchQuery} />
      </Command.Root>

      <!-- Results Count -->
      <div
        class="text-sm font-calluna-sans-light text-pitch-black-100/60 mb-12"
      >
        {filteredEvents.length}
        {events.length === 1
          ? m.events_count_single()
          : filteredEvents.length === 2
            ? m.events_count_dual()
            : filteredEvents.length === 3 || filteredEvents.length === 4
              ? m.events_count_few()
              : m.events_count_many()}
      </div>

      <div class="flex justify-between items-center">
        <!-- Events Grid -->
        {#if filteredEvents.length > 0}
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each filteredEvents as event: BlogPost (event.id)}
              <div
                class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
                animate:flip={{ duration: 300 }}
              >
                <EventCard post={event} />
              </div>
            {/each}
          </div>
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
            {#if searchQuery.trim()}
              <Empty.Content>
                <Button onclick={resetFilters} variant="brick-red" size="sm"
                  >{m.events_reset_filters()}</Button
                >
              </Empty.Content>
            {/if}
          </Empty.Root>
        {/if}
      </div>
    </div>
  </section>
</main>
