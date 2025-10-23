<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";

  let { post }: { post: any } = $props();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sl-SI", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getImageUrl = (imageId: string): string => {
    return `https://cms.cloverlabs.dev/assets/${imageId}`;
  };

  const getFallbackImage = (): string => {
    return "/placeholder-image.svg";
  };
</script>

<!-- https://cms.cloverlabs.dev/assets/e664fa04-3802-4822-a3f4-c13195c78f62?2025-10-11T13:43:49.335Z : TEST IMAGE -->

<div
  class="group overflow-hidden rounded-lg liquid-glass m-1 shadow-card transition-all hover:scale-[102%] ease-in-out"
>
  <a
    href={`/news/${post.slug || post.id}`}
    class="block"
    style={post.image
      ? `background: url('${getImageUrl(post.image)}') no-repeat center center / cover;`
      : ""}
  >
    <div class="px-8 py-6 flex flex-col gap-4 bg-really-white-100/80">
      <div class="flex w-full justify-between items-center">
        <span class="text-sm font-calluna-sans-semibold text-brick-red-200"
          >Novica</span
        >
      </div>

      <div class="flex flex-col gap-1">
        <h2
          class="text-2xl font-calluna-sans-semibold text-pitch-black-100 transition-colors"
        >
          {post.title}
        </h2>

        <!-- {#if post.description} -->
        <p
          class="line-clamp-3 font-calluna-sans-light text-pitch-black-200/70 text-sm"
        >
          {post.description}
        </p>
        <!-- {/if} -->
      </div>

      <div class="flex justify-between items-end">
        {#if post.date_published}
          <time
            class="text-sm font-calluna-sans-light text-pitch-black-200"
            datetime={post.date_published}
          >
            {formatDate(post.date_published)}
          </time>
        {/if}
        <img src="/logo.svg" alt="KGB Logo" class="size-6" />
      </div>
    </div>
  </a>
</div>
