<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel";
  import NewsCard from "$lib/components/NewsCard.svelte";
  import { flip } from "svelte/animate";

  interface Props {
    posts: Array<any>;
  }

  let { posts }: Props = $props();
</script>

<Carousel.Root
  opts={{
    align: posts.length > 3 ? "start" : "center",
  }}
  class={`relative ${posts.length > 3 ? "max-w-full mx-auto" : "max-w-7xl mx-auto"}`}
>
  <Carousel.Content
    class={`${posts.length > 3 ? "md:mr-[6.75rem] mr-2 -ml-5 md:ml-15" : "md:-ml-12 mr-2 md:mr-0"}`}
  >
    {#each posts as post, index (post.id)}
      <Carousel.Item
        class={`basis-full sm:basis-2/3 md:basis-1/2 pl-7 md:pl-12 lg:basis-1/3`}
      >
        <NewsCard {post} />
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <div class="flex justify-center gap-2 mt-8">
    <Carousel.Previous class="!static !translate-y-0" />
    <Carousel.Next class="!static !translate-y-0" />
  </div>
</Carousel.Root>
