<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Command from "$lib/components/ui/command";
  import * as Empty from "$lib/components/ui/empty";
  import type { PageData } from "./$types";
  import * as m from "$lib/paraglide/messages";
  import { fade, fly, slide } from "svelte/transition";
  import { flip } from "svelte/animate";
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import NewsCard from "$lib/components/NewsCard.svelte";
  import NewsCarousel from "$lib/components/NewsCarousel.svelte";

  let { data }: { data: PageData } = $props();
  const { newsPosts } = data;

  let searchQuery: string = $state("");

  // Filtered news based on search
  const filteredNews = $derived.by(() => {
    if (!searchQuery.trim()) {
      return newsPosts;
    }

    const query = searchQuery.toLowerCase().trim();
    return newsPosts.filter(
      (post: { title: string; description: string }) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query)
    );
  });

  const isMobile = $derived(globalThis.innerWidth < 768);
</script>

<svelte:head>
  <title>Novice - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Najnovejše novice in obvestila iz Kluba KGB Maribor"
  />
</svelte:head>

<main class="flex flex-col md:gap-8 gap-4 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-right bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/content.png');"
  >
    <!-- Hero content -->
    <h1
      class="w-full text-mean-green-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">Prebrskajte</span>
      Novice
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Najnovejše novice in obvestila iz Kluba KGB Maribor
    </p>
  </section>

  <!-- Search Section -->
  <section class="w-full px-4 md:px-12">
    <div class="mx-auto max-w-7xl flex flex-col gap-4">
      <!-- Search Bar -->
      <Command.Root
        class="rounded-full md:min-w-[450px] border-1 border-slate-300 shadow-sm"
      >
        <Command.Input bind:value={searchQuery} />
      </Command.Root>

      <!-- Results Count -->
      <div class="text-sm font-calluna-sans-light text-gray-600">
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
  <section class="w-full">
    {#if isMobile}
      <NewsCarousel posts={filteredNews} />
    {/if}

    {#if !isMobile}
      <div class="mx-auto max-w-7xl">
        {#if filteredNews.length > 0}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each filteredNews as post, index (post.id)}
              <div
                class="group overflow-hidden rounded-lg transition-all w-full gap-auto"
                animate:flip={{ duration: 300 }}
              >
                <NewsCard {post} />
              </div>
            {/each}
          </div>
        {:else}
          <!-- No Results State -->
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
              <Empty.Title>Ni najdenih novic</Empty.Title>
              <Empty.Description>
                {#if searchQuery.trim()}
                  Poskusite z drugim iskanjem ali spremenite filter.
                {:else}
                  V tem obdobju ni načrtovanih dogodkov.
                {/if}
              </Empty.Description>
            </Empty.Header>
            {#if searchQuery.trim()}
              <Empty.Content>
                <Button
                  onclick={() => (searchQuery = "")}
                  variant="brick-red"
                  size="sm">{m.events_reset_filters()}</Button
                >
              </Empty.Content>
            {/if}
          </Empty.Root>
        {/if}
      </div>
    {/if}
  </section>

  <section id="newsletter" class="w-full bg-pitch-black-200 py-20 mt-[11rem]">
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
