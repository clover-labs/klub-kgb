<script lang="ts">
  import type { Artist } from "$lib/types";
  import ArtistsCarousel from "$lib/components/ArtistsCarousel.svelte";
  import Badge from "$lib/components/ui/badge/badge.svelte";
  import * as Command from "$lib/components/ui/command";
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import type { PageData } from "./$types";
  import { flip } from "svelte/animate";
  import * as m from "$lib/paraglide/messages";

  let { data }: { data: PageData } = $props();
  const { artists } = data;

  let searchQuery: string = $state("");

  function getImageUrl(imageId: string): string {
    return `https://cms.cloverlabs.dev/assets/${imageId}`;
  }

  function getFallbackImage(): string {
    return "/beetle-placeholder.svg";
  }

  // Filtered artists based on search
  const filteredArtists = $derived.by(() => {
    if (!searchQuery.trim()) {
      return artists;
    }

    const query = searchQuery.toLowerCase().trim();
    return artists.filter((artist: Artist) => {
      const stageName = artist.stage_name?.toLowerCase() || "";
      const firstName = artist.first_name?.toLowerCase() || "";
      const lastName = artist.last_name?.toLowerCase() || "";
      const genre = Array.isArray(artist.genre)
        ? artist.genre.join(" ").toLowerCase()
        : "";
      const description = artist.description?.toLowerCase() || "";

      return (
        stageName.includes(query) ||
        firstName.includes(query) ||
        lastName.includes(query) ||
        genre.includes(query) ||
        description.includes(query)
      );
    });
  });

  const isMobile = $derived(globalThis.innerWidth < 768);
</script>

<svelte:head>
  <title>Izvajalci - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Izvajalci in glasbeniki, ki nastopajo v Klubu KGB Maribor"
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
      class="w-full text-brick-red-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">Prebrskajte</span>
      Izvajalce
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Spoznajte glasbenike in umetnike, ki nastopajo pri nas
    </p>
  </section>

  <!-- Search Section -->
  <section class="w-full px-4 md:px-12 xl:px-0">
    <div class="mx-auto max-w-7xl flex flex-col gap-4">
      <!-- Search Bar -->
      <Command.Root
        class="rounded-full md:min-w-[450px] border-1 border-slate-300 shadow-sm"
      >
        <Command.Input bind:value={searchQuery} />
      </Command.Root>

      <!-- Results Count -->
      <div class="text-sm font-calluna-sans-light text-gray-600">
        {filteredArtists.length}
        {filteredArtists.length === 1
          ? "izvajalec"
          : filteredArtists.length === 2
            ? "izvajalci"
            : filteredArtists.length === 3 || filteredArtists.length === 4
              ? "izvajalce"
              : "izvajalcev"}
      </div>
    </div>
  </section>

  <!-- Artists Grid -->
  {#if isMobile && filteredArtists.length > 0}
    <ArtistsCarousel artists={filteredArtists} />
  {/if}

  {#if !isMobile}
    <section class="w-full">
      <div class="mx-auto max-w-7xl px-4 md:px-12 xl:px-0">
        {#if filteredArtists.length > 0}
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center md:place-items-start w-full"
          >
            {#each filteredArtists as artist (artist.id)}
              <div
                animate:flip={{ duration: 300 }}
                class="group overflow-hidden rounded-lg transition-all w-full gap-auto"
              >
                <a
                  href={`/artists/${artist.slug || artist.id}`}
                  class="flex flex-col gap-2"
                >
                  <div class="relative w-full h-64 overflow-hidden">
                    {#if artist.image}
                      <img
                        src={getImageUrl(artist.image)}
                        alt={artist.stage_name}
                        class="h-full w-full object-top rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                        onerror={(e) => {
                          const target = e.target;
                          if (target && target instanceof HTMLImageElement) {
                            target.src = getFallbackImage();
                          }
                        }}
                      />
                    {:else}
                      <div
                        class="flex rounded-lg h-full w-full items-center justify-center bg-pitch-black-200"
                      >
                        <span
                          class="text-6xl font-calluna-sans-bold text-white"
                        >
                          {artist.stage_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    {/if}
                  </div>

                  <div class="flex flex-col w-full">
                    <h2
                      class="text-xl font-calluna-sans-semibold text-pitch-black-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      {artist.stage_name}
                    </h2>
                    {#if artist.first_name || artist.last_name}
                      <span
                        class="text-sm font-calluna-sans-light text-gray-500"
                      >
                        {[artist.first_name, artist.last_name]
                          .filter(Boolean)
                          .join(" ")}
                      </span>
                    {/if}
                  </div>

                  {#if artist.description}
                    <p
                      class="line-clamp-2 font-calluna-sans-light text-pitch-black-200/70"
                    >
                      {artist.description}
                    </p>
                  {/if}

                  {#if artist.genre}
                    <div
                      class="flex gap-2 w-full flex-wrap items-center justify-end pr-1"
                    >
                      {#each artist.genre as genre}
                        <Badge variant="outline">
                          {genre}
                        </Badge>
                      {/each}
                    </div>
                  {/if}
                </a>
              </div>
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
  {/if}

  <section
    id="newsletter"
    class="w-full bg-pitch-black-200 py-20 mt-12 md:mt-18 px-4 md:px-0"
  >
    <div
      class="w-full max-w-7xl mx-auto flex flex-col items-center md:gap-4 gap-2 px-4 md:px-0"
    >
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
      <NewsletterForm class="mt-4 md:mt-12 w-full" />
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
