<script lang="ts">
  import type { PageData } from "./$types";
  import { generateEventUrl } from "$lib/utils/slug";
  import {
    Globe,
    Youtube,
    Instagram,
    Facebook,
    Music,
    MapPin,
  } from "@lucide/svelte";
  import { Badge } from "$lib/components/ui/badge";
  import EventCarousel from "$lib/components/EventCarousel.svelte";

  let { data }: { data: PageData } = $props();
  const { artist } = data;

  function getImageUrl(imageId: string): string {
    return `https://cms.cloverlabs.dev/assets/${imageId}`;
  }

  function getFallbackImage(): string {
    return "/beetle-placeholder.svg";
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("sl-SI", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
</script>

<svelte:head>
  <title>{artist.stage_name} - Klub KGB Maribor</title>
  <meta
    name="description"
    content={artist.bio ||
      artist.description ||
      `${artist.stage_name} - nastopi v Klubu KGB Maribor`}
  />
</svelte:head>

<main class="md:pt-8">
  <div class="mx-auto max-w-7xl flex flex-col gap-12">
    <!-- Artist Header -->
    <div class="overflow-hidden flex flex-col gap-12">
      <div class="flex flex-col gap-8 md:flex-row">
        {#if artist.image}
          <img
            src={getImageUrl(artist.image)}
            alt={artist.stage_name}
            class="md:size-64 size-full object-cover md:rounded-lg"
            onerror={(e) => {
              const target = e.target;
              if (target && target instanceof HTMLImageElement) {
                target.src = getFallbackImage();
              }
            }}
          />
        {:else}
          <div
            class="flex h-64 w-64 flex-shrink-0 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm px-4 md:px-0"
          >
            <span class="text-8xl font-calluna-sans-bold text-pitch-black-100">
              {artist.stage_name.charAt(0).toUpperCase()}
            </span>
          </div>
        {/if}

        <div class="flex flex-1 flex-col justify-center gap-2 px-4 md:px-0">
          <div class="flex items-center gap-2">
            <h1
              class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl"
            >
              {artist.stage_name}
              {#if artist.first_name || artist.last_name}
                <span
                  class="mt-2 text-sm font-calluna-sans-light text-pitch-black-100/80"
                >
                  ( {[artist.first_name, artist.last_name]
                    .filter(Boolean)
                    .join(" ")} )
                </span>
              {/if}
            </h1>
          </div>

          {#if artist.genre}
            <div
              class="flex gap-2 w-full flex-wrap items-center justify-start pr-1"
            >
              {#each artist.genre as genre}
                <Badge variant="outline">
                  {genre}
                </Badge>
              {/each}
            </div>
          {/if}

          {#if artist.country}
            <p
              class="mt-2 font-calluna-sans-light text-pitch-black-100/80 flex items-center gap-2"
            >
              <MapPin class="h-5 w-5" />
              {artist.country}
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
                  class="inline-flex items-center gap-2 rounded-lg font-calluna-sans-semibold text-pitch-black-100 backdrop-blur-sm transition-all hover:text-prototype-orange-500"
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
                  class="inline-flex items-center gap-2 rounded-lg font-calluna-sans-semibold text-pitch-black-100 backdrop-blur-sm transition-all hover:text-prototype-orange-500"
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
                  class="inline-flex items-center gap-2 rounded-lg font-calluna-sans-semibold text-pitch-black-100 backdrop-blur-sm transition-all hover:text-prototype-orange-500"
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
                  class="inline-flex items-center gap-2 rounded-lg font-calluna-sans-semibold text-pitch-black-100 backdrop-blur-sm transition-all hover:text-prototype-orange-500"
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
                  class="inline-flex items-center gap-2 rounded-lg font-calluna-sans-semibold text-pitch-black-100 backdrop-blur-sm transition-all hover:text-prototype-orange-500"
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
      <div class="flex flex-col gap-4 max-w-5xl px-4 md:px-0">
        {#if artist.bio || artist.description}
          <h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
            O <span class="text-brick-red-500">Izvajalcu</span>
          </h2>
          {#if artist.bio}
            <div
              class="prose prose-lg max-w-none font-calluna-sans-light text-pitch-black-200"
            >
              {@html artist.bio}
            </div>
          {:else if artist.description}
            <p class="font-calluna-sans-light text-gray-700">
              {artist.description}
            </p>
          {/if}
        {/if}
      </div>

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
                  <div
                    class="flex aspect-square items-center justify-center bg-gradient-to-br from-prototype-orange-500 to-brick-red-500"
                  >
                    <span class="text-4xl font-calluna-sans-bold text-white">
                      {act.stage_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                {/if}
                <div class="p-3">
                  <p
                    class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-prototype-orange-500"
                  >
                    {act.stage_name}
                  </p>
                  {#if act.genre}
                    <p
                      class="mt-1 text-xs font-calluna-sans-light text-gray-600"
                    >
                      {Array.isArray(act.genre)
                        ? act.genre.join(", ")
                        : act.genre}
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
      <div class="">
        <h2
          class="mb-6 px-4 md:px-0 text-2xl font-calluna-sans-bold text-pitch-black-100"
        >
          Prihajajoči <span class="text-mean-green-500">Dogodki</span>
        </h2>
        <EventCarousel events={artist.upcoming_events} />
      </div>
    {/if}

    <!-- Past Events -->
    {#if artist.past_events && artist.past_events.length > 0}
      <div class="">
        <h2
          class="mb-6 px-4 md:px-0 text-2xl font-calluna-sans-bold text-pitch-black-100"
        >
          Pretekli <span class="text-brick-red-500">Dogodki</span>
        </h2>
        <EventCarousel events={artist.past_events} />
      </div>
    {/if}
  </div>
</main>
