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

<Carousel.Root
  opts={{
    align: artists.length > 3 ? "start" : "center",
  }}
  class={`relative ${artists.length > 3 ? "max-w-full mx-auto" : "max-w-7xl mx-auto"}`}
>
  <Carousel.Content
    class={`${artists.length > 3 ? "md:mr-[6.75rem] mr-2 -ml-5 md:ml-15" : "md:-ml-12 mr-2 md:mr-0"}`}
  >
    {#each artists as artist, index (artist.id)}
      <Carousel.Item
        class={`basis-full sm:basis-2/3 md:basis-1/2 pl-7 md:pl-12 lg:basis-1/3`}
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
