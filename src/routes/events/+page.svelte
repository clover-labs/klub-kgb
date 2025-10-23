<script lang="ts">
  import EventCarousel from "$lib/components/EventCarousel.svelte";
  import * as m from "$lib/paraglide/messages";
  import { page } from "$app/state";

  console.log(page.data);
</script>

<svelte:head>
  <title>{m.events_upcoming_title()}</title>
  <meta name="description" content={m.events_upcoming_meta_description()} />
</svelte:head>

<main class="flex flex-col gap-8">
  <!-- Hero Section -->
  <section class="h-100 flex flex-col justify-center items-center gap-6">
    <!-- Hero content -->
    <h1
      class="w-full text-mean-green-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">Vsi</span>
      Dogodki
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Že od leta 1998 dalje gostimo dobre ljudi in dogodke.
    </p>
  </section>

  <section id="dogodki" class="w-full flex justify-center flex-col">
    <div class="w-full mx-auto max-w-7xl">
      <h2
        class="mb-6 border-b-1 border-gray-200 pb-3 text-3xl font-calluna-sans-bold capitalize text-brick-red-500"
      >
        <span class="text-pitch-black-100">{m.common_upcoming()}</span>
        {m.home_events_title()}
      </h2>
    </div>
    <EventCarousel events={page.data.upcomingEvents} />
  </section>

  <section id="arhiv" class="w-full flex justify-center flex-col">
    <div class="w-full mx-auto max-w-7xl">
      <h2
        class="mb-6 border-b-1 border-gray-200 pb-3 text-3xl font-calluna-sans-bold capitalize text-brick-red-500"
      >
        <span class="text-pitch-black-100">{m.common_archive()}</span>
        {m.events_archive_title()}
      </h2>
    </div>
    <EventCarousel events={page.data.archiveEvents} />
  </section>
</main>
