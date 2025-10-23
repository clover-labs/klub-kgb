<script lang="ts">
  import type { Artist } from "$lib/types";
  import { flip } from "svelte/animate";
  import Badge from "$lib/components/ui/badge/badge.svelte";

  let { artist }: { artist: Artist } = $props();

  function getImageUrl(imageId: string): string {
    return `https://cms.cloverlabs.dev/assets/${imageId}`;
  }

  function getFallbackImage(): string {
    return "/beetle-placeholder.svg";
  }
</script>

<a href={`/artists/${artist.slug || artist.id}`} class="flex flex-col gap-2">
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
        <span class="text-6xl font-calluna-sans-bold text-white">
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
      <span class="text-sm font-calluna-sans-light text-gray-500">
        {[artist.first_name, artist.last_name].filter(Boolean).join(" ")}
      </span>
    {/if}
  </div>

  {#if artist.description}
    <p class="line-clamp-2 font-calluna-sans-light text-pitch-black-200/70">
      {artist.description}
    </p>
  {/if}

  {#if artist.genre}
    <div class="flex gap-2 w-full flex-wrap items-center justify-end pr-1">
      {#each artist.genre as genre}
        <Badge variant="outline">
          {genre}
        </Badge>
      {/each}
    </div>
  {/if}
</a>
