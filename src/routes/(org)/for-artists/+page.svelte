<script lang="ts">
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import * as m from "$lib/paraglide/messages";
  import { Head } from "svead";
  import { createSEOConfig } from "$lib/seo";
  import { languageTag } from "$lib/paraglide/runtime";
  import { slide } from "svelte/transition";
  import { Button } from "$lib/components/ui/button";

  let expandedSection: string | null = $state(null);

  function toggleSection(section: string) {
    expandedSection = expandedSection === section ? null : section;
  }

  // Scroll to section
  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // ToC sections for TableOfContents component
  const tocSections = [
    { id: "osnovno", title: m.for_artists_basic_info() },
    { id: "arrival", title: m.for_artists_arrival_title() },
    { id: "access", title: m.for_artists_access_title() },
    { id: "pre-event", title: m.for_artists_pre_event_title() },
    { id: "soundcheck", title: m.for_artists_soundcheck_title() },
    { id: "marketing", title: m.for_artists_marketing_title() },
    { id: "during-after", title: m.for_artists_during_after_title() },
  ];

  // SEO Configuration with noindex
  const seo_config = createSEOConfig({
    title: m.for_artists_title(),
    description: m.for_artists_meta_description(),
    url: "/for-artists",
    type: "website",
    locale: languageTag(),
  });
</script>

<Head {seo_config} />

<!-- Table of Contents -->
<TableOfContents sections={tocSections} />

