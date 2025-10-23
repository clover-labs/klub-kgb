<script lang="ts">
  import type { BlogPost } from "$lib/types";
  import { Button } from "$lib/components/ui/button";
  import * as Command from "$lib/components/ui/command";
  import * as Empty from "$lib/components/ui/empty";
  import EventCard from "$lib/components/EventCard.svelte";
  import type { PageData } from "./$types";
  import * as Select from "$lib/components/ui/select";
  import { flip } from "svelte/animate";
  import { slide } from "svelte/transition";
  import * as m from "$lib/paraglide/messages";

  const months = [
    { value: "januar", label: "Januar" },
    { value: "februar", label: "Februar" },
    { value: "marec", label: "Marec" },
    { value: "april", label: "April" },
    { value: "maj", label: "Maj" },
    { value: "junij", label: "Junij" },
    { value: "julij", label: "Julij" },
    { value: "avgust", label: "Avgust" },
    { value: "september", label: "September" },
    { value: "oktober", label: "Oktober" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  let { data }: { data: PageData } = $props();
  const { year, events } = data;

  // Filter state
  let selectedMonths = $state<string[]>([]);
  let searchQuery = $state("");

  const resetFilters = () => {
    searchQuery = "";
    selectedMonths = [];
  };

  // Filter and group events
  const filteredAndGroupedEvents = $derived.by(() => {
    // Apply filters
    let filteredEvents = events;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          (event.description?.toLowerCase().includes(query) ?? false)
      );
    }

    if (selectedMonths.length > 0) {
      filteredEvents = filteredEvents.filter((event) => {
        const eventMonth = months[new Date(event.event_date).getMonth()].value;
        return selectedMonths.includes(eventMonth);
      });
    }

    // Group filtered events by month
    const grouped = filteredEvents.reduce(
      (acc: Record<number, BlogPost[]>, event: BlogPost) => {
        const month = new Date(event.event_date).getMonth();
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(event);
        return acc;
      },
      {}
    );

    // Sort months descending (newest first)
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([month, events]) => ({
        month: Number(month),
        monthName: new Date(year, Number(month), 1).toLocaleDateString(
          "sl-SI",
          { month: "long" }
        ),
        events,
      }));
  });
</script>

<svelte:head>
  <title>Dogodki {year} - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Vsi dogodki v letu {year} v Klubu KGB Maribor"
  />
</svelte:head>

<main class="flex flex-col gap-8">
  <!-- Hero Section -->
  <section class="h-100 flex flex-col justify-center items-center gap-6">
    <!-- Hero content -->
    <h1
      class="w-full text-mean-green-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">Dogodki</span>
      {year}
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Vsi dogodki v letu {year}
    </p>
  </section>

  <!-- Events Grid by Month -->
  <section class="w-full px-4 py-8 md:px-12 md:py-12">
    <div class="mx-auto max-w-7xl flex flex-col gap-4">
      <!-- Search Bar -->
      <Command.Root
        class="rounded-full md:min-w-[450px] border-1 border-slate-300 shadow-sm"
      >
        <Command.Input bind:value={searchQuery} />
      </Command.Root>

      <div class="flex justify-between items-center mb-12">
        <!-- Results Count -->
        <div class="text-sm font-calluna-sans-light text-gray-600">
          {filteredAndGroupedEvents.length}
          {filteredAndGroupedEvents.length === 1
            ? m.events_count_single()
            : filteredAndGroupedEvents.length === 2
              ? m.events_count_dual()
              : filteredAndGroupedEvents.length === 3 ||
                  filteredAndGroupedEvents.length === 4
                ? m.events_count_few()
                : m.events_count_many()}
        </div>
        <Select.Root bind:value={selectedMonths} type="multiple">
          <Select.Trigger placeholder="Izberi mesec">
            {selectedMonths.length
              ? `${selectedMonths.length} mesecev`
              : "Izberi mesec"}
          </Select.Trigger>
          <Select.Content>
            {#each months as month}
              <Select.Item value={month.value}>{month.label}</Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <!-- Events List -->
      {#if filteredAndGroupedEvents.length > 0}
        {#each filteredAndGroupedEvents as monthGroup (monthGroup.month)}
          <div class="mb-12" transition:slide|local>
            <h2
              class="mb-6 border-b-1 border-gray-200 pb-3 text-4xl font-cezanne capitalize text-pitch-black-100"
            >
              {monthGroup.monthName}
            </h2>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {#each monthGroup.events as event (event.id)}
                <div
                  class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl"
                  transition:flip={{ duration: 300 }}
                >
                  <EventCard post={event} />
                </div>
              {/each}
            </div>
          </div>
        {/each}
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
          {#if searchQuery.trim() || selectedMonths.length > 0}
            <Empty.Content>
              <Button onclick={resetFilters} variant="brick-red" size="sm"
                >{m.events_reset_filters()}</Button
              >
            </Empty.Content>
          {/if}
        </Empty.Root>
      {/if}
    </div>
  </section>
</main>
