<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel";
  import EventCard from "$lib/components/EventCard.svelte";
  import type { BlogPost } from "$lib/types";

  interface Props {
    events: Array<BlogPost>;
  }

  let { events }: Props = $props();
</script>

<div class="w-full overflow-hidden">
  <Carousel.Root
    opts={{
      align: events.length > 3 ? "start" : "center",
    }}
    class={`relative mt-4 md:mt-8 ${events.length > 3 ? "max-w-full mx-auto" : "max-w-7xl mx-auto"}`}
  >
    <Carousel.Content
      class={`${events.length > 3 ? "md:mr-[6.75rem] mr-2 -ml-5 md:ml-15" : "md:-ml-12 mr-2 md:mr-0"}`}
    >
      {#each events as event, index (event.id)}
        <Carousel.Item
          class={`basis-full sm:basis-2/3 md:basis-1/2 pl-7 md:pl-12 lg:basis-1/3`}
        >
          <EventCard post={event} />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <div class="flex justify-center gap-2 mt-8">
      <Carousel.Previous class="!static !translate-y-0" />
      <Carousel.Next class="!static !translate-y-0" />
    </div>
  </Carousel.Root>
</div>
