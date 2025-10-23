<script lang="ts">
  import type { PageData } from "./$types";
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import * as m from "$lib/paraglide/messages";
  import { Head } from "svead";
  import { createSEOConfig } from "$lib/seo";
  import { languageTag } from "$lib/paraglide/runtime";
  import EventCarousel from "$lib/components/EventCarousel.svelte";

  export let data: PageData;
  const { upcomingEvents } = data;

  const seo_config = createSEOConfig({
    title: m.home_title(),
    description: m.home_meta_description(),
    url: "/",
    type: "website",
    locale: languageTag(),
  });
</script>

<Head {seo_config} />

<main class="flex flex-col gap-[5rem] md:gap-[12rem] md:-mt-23">
  <!-- Hero Section -->
  <section
    class="bg-[url('/heroes/default.png')] bg-cover bg-left md:bg-cover bg-center h-screen flex flex-col justify-start items-start"
  >
    <!-- Hero content -->
    <div
      class="w-full flex flex-col items-center lg:items-start justify-center h-full py-2 gap-2 md:gap-4 max-w-7xl mx-auto px-6 md:px-8 xl:px-0"
    >
      <h1
        class="w-full text-pitch-black-100 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center lg:text-left"
      >
        {m.home_hero_title()}
      </h1>
      <p
        class="w-full sm:max-w-1/2 text-pitch-black-100 text-lg lg:text-2xl font-calluna-sans-light text-center lg:text-left"
      >
        {m.home_hero_subtitle()}
      </p>
      <a
        href="https://olaii.com/organizer/866/klub-kgb"
        target="_blank"
        class="w-full md:w-fit text-brick-red-200 hover:text-brick-red-500 text-xl transition-all duration-300 lg:text-xl font-calluna-sans-thin group flex items-center justify-center md:justify-start"
      >
        {m.home_tickets_cta()}
        <span
          class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
          >→</span
        >
      </a>
    </div>
  </section>

  <!-- Event Section -->
  <section
    id="dogodki"
    class="w-full flex justify-center flex-col gap-2 md:gap-8"
  >
    <h2
      class="text-brick-red-500 text-3xl md:text-6xl font-calluna-sans-bold uppercase text-center"
    >
      <span class="text-pitch-black-100">{m.common_upcoming()}</span>
      {m.home_events_title()}
    </h2>
    <h5
      class="text-pitch-black-100 text-lg md:text-2xl font-calluna-sans-light text-center"
    >
      {m.home_events_subtitle()}.
    </h5>

    <EventCarousel events={upcomingEvents} />
  </section>

  <section id="newsletter" class="w-full bg-pitch-black-200 py-20 px-4 md:px-0">
    <div
      class="w-full max-w-7xl mx-auto flex flex-col items-center gap-2 md:gap-4"
    >
      <h2
        class="text-prototype-orange-500 text-3xl md:text-6xl font-calluna-sans-bold uppercase text-center"
      >
        {m.home_newsletter_title()}
      </h2>
      <h5
        class="text-really-white-100 text-md md:text-2xl font-calluna-sans-light text-center"
      >
        {m.home_newsletter_subtitle()}
      </h5>
      <NewsletterForm class="mt-4 md:mt-12 w-full" />
      <a
        href="/news"
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