<main class="flex flex-col md:gap-8 gap-4 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-left bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/club.png');"
  >
    <h1
      class="w-full text-prototype-orange-500 text-3xl lg:text-6xl font-bold font-calluna-sans-semibold text-center uppercase"
    >
      <span class="text-pitch-black-100">Za</span>
      Nastopajoče
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      {m.for_artists_hero_subtitle()}
    </p>
  </section>

  <!-- Basic Info -->
  <section id="osnovno" class="w-full px-4 md:px-12 scroll-mt-24">
    <div class="mx-auto max-w-7xl md:space-y-12 space-y-6">
      <h2
        class="text-2xl md:text-3xl font-calluna-sans-semibold text-pitch-black-100"
      >
        {m.for_artists_basic_info()}
        {m.nav_about_club()}
        <span class="text-prototype-orange-500">KGB</span>
      </h2>

      <div class="grid gap-4 md:gap-6 md:grid-cols-2">
        <div class="rounded-lg bg-white p-6 shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-full bg-pitch-black-100 p-2">
              <svg
                class="h-6 w-6 text-really-white-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-calluna-sans-bold text-pitch-black-100">
              {m.for_artists_hours()}
            </h3>
          </div>
          <div class="space-y-2">
            <p class="font-calluna-sans-light text-gray-700">
              {m.for_artists_hours_tue_thu()}
            </p>
            <p class="font-calluna-sans-light text-gray-700">
              {m.for_artists_hours_fri_sat()}
            </p>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-full bg-pitch-black-100 p-2">
              <svg
                class="h-6 w-6 text-really-white-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 class="font-calluna-sans-bold text-pitch-black-100">
              {m.for_artists_location()}
            </h3>
          </div>
          <div class="space-y-2">
            <p class="font-calluna-sans-light text-gray-700">
              {m.for_artists_location_address()}
            </p>
            <p class="text-sm font-calluna-sans-light text-gray-600">
              {m.for_artists_location_note()}
            </p>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-full bg-pitch-black-100 p-2">
              <svg
                class="h-6 w-6 text-really-white-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 class="font-calluna-sans-bold text-pitch-black-100">
              {m.for_artists_capacity()}
            </h3>
          </div>
          <div class="space-y-2">
            <p class="font-calluna-sans-light text-gray-700">
              {m.for_artists_capacity_seated()}
            </p>
            <p class="font-calluna-sans-light text-gray-700">
              {m.for_artists_capacity_full()}
            </p>
          </div>
        </div>

        <div class="rounded-lg bg-white p-6 shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <div class="rounded-full bg-pitch-black-100 p-2">
              <svg
                class="h-6 w-6 text-really-white-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 class="font-calluna-sans-bold text-pitch-black-100">
              {m.for_artists_surroundings()}
            </h3>
          </div>
          <p class="text-sm font-calluna-sans-light text-gray-700">
            {m.for_artists_surroundings_desc()}
          </p>
        </div>
      </div>

      <div
        class="rounded-lg bg-prototype-orange-500/20 border-l-4 border-prototype-orange-500 p-6"
      >
        <div class="flex items-start gap-3 relative">
          <svg
            class="size-4 md:size-6 flex-shrink-0 text-prototype-orange-500 absolute top-0 right-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div class="flex-1">
            <p class="font-calluna-sans-semibold text-pitch-black-200/90 mb-2">
              {m.for_artists_important()}
            </p>
            <ul
              class="list-disc space-y-2 pl-5 text-sm font-calluna-sans-light text-gray-700"
            >
              <li>{m.for_artists_warning_hallway()}</li>
              <li>{m.for_artists_warning_signal()}</li>
              <li>{m.for_artists_warning_wifi()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Accordion Sections -->
  <section class="w-full px-4 md:px-12">
    <div class="mx-auto max-w-7xl flex flex-col md:gap-4 gap-8">
      <div class="flex flex-col gap-4">
        <!-- 1. Prihod in logistika -->
        <div id="arrival" class="overflow-hidden rounded-lg shadow-card">
          <button
            onclick={() => toggleSection("arrival")}
            class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pitch-black-100"
              >
                <span
                  class="text-lg font-calluna-sans-bold text-really-white-100"
                  >1</span
                >
              </div>
              <h3 class="font-calluna-sans-ligth text-pitch-black-100 pr-4">
                {m.for_artists_arrival_title()}
              </h3>
            </div>
            <svg
              class="h-6 w-6 transform text-gray-400 transition-transform duration-200 {expandedSection ===
              'arrival'
                ? 'rotate-180'
                : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if expandedSection === "arrival"}
            <div
              in:slide
              out:slide
              class="border-t border-gray-200 bg-gray-50 p-6"
            >
              <div
                class="prose prose-sm max-w-none font-calluna-sans-light text-gray-700 leading-relaxed
								prose-p:leading-relaxed
								prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-ul:space-y-2
								prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4 prose-ol:space-y-2
								prose-li:ml-0 prose-li:pl-1
								prose-strong:font-calluna-sans-semibold prose-strong:text-pitch-black-100
								prose-headings:font-calluna-sans-bold prose-headings:text-pitch-black-100 prose-headings:mb-3"
              >
                <div class="space-y-6">
                  <div>
                    <h4
                      class="text-lg font-calluna-sans-semibold text-pitch-black-100"
                    >
                      {m.for_artists_arrival_time()}
                    </h4>
                    <p>{m.for_artists_arrival_time_desc()}</p>
                  </div>

                  <div>
                    <h4
                      class="text-lg font-calluna-sans-semibold text-pitch-black-100"
                    >
                      {m.for_artists_pedestrian_zone()}
                    </h4>
                    <p class="mb-2">{m.for_artists_pedestrian_zone_desc()}</p>
                    <ul class="list-disc space-y-2 pl-5">
                      <li>{m.for_artists_pedestrian_contact()}</li>
                      <li>{m.for_artists_pedestrian_permit()}</li>
                      <li>{m.for_artists_pedestrian_time()}</li>
                    </ul>
                  </div>

                  <div>
                    <h4
                      class="text-lg font-calluna-sans-semibold text-pitch-black-100"
                    >
                      {m.for_artists_unloading()}
                    </h4>
                    <p>{m.for_artists_unloading_desc()}</p>
                  </div>

                  <div>
                    <h4
                      class="text-lg font-calluna-sans-semibold text-pitch-black-100"
                    >
                      {m.for_artists_parking()}
                    </h4>
                    <p>{m.for_artists_parking_desc()}</p>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- 2. Dostop -->
        <div id="access" class="overflow-hidden rounded-lg shadow-card">
          <button
            onclick={() => toggleSection("access")}
            class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pitch-black-100"
              >
                <span
                  class="text-lg font-calluna-sans-bold text-really-white-100"
                  >2</span
                >
              </div>
              <h3 class="font-calluna-sans-ligth text-pitch-black-100 pr-4">
                {m.for_artists_access_title()}
              </h3>
            </div>
            <svg
              class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection ===
              'access'
                ? 'rotate-180'
                : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if expandedSection === "access"}
            <div
              in:slide
              out:slide
              class="border-t border-gray-200 bg-gray-50 p-6"
            >
              <div class="space-y-6 font-calluna-sans-light text-gray-700">
                <div>
                  <h4
                    class="mb-3 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_access_locations()}
                  </h4>
                  <ul class="list-disc space-y-2 pl-5">
                    <li>
                      <a
                        href="https://maps.app.goo.gl/QvCVt7WXQdMsJfa48"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-mean-green-500 underline hover:text-mean-green-400"
                        >{m.for_artists_access_koroska()}</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://maps.app.goo.gl/hhHU44g3XMnuaWY36"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-mean-green-500 underline hover:text-mean-green-400"
                        >{m.for_artists_access_lent()}</a
                      >
                    </li>
                  </ul>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_route_koroska()}
                  </h4>
                  <ol class="list-decimal space-y-1 pl-5 text-sm">
                    <li>{m.for_artists_route_koroska_1()}</li>
                    <li>{m.for_artists_route_koroska_2()}</li>
                    <li>{m.for_artists_route_koroska_3()}</li>
                    <li>{m.for_artists_route_koroska_4()}</li>
                  </ol>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_route_lent()}
                  </h4>
                  <ol class="list-decimal space-y-1 pl-5 text-sm">
                    <li>{m.for_artists_route_lent_1()}</li>
                    <li>{m.for_artists_route_lent_2()}</li>
                    <li>{m.for_artists_route_lent_3()}</li>
                    <li>{m.for_artists_route_lent_4()}</li>
                    <li>{m.for_artists_route_lent_5()}</li>
                  </ol>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- 3. Pred dogodkom -->
        <div id="pre-event" class="overflow-hidden rounded-lg shadow-card">
          <button
            onclick={() => toggleSection("before")}
            class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pitch-black-100"
              >
                <span
                  class="text-lg font-calluna-sans-bold text-really-white-100"
                  >3</span
                >
              </div>
              <h3 class="font-calluna-sans-ligth text-pitch-black-100 pr-4">
                {m.for_artists_pre_event_title()}
              </h3>
            </div>
            <svg
              class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection ===
              'before'
                ? 'rotate-180'
                : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if expandedSection === "before"}
            <div
              in:slide
              out:slide
              class="border-t border-gray-200 bg-gray-50 p-6"
            >
              <div class="space-y-6 font-calluna-sans-light text-gray-700">
                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_guestlist()}
                  </h4>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_guestlist_name()}</li>
                    <li>{m.for_artists_guestlist_specify()}</li>
                    <li>{m.for_artists_guestlist_deadline()}</li>
                  </ul>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_drinks()}
                  </h4>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_drinks_performers()}</li>
                    <li>{m.for_artists_drinks_companions()}</li>
                    <li>{m.for_artists_drinks_list()}</li>
                    <li>{m.for_artists_drinks_order()}</li>
                  </ul>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_ticket_sales()}
                  </h4>
                  <p>{m.for_artists_ticket_sales_desc()}</p>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_reservations()}
                  </h4>
                  <p class="mb-2">{m.for_artists_reservations_desc()}</p>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_reservations_email()}</li>
                    <li>{m.for_artists_reservations_deadline()}</li>
                    <li>{m.for_artists_reservations_note()}</li>
                  </ul>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- 4. Tonska vaja -->
        <div id="soundcheck" class="overflow-hidden rounded-lg shadow-card">
          <button
            onclick={() => toggleSection("soundcheck")}
            class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pitch-black-100"
              >
                <span
                  class="text-lg font-calluna-sans-bold text-really-white-100"
                  >4</span
                >
              </div>
              <h3 class="font-calluna-sans-ligth text-pitch-black-100 pr-4">
                {m.for_artists_soundcheck_title()}
              </h3>
            </div>
            <svg
              class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection ===
              'soundcheck'
                ? 'rotate-180'
                : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if expandedSection === "soundcheck"}
            <div
              in:slide
              out:slide
              class="border-t border-gray-200 bg-gray-50 p-6"
            >
              <div class="space-y-6 font-calluna-sans-light text-gray-700">
                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_timeline()}
                  </h4>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_timeline_soundcheck()}</li>
                    <li>{m.for_artists_timeline_doors()}</li>
                    <li>{m.for_artists_timeline_start()}</li>
                  </ul>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_tickets()}
                  </h4>
                  <p class="mb-2">{m.for_artists_tickets_desc()}</p>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_tickets_validation()}</li>
                    <li>{m.for_artists_tickets_sales()}</li>
                    <li>{m.for_artists_tickets_duration()}</li>
                  </ul>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_backstage()}
                  </h4>
                  <p class="mb-2">{m.for_artists_backstage_desc()}</p>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_backstage_storage()}</li>
                    <li>{m.for_artists_backstage_changing()}</li>
                  </ul>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- 5. Marketing -->
        <div id="marketing" class="overflow-hidden rounded-lg shadow-card">
          <button
            onclick={() => toggleSection("marketing")}
            class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pitch-black-100"
              >
                <span
                  class="text-lg font-calluna-sans-bold text-really-white-100"
                  >5</span
                >
              </div>
              <h3 class="font-calluna-sans-ligth text-pitch-black-100 pr-4">
                {m.for_artists_marketing_title()}
              </h3>
            </div>
            <svg
              class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection ===
              'marketing'
                ? 'rotate-180'
                : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if expandedSection === "marketing"}
            <div
              in:slide
              out:slide
              class="border-t border-gray-200 bg-gray-50 p-6"
            >
              <div class="space-y-6 font-calluna-sans-light text-gray-700">
                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_marketing_website()}
                  </h4>
                  <p>{m.for_artists_marketing_website_desc()}</p>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_marketing_photos()}
                  </h4>
                  <p class="mb-2">{m.for_artists_marketing_photos_desc()}</p>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_marketing_photos_landscape()}</li>
                    <li>{m.for_artists_marketing_photos_portrait()}</li>
                  </ul>
                  <p class="mt-2 text-sm italic">
                    {m.for_artists_marketing_photos_note()}
                  </p>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- 6. Med in po dogodku -->
        <div id="during-after" class="overflow-hidden rounded-lg shadow-card">
          <button
            onclick={() => toggleSection("during")}
            class="flex w-full items-center cursor-pointer justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100/70"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pitch-black-100"
              >
                <span
                  class="text-lg font-calluna-sans-bold text-really-white-100"
                  >6</span
                >
              </div>
              <h3 class="font-calluna-sans-ligth text-pitch-black-100 pr-4">
                {m.for_artists_during_after_title()}
              </h3>
            </div>
            <svg
              class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection ===
              'during'
                ? 'rotate-180'
                : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {#if expandedSection === "during"}
            <div
              in:slide
              out:slide
              class="border-t border-gray-200 bg-gray-50 p-6"
            >
              <div class="space-y-6 font-calluna-sans-light text-gray-700">
                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_service()}
                  </h4>
                  <p>{m.for_artists_service_desc()}</p>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_shared_space()}
                  </h4>
                  <p>{m.for_artists_shared_space_desc()}</p>
                </div>

                <div>
                  <h4
                    class="mb-2 font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {m.for_artists_noise()}
                  </h4>
                  <p class="mb-2">{m.for_artists_noise_desc()}</p>
                  <ul class="list-disc space-y-1 pl-5">
                    <li>{m.for_artists_noise_service()}</li>
                    <li>{m.for_artists_noise_space()}</li>
                  </ul>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="w-full px-4 md:px-12">
    <div class="mx-auto max-w-7xl">
      <div class="rounded-lg bg-white p-8 shadow-card">
        <h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
          {m.for_artists_questions_title()}
        </h2>
        <p class="mt-4 font-calluna-sans-light text-gray-700">
          {m.for_artists_questions_desc()}
        </p>
        <div class="mt-6">
          <div
            class="flex flex-wrap items-center gap-6 font-calluna-sans-light text-pitch-black-100"
          >
            <div class="flex items-center gap-2">
              <svg
                class="h-5 w-5 text-pitch-black-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <span class="font-calluna-sans-semibold">Booking:</span>
              <a
                href="mailto:booking@klub-kgb.si"
                class="text-brick-red-200 hover:underline"
              >
                booking@klub-kgb.si
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
