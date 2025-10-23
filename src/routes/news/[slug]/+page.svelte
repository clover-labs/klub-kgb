<script lang="ts">
  import type { PageData } from "./$types";
  import {
    Share2,
    ArrowLeft,
    Calendar,
    ExternalLink,
    Link,
  } from "@lucide/svelte";
  import { generateEventUrl } from "$lib/utils/slug";
  import { Head, SchemaOrg } from "svead";
  import { createSEOConfig, siteConfig } from "$lib/seo";
  import { languageTag } from "$lib/paraglide/runtime";
  import { page } from "$app/stores";
  import Button from "$lib/components/ui/button/button.svelte";

  let { data }: { data: PageData } = $props();
  const { post } = data;
  let isCopied = $state(false);

  function formatEventDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("sl-SI", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getImageUrl(imageId: string): string {
    return `https://cms.cloverlabs.dev/assets/${imageId}`;
  }

  async function sharePost() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 3000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  }

  // SEO Configuration
  const newsUrl = $derived($page.url.pathname);
  const newsImageUrl = $derived(
    post.image ? getImageUrl(post.image) : undefined
  );

  const seo_config = $derived(
    createSEOConfig({
      title: `${post.title} - Novice - Klub KGB Maribor`,
      description: post.description,
      url: newsUrl,
      image: newsImageUrl,
      type: "article",
      author: "Klub KGB Maribor",
      locale: languageTag(),
    })
  );

  // Article Schema for news posts
  const articleSchema = $derived({
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: newsImageUrl ? [newsImageUrl] : undefined,
    datePublished: post.date_created,
    dateModified: post.date_updated || post.date_created,
    author: {
      "@type": "Organization",
      name: "Klub KGB Maribor",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Klub KGB Maribor",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
  });

  const isMobile = $derived(globalThis.innerWidth < 768);
</script>

<Head {seo_config} />
<SchemaOrg schema={articleSchema} />

<main class="min-h-screen flex flex-col items-center">
  <!-- Article Header -->
  <section
    class="relative flex justify-between items-start w-full md:h-[400px] p-0"
  >
    <!-- Left Content -->
    <div
      class="flex flex-col gap-6 md:p-30 md:pt-[7.5rem] md:pl-16 z-20 w-full"
    >
      {#if post.image && isMobile}
        <img
          src={getImageUrl(post.image)}
          alt={post.title}
          class="w-full h-full object-cover"
        />
      {/if}
      <div
        class="flex flex-col gap-6 px-4 pb-8 md:p-0 md:pt-0 md:pl-0 z-20 w-full"
      >
        <div class="flex items-center gap-2">
          <span class="text-pitch-black-100 font-calluna-sans-light uppercase"
            >Novica</span
          >
          <span class="text-brick-red-200 font-calluna-sans-light">///</span>
          <span class="text-pitch-black-100 font-calluna-sans-light uppercase"
            >{post.category || "Splošno"}</span
          >
        </div>

        <h1
          class="text-pitch-black-100 text-5xl font-calluna-sans-semibold uppercase tracking-tight leading-tight"
        >
          {post.title}
        </h1>

        {#if post.description}
          <p
            class="text-pitch-black-200/70 text-xl font-calluna-sans-light leading-relaxed max-w-2xl"
          >
            {post.description}
          </p>
        {/if}
      </div>
    </div>

    <!-- Right Hero Image with Mask -->
    {#if post.image && !isMobile}
      <div class="relative flex-grow flex justify-end h-full w-2/3">
        <!-- Gradient Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-really-white-100 via-transparent to-transparent z-10"
        ></div>

        <img
          class="aspect-video object-cover"
          src={getImageUrl(post.image)}
          alt={post.title}
        />
      </div>
    {/if}
  </section>

  <!-- Article Metadata -->
  <section class="w-full border-t border-pitch-black-100/10 py-6 md:px-16 px-4">
    <div class="flex justify-between items-end md:items-center">
      <div class="flex items-center gap-6 flex-col md:flex-row">
        <!-- Author Info -->
        <div class="flex items-center gap-4">
          <img
            src={post.author?.image || "/placeholder-image.svg"}
            alt={post.author?.name || "Author"}
            class="w-10 h-10 rounded-full object-cover"
          />
          <p class="text-gray-400">
            Od <span class="text-pitch-black-100"
              >{post.author?.name || "KGB Team"}</span
            >
          </p>
        </div>

        <!-- Date Info -->
        <div class="flex items-center gap-4">
          <div class="w-2 h-2 rounded-full bg-brick-red-200"></div>
          <span class="text-pitch-black-200/70"
            >Objavljeno: {formatEventDate(post.date_published)}</span
          >
        </div>
      </div>

      <!-- Share Button -->
      <Button
        variant="ghost"
        onclick={sharePost}
        class="p-2 hover:bg-off-white-100 rounded-full transition-colors cursor-pointer"
      >
        {#if isCopied}
          <svg class="size-5 text-mean-green-500" viewBox="0 0 16 16">
            <polygon
              points="5.76 14.07 0.27 8.3 1.72 6.92 5.74 11.15 14.26 1.93 15.73 3.29 5.76 14.07"
            />
          </svg>
        {:else}
          <Link class="md:size-5 size-6 text-gray-400" />
        {/if}
      </Button>
    </div>
  </section>

  <!-- Article Content -->
  <section
    class="md:px-16 px-4 md:py-12 py-8 bg-really-white-100 prose text-center text-lg max-w-5xl"
  >
    {#if post.content}
      <div
        class="prose prose-lg max-w-none font-calluna-sans-light text-gray-700"
      >
        {@html post.content}
      </div>
    {:else}
      <div
        class="rounded-lg border-2 border-gray-200 bg-gray-50 p-8 text-center"
      >
        <p class="font-calluna-sans-light text-gray-600">
          Ta novica še nima vsebine. Prosimo preverite pozneje!
        </p>
      </div>
    {/if}
  </section>

  <!-- Related Event -->
  {#if post.related_event}
    <div
      class="mt-8 rounded-lg border-2 border-mean-green-500 bg-white p-6 shadow-lg md:p-8"
    >
      <div class="mb-4 flex items-center gap-2">
        <div class="h-1 w-12 bg-mean-green-500"></div>
        <h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
          Povezan dogodek
        </h2>
      </div>

      <a
        href={generateEventUrl(post.related_event)}
        class="group flex flex-col gap-4 md:flex-row md:items-center"
      >
        {#if post.related_event.image}
          <div
            class="h-48 w-full overflow-hidden rounded-lg bg-gray-200 md:h-32 md:w-48 md:flex-shrink-0"
          >
            <img
              src={getImageUrl(post.related_event.image)}
              alt={post.related_event.title}
              class="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        {/if}

        <div class="flex-1">
          <h3
            class="mb-2 text-xl font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-mean-green-500"
          >
            {post.related_event.title}
          </h3>

          {#if post.related_event.description}
            <p class="mb-3 font-calluna-sans-light text-gray-600 line-clamp-2">
              {post.related_event.description}
            </p>
          {/if}

          <div class="flex flex-wrap items-center gap-4">
            <div
              class="inline-flex items-center gap-2 text-sm font-calluna-sans-light text-gray-600"
            >
              <Calendar class="h-4 w-4" />
              {formatEventDate(post.related_event.event_date)}
            </div>

            <span
              class="inline-flex items-center gap-2 font-calluna-sans-semibold text-mean-green-500 transition-colors group-hover:gap-3"
            >
              Poglej dogodek
              <ExternalLink class="h-4 w-4" />
            </span>
          </div>
        </div>
      </a>
    </div>
  {/if}

  <!-- Back to News Button -->
  <a
    href="/news"
    class="text-brick-red-200 text-lg font-calluna-sans-semibold group flex items-center"
  >
    <span
      class="mr-2 group-hover:translate-x-[-2px] transition-transform duration-300"
      >←</span
    >
    Nazaj na novice
  </a>
</main>
