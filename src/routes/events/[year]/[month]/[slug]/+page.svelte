<script lang="ts">
  import type { PageData } from "./$types";
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import EventCard from "$lib/components/EventCard.svelte";
  import { isPastEvent, getDaysUntilEvent } from "$lib/utils/slug";
  import ReservationModal from "$lib/components/ReservationModal.svelte";
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import { Head, SchemaOrg } from "svead";
  import { createSEOConfig, siteConfig } from "$lib/seo";
  import { languageTag } from "$lib/paraglide/runtime";
  import * as m from "$lib/paraglide/messages";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
  import { flip } from "svelte/animate";
  import EventCarousel from "$lib/components/EventCarousel.svelte";

  let { data }: { data: PageData } = $props();

  // Track navigation history
  let previousPath = $state<string | null>(null);

  // Make data reactive with $derived
  const event = $derived(data.event);
  const relatedEvents = $derived(data.relatedEvents);
  const isEventPast = $derived(data.isEventPast);
  const daysUntil = $derived(getDaysUntilEvent(event.event_date));

  // SEO Configuration
  const eventUrl = $derived(page.url.pathname);
  const eventImageUrl = $derived(
    event.image ? getImageUrl(event.image) : undefined
  );

  const seo_config = $derived(
    createSEOConfig({
      title: `${event.title} - Klub KGB Maribor`,
      description: event.description,
      url: eventUrl,
      image: eventImageUrl,
      type: "article",
      locale: languageTag(),
    })
  );

  // Event Schema for structured data
  const eventSchema = $derived({
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.event_date,
    endDate: new Date(
      new Date(event.event_date).getTime() + 3 * 60 * 60 * 1000
    ).toISOString(),
    eventStatus: isEventPast ? "EventScheduled" : "EventScheduled",
    eventAttendanceMode: "OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Klub KGB Maribor",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Vojašniški trg 5",
        addressLocality: "Maribor",
        postalCode: "2000",
        addressCountry: "SI",
      },
    },
    image: eventImageUrl ? [eventImageUrl] : undefined,
    organizer: {
      "@type": "Organization",
      name: "Klub KGB Maribor",
      url: siteConfig.url,
    },
    ...(event.link &&
      event.ticket_status !== "sold_out" &&
      event.ticket_status !== "free_entry" && {
        offers: {
          "@type": "Offer",
          url: event.link,
          availability:
            event.ticket_status === "coming_soon" ? "PreOrder" : "InStock",
        },
      }),
    ...(event.ticket_status === "free_entry" && {
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "InStock",
      },
    }),
  });

  // Scroll to top after navigation
  afterNavigate(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  // Calendar dropdown state
  let isCalendarDropdownOpen = $state(false);

  function toggleCalendarDropdown() {
    isCalendarDropdownOpen = !isCalendarDropdownOpen;
  }

  function closeCalendarDropdown() {
    isCalendarDropdownOpen = false;
  }

  function formatDate(dateString: string): string {
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

  function getFallbackImage(): string {
    return "/placeholder-image-large.svg";
  }

  function goBack() {
    // If we have a stored previous path, use it
    if (previousPath) {
      goto(previousPath);
    }
    // Otherwise, try to determine where to go based on event type
    else if (isEventPast) {
      goto("/events/archive");
    } else {
      goto("/events/upcoming");
    }
  }

  function shareEvent() {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    }
  }

  // Language name mapping (English -> Slovenian)
  const languageNames: Record<string, string> = {
    English: "Angleščina",
    Russian: "Ruščina",
    German: "Nemščina",
    Italian: "Italijanščina",
    Croatian: "Hrvaščina",
    Serbian: "Srbščina",
    Spanish: "Španščina",
    French: "Francoščina",
    Portuguese: "Portugalščina",
    Dutch: "Nizozemščina",
    Polish: "Poljščina",
    Czech: "Češčina",
    Slovak: "Slovaščina",
    Hungarian: "Madžarščina",
    Romanian: "Romunščina",
    Bulgarian: "Bolgarščina",
    Greek: "Grščina",
    Turkish: "Turščina",
    Arabic: "Arabščina",
    Chinese: "Kitajščina",
    Japanese: "Japonščina",
    Korean: "Korejščina",
  };

  // Get Slovenian language name
  const getLanguageName = (lang: string): string => {
    return languageNames[lang] || lang;
  };

  // Calendar helper functions
  function formatICSDate(date: Date): string {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  function formatGoogleDate(date: Date): string {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  function addToGoogleCalendar() {
    const eventDate = new Date(event.event_date);
    const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

    const calendarTitle = `KGB: ${event.title}`;
    const calendarDescription = [
      `Klub KGB: ${event.title}`,
      "",
      event.description || "",
      "",
      event.link ? `Karte na voljo: ${event.link}` : "",
      `Več informacij na voljo: https://klub-kgb.si${typeof window !== "undefined" ? window.location.pathname : ""}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: calendarTitle,
      details: calendarDescription,
      location: "Klub KGB Maribor, Vojašniški trg 5, 2000 Maribor",
      dates: `${formatGoogleDate(eventDate)}/${formatGoogleDate(endDate)}`,
    });

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      "_blank"
    );
    closeCalendarDropdown();
  }

  function addToOutlookCalendar() {
    const eventDate = new Date(event.event_date);
    const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

    const calendarTitle = `KGB: ${event.title}`;
    const calendarDescription = [
      `Klub KGB: ${event.title}`,
      "",
      event.description || "",
      "",
      event.link ? `Karte na voljo: ${event.link}` : "",
      `Več informacij na voljo: https://klub-kgb.si${typeof window !== "undefined" ? window.location.pathname : ""}`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: calendarTitle,
      body: calendarDescription,
      location: "Klub KGB Maribor, Vojašniški trg 5, 2000 Maribor",
      startdt: eventDate.toISOString(),
      enddt: endDate.toISOString(),
    });

    window.open(
      `https://outlook.live.com/calendar/0/action/compose?${params.toString()}`,
      "_blank"
    );
    closeCalendarDropdown();
  }

  function downloadICS() {
    const eventDate = new Date(event.event_date);
    const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

    const calendarTitle = `KGB: ${event.title}`;
    const calendarDescription = [
      `Klub KGB: ${event.title}`,
      "",
      event.description || "",
      "",
      event.link ? `Karte na voljo: ${event.link}` : "",
      `Več informacij na voljo: https://klub-kgb.si${typeof window !== "undefined" ? window.location.pathname : ""}`,
    ]
      .filter((line) => line !== "")
      .join("\\n");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Klub KGB//Event//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatICSDate(eventDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${calendarTitle}`,
      `DESCRIPTION:${calendarDescription}`,
      `LOCATION:Klub KGB Maribor, Vojašniški trg 5, 2000 Maribor`,
      `URL:https://klub-kgb.si${typeof window !== "undefined" ? window.location.pathname : ""}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, "-")}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    closeCalendarDropdown();
  }
</script>

<Head {seo_config} />
<SchemaOrg schema={eventSchema} />

<main class="min-h-screen">
  <!-- Event Content -->
  <div class="mx-auto max-w-7xl md:py-8 md:py-12">
    <article class="overflow-hidden flex flex-col md:gap-4 gap-8">
      <div class="flex items-start md:flex-row flex-col">
        <!-- Hero Image -->
        {#if event.image}
          <div
            class="relative md:size-96 size-full overflow-hidden w-full md:w-2/3"
          >
            <img
              src={getImageUrl(event.image)}
              alt={event.title}
              class="h-full w-full object-cover rounded-lg"
              onerror={(e) => {
                const target = e.target;
                if (target && target instanceof HTMLImageElement) {
                  target.src = getFallbackImage();
                }
              }}
            />
            <!-- Status Badge -->
            <div class="absolute right-4 top-4 z-10">
              {#if isEventPast}
                <span
                  class={buttonVariants({
                    variant: "pitch-black",
                    size: "sm",
                    class: "cursor-default hover:bg-pitch-black-100",
                  })}
                >
                  Pretekli dogodek
                </span>
              {:else if daysUntil <= 7 && daysUntil > 0}
                <span
                  class={buttonVariants({
                    variant: "prototype-orange",
                    size: "sm",
                    class: "cursor-default hover:bg-prototype-orange-500",
                  })}
                >
                  Čez {daysUntil}
                  {daysUntil === 1 ? "dan" : daysUntil === 2 ? "dneva" : "dni"}
                </span>
              {:else if daysUntil === 0}
                <span
                  class={buttonVariants({
                    variant: "mean-green",
                    size: "sm",
                    class: "cursor-default hover:bg-mean-green-500",
                  })}
                >
                  Danes!
                </span>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Event Header -->
        <div class="md:p-12 w-full p-4 flex flex-col gap-4">
          <div class="flex flex-col items-start gap-1">
            <time
              class="block text-sm font-calluna-sans-semibold uppercase tracking-wide text-pitch-black-200/70"
            >
              {formatDate(event.event_date)}
            </time>

            <h1
              class="mb-4 text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl"
            >
              {event.title}
            </h1>
          </div>

          <!-- Language Notice Bar -->
          <!-- {#if event.event_language && event.event_language !== "Slovenščina"} -->
          <div
            class="mb-4 flex items-start gap-3 rounded-lg bg-prototype-orange-500/10 border-l-4 border-prototype-orange-500 p-4"
          >
            <svg
              class="h-5 w-5 flex-shrink-0 text-prototype-orange-500 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            <div class="flex-1">
              <p
                class="font-calluna-sans-semibold text-pitch-black-100 text-sm"
              >
                Ta dogodek bo izveden v naslednjem jeziku:
              </p>
              <p class="mt-1 font-calluna-sans-light text-gray-700 text-sm">
                {getLanguageName("English")}
              </p>
            </div>
          </div>
          <!-- {/if} -->

          <p
            class="md:text-xl text-lg text-center md:text-left text-calluna-sans-semibold md:font-calluna-sans-light text-pitch-black-200/80"
          >
            {event.description}aekjbeajkbgea
          </p>

          <!-- Desktop CTAs -->
          <div class="mt-6 gap-3 flex flex-wrap">
            {#if !isEventPast}
              <!-- Reservation Modal -->
              <ReservationModal eventTitle={event.title} />
            {/if}
            <!-- Ticket Button based on status -->
            {#if isEventPast}
              <Button disabled variant="pitch-black">
                <svg
                  class="h-5 w-5"
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
                {m.event_has_ended()}
              </Button>
            {:else if event.ticket_status === "coming_soon"}
              <Button disabled variant="pitch-black">
                <svg
                  class="h-5 w-5"
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
                Karte kmalu na voljo
              </Button>
            {:else if event.ticket_status === "sold_out"}
              <Button disabled variant="pitch-black">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Razprodano
              </Button>
            {:else if event.ticket_status === "free_entry"}
              <Button variant="mean-green">
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Vstop prost
              </Button>
            {:else if event.link}
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                class={buttonVariants({ variant: "pitch-black" })}
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                Kupi vstopnico
              </a>
            {/if}
            {#if !isEventPast}
              <Select.Root type="single">
                <Select.Trigger>
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Dodaj v koledar</span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="google">
                    <button onclick={addToGoogleCalendar}
                      >Google Calendar</button
                    ></Select.Item
                  >
                  <Select.Item value="outlook"
                    ><button onclick={addToOutlookCalendar}
                      >Outlook Calendar</button
                    ></Select.Item
                  >
                  <Select.Item value="ics"
                    ><button onclick={downloadICS}>ICS</button></Select.Item
                  >
                </Select.Content>
              </Select.Root>
            {/if}
            <Button onclick={shareEvent} variant="outline">
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Deli
            </Button>
          </div>
        </div>
      </div>

      <!-- Event Content -->
      {#if event.content}
        <div
          class="prose prose-lg max-w-none px-4 pb-4 font-calluna-sans-light md:p-12 text-center text-pitch-black-200"
        >
          {@html event.content}
        </div>
      {:else}
        <div class="p-4 md:p-12">
          <p
            class="font-calluna-sans-light text-pitch-black-200/60 text-center"
          >
            {#if isEventPast}
              Več informacij o tem dogodku bo kmalu na voljo.
            {:else}
              Več informacij o dogodku bo objavljenih kmalu. Za nakup vstopnic
              uporabite gumb zgoraj.
            {/if}
          </p>
        </div>
      {/if}

      <!-- Artist Description Section -->
      {#if event.artist_description}
        <div class="border-t border-gray-200 p-4 md:p-12">
          <h2 class="mb-4 text-2xl font-calluna-sans-bold text-pitch-black-100">
            O izvajalcu
          </h2>
          <div
            class="prose prose-lg max-w-none font-calluna-sans-light text-gray-700"
          >
            {@html event.artist_description}
          </div>
        </div>
      {/if}

      <!-- Performers Section -->
      {#if event.performers && event.performers.length > 0}
        <div
          class="md:border-t md:border-pitch-black-100/10 md:py-8 py-4 md:m-1 flex flex-col gap-4"
        >
          <h2
            class="px-4 xl:px-0 text-2xl font-calluna-sans-bold text-pitch-black-100"
          >
            Nastopajoči
          </h2>
          <div
            class="grid grid-cols-1 gap-0 md:gap-4 md:grid-cols-2 w-full bg-brick-red-200 md:bg-transparent md:px-4 xl:px-0"
          >
            {#each event.performers as performer}
              <div
                class="flex items-center gap-3 md:rounded-lg p-4 md:shadow-card bg-brick-red-200 md:bg-transparent w-full"
              >
                <svg
                  class="h-8 w-8 flex-shrink-0 text-pitch-black-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <div>
                  <p class="font-calluna-sans-semibold text-pitch-black-100">
                    {performer.performer_name}
                  </p>
                  {#if performer.performer_role}
                    <p
                      class="mt-1 text-sm font-calluna-sans-light text-pitch-black-200/80"
                    >
                      {performer.performer_role}
                    </p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </article>
  </div>
  <!-- Related Events Section - Outside max-w-7xl container -->
  {#if relatedEvents && relatedEvents.length > 0}
    <div class="w-full mt-12">
      <div
        class="flex items-center justify-between border-b border-slate-300 pb-3 w-full mx-auto max-w-7xl px-4 xl:px-0"
      >
        <h2
          class="md:text-2xl text-lg font-calluna-sans-bold text-pitch-black-100"
        >
          {isEventPast ? "Drugi pretekli" : "Drugi prihajajoči"}
          <span class="text-brick-red-500">dogodki</span>
        </h2>
        <a
          href={isEventPast ? "/events/archive" : "/events/upcoming"}
          class="text-pitch-black-100 md:text-lg text-sm font-calluna-sans-semibold group flex items-center"
        >
          Poglej vse
          <span
            class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
            >→</span
          >
        </a>
      </div>

      <div class="w-full mt-8">
        <EventCarousel events={relatedEvents} />
      </div>
    </div>
  {/if}
  <div class="mx-auto max-w-7xl md:py-8 md:py-12"></div>
  <!-- Newsletter Section -->
  <section
    id="newsletter"
    class="w-full bg-pitch-black-200 py-20 px-4 xl:px-0 mt-18 md:mt-12"
  >
    <h2
      class="text-really-white-100 text-3xl md:text-6xl font-calluna-sans-bold uppercase text-center"
    >
      {m.events_stay()}
      <span class="text-prototype-orange-500">{m.events_informed()}</span>
    </h2>
    <h5
      class="text-really-white-100 text-lg md:text-2xl font-calluna-sans-light text-center"
    >
      {m.events_newsletter_cta()}
    </h5>
    <div class="w-full max-w-7xl mx-auto flex flex-col items-center gap-4">
      <NewsletterForm class="mt-12 w-full" />
      <a
        href="/events/upcoming"
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

<!-- Floating Sticky CTA Bar (Mobile) -->
<!-- <div
  class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg md:hidden"
>
  <div class="flex gap-2">
    {#if !isEventPast}
      <ReservationModal eventTitle={event.title} />
    {/if}

    {#if isEventPast}
      <button
        disabled
        class="flex-1 rounded-lg bg-gray-400 px-4 py-3 text-center font-calluna-sans-semibold text-white cursor-not-allowed opacity-75"
      >
        {m.event_has_ended()}
      </button>
    {:else if event.ticket_status === "coming_soon"}
      <button
        disabled
        class="flex-1 rounded-lg bg-gray-400 px-4 py-3 text-center font-calluna-sans-semibold text-white cursor-not-allowed opacity-75"
      >
        Karte kmalu na voljo
      </button>
    {:else if event.ticket_status === "sold_out"}
      <button
        disabled
        class="flex-1 rounded-lg bg-gray-600 px-4 py-3 text-center font-calluna-sans-semibold text-white cursor-not-allowed"
      >
        Razprodano
      </button>
    {:else if event.ticket_status === "free_entry"}
      <div
        class="flex-1 rounded-lg bg-mean-green-500 px-4 py-3 text-center font-calluna-sans-semibold text-pitch-black-100"
      >
        Vstop prost
      </div>
    {:else if event.link}
      <a
        href={event.link}
        target="_blank"
        rel="noopener noreferrer"
        class={buttonVariants({ variant: "pitch-black", size: "sm" })}
      >
        Kupi vstopnico
      </a>
    {/if}
    <div class="relative">
      <button
        onclick={toggleCalendarDropdown}
        class="rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:border-mean-green-500"
        aria-label="Dodaj v koledar"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>

      {#if isCalendarDropdownOpen}
        <button
          onclick={closeCalendarDropdown}
          class="fixed inset-0 z-40"
          aria-label="Close calendar dropdown"
        ></button>

        <div
          class="absolute bottom-full right-0 z-50 mb-2 w-56 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5"
        >
          <div class="py-1">
            <button
              onclick={addToGoogleCalendar}
              class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
            >
              <svg
                class="h-5 w-5 text-mean-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Google Calendar</span>
            </button>

            <button
              onclick={addToOutlookCalendar}
              class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
            >
              <svg
                class="h-5 w-5 text-brick-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Outlook Calendar</span>
            </button>

            <button
              onclick={downloadICS}
              class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
            >
              <svg
                class="h-5 w-5 text-prototype-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span>Prenesi ICS</span>
            </button>
          </div>
        </div>
      {/if}
    </div>
    <button
      onclick={shareEvent}
      class="rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:border-prototype-orange-500"
      aria-label="Deli dogodek"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    </button>
  </div>
</div> -->
