<script lang="ts">
  import type { Artist } from "$lib/types";
  import ArtistsCard from "$lib/components/ArtistsCard.svelte";
  import * as Carousel from "$lib/components/ui/carousel";
  import { flip } from "svelte/animate";

  interface Props {
    artists: Array<Artist>;
  }

  let { artists }: Props = $props();
</script>

<div class="w-full overflow-hidden">
  <Carousel.Root
    opts={{
      align: artists.length > 3 ? "start" : "center",
    }}
    class={`relative ${artists.length > 3 ? "max-w-full xl:max-w-7xl mx-auto" : "max-w-7xl mx-auto"}`}
  >
    <Carousel.Content
      class={`relative ${artists.length > 3 ? "xl:mr-0 mr-2 -ml-4 xl:-ml-6 lg:mr-[3rem] lg:ml-6 md:mr-12 md:-ml-4 sm:-ml-2 sm:mr-4" : "xl:-ml-6 mr-2 xl:mr-0  lg:ml-6 md:mr-12 md:-ml-4"}`}
    >
      {#each artists as artist, index (artist.id)}
        <Carousel.Item
          class={`basis-full sm:basis-1/2 lg:basis-1/2 pl-6 md:pl-16 lg:pl-6 lg:basis-1/3 xl:basis-1/3`}
        >
          <ArtistsCard {artist} />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <div class="flex justify-center gap-2 mt-8">
      <Carousel.Previous class="!static !translate-y-0" />
      <Carousel.Next class="!static !translate-y-0" />
    </div>
  </Carousel.Root>
</div>
