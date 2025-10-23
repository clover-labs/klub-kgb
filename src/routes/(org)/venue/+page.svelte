<script lang="ts">
  import TableOfContents from "$lib/components/TableOfContents.svelte";
  import { Head, SchemaOrg } from "svead";
  import { createSEOConfig, siteConfig } from "$lib/seo";
  import { languageTag } from "$lib/paraglide/runtime";
  import { buttonVariants } from "$lib/components/ui/button";
  import { slide } from "svelte/transition";

  // Equipment categories with expandable state
  let expandedCategory: string | null = $state(null);

  function toggleCategory(category: string) {
    expandedCategory = expandedCategory === category ? null : category;
  }

  // Equipment data
  const equipment = {
    sound: [
      { name: "Mešalna miza", spec: "Midas Pro 24 kanalov" },
      { name: "Ojačevalec", spec: "Amplituda A2500" },
      { name: "Monitorji", spec: "KRK Rokit 8 S" },
      { name: "Mikrofoni", spec: "Shure SM57 (6x)" },
      { name: "DI škatle", spec: "4x aktivne" },
    ],
    backline: [
      { name: "Bobni", spec: "Pearl Export, komplet z činelami" },
      { name: "Bass combo", spec: "Fender Rumble 500W" },
      { name: "Kitarski combo", spec: "Marshall JCM 800 100W" },
      { name: "Stojala za mikrofone", spec: "8x različnih tipov" },
    ],
    lighting: [
      { name: "LED reflektorji", spec: "Philips Viva (12x)" },
      { name: "Moving heads", spec: "4x RGBW" },
      { name: "Dimmer pack", spec: "12 kanalov" },
      { name: "Svetlobna miza", spec: "DMX kontroler" },
    ],
    other: [
      { name: "Video projektor", spec: "Full HD, 3000 lumenov" },
      { name: "Projektno platno", spec: "3m x 2m" },
      { name: "WiFi", spec: "Brezžični internet za izvajalce" },
      { name: "Garderoba", spec: "Zaklenjen prostor za osebne stvari" },
    ],
  };

  const categoryInfo = {
    sound: {
      title: "Zvočna oprema",
      icon: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z",
      color: "brick-red",
    },
    backline: {
      title: "Backline",
      icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
      color: "prototype-orange",
    },
    lighting: {
      title: "Razsvetljava",
      icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
      color: "mean-green",
    },
    other: {
      title: "Ostala oprema",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      color: "pitch-black",
    },
  };

  // ToC sections for TableOfContents component
  const tocSections = [
    { id: "capacity", title: "Kapaciteta", color: "mean-green" },
    { id: "equipment", title: "Tehnična oprema", color: "brick-red" },
    { id: "specs", title: "Tehnične specifikacije", color: "prototype-orange" },
    { id: "floorplan", title: "Tloris prostora", color: "mean-green" },
    { id: "history", title: "Zgodovina", color: "brick-red" },
  ];

  // SEO Configuration
  const seo_config = createSEOConfig({
    title: "Prostor - Klub KGB Maribor",
    description:
      "Tehnične specifikacije, oprema in informacije o prostoru Kluba KGB Maribor. Kapaciteta 80 oseb, profesionalna zvočna in svetlobna oprema.",
    url: "/venue",
    locale: languageTag(),
  });

  // LocalBusiness Schema for venue
  const venueSchema = {
    "@type": "MusicVenue",
    name: "Klub KGB Maribor",
    description:
      "Klub KGB je intimni prostor v srcu Maribora, zasnovan za koncerte, stand-up komedije in različne kulturne dogodke.",
    url: siteConfig.url,
    telephone: "+386-2-123-4567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vojašniški trg 5",
      addressLocality: "Maribor",
      postalCode: "2000",
      addressCountry: "SI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.5547,
      longitude: 15.6467,
    },
    maximumAttendeeCapacity: 80,
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Sound System",
        value: "Professional PA system with Midas Pro console",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Lighting",
        value: "LED lights and moving heads with DMX control",
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Accessibility",
        value: "Wheelchair accessible, no stairs",
      },
    ],
  };
</script>

<Head {seo_config} />
<SchemaOrg schema={venueSchema} />

<!-- Table of Contents -->
<TableOfContents sections={tocSections} />

<main class="flex flex-col md:gap-8 gap-12 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-left bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/club.png');"
  >
    <h1
      class="w-full text-prototype-orange-500 text-3xl lg:text-6xl font-bold font-calluna-sans-semibold text-center uppercase"
    >
      <span class="text-pitch-black-100">Vse o</span>
      Prostoru
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Tehnične specifikacije in oprema Kluba KGB Maribor
    </p>
  </section>

  <!-- Venue Overview -->
  <section id="capacity" class="w-full px-4 md:px-12 scroll-mt-24">
    <div class="mx-auto max-w-7xl flex flex-col gap-8">
      <div class="mb-12 max-w-5xl flex flex-col gap-2">
        <h2
          class="text-2xl md:text-2xl font-calluna-sans-semibold text-pitch-black-100"
        >
          O prostoru
        </h2>
        <p
          class="font-calluna-sans-light text-gray-700 leading-relaxed text-lg"
        >
          Klub KGB je intimni prostor v srcu Maribora, zasnovan za koncerte,
          stand-up komedije in različne kulturne dogodke. Prostor nudi
          profesionalno zvočno in svetlobno opremo ter prijetno atmosfero za do
          80 obiskovalcev.
        </p>
      </div>

      <!-- Capacity Cards -->
      <div class="mb-12 grid gap-4 md:gap-6 md:grid-cols-3">
        <!-- Total Capacity -->
        <div
          class="relative flex flex-col items-center justify-center gap-2 rounded-full py-18 md:py-24 bg-cover bg-left"
          style="background-image: url('/heroes/default.png')"
        >
          <div
            class="absolute top-0 left-0 w-full h-full z-10 liquid-glass rounded-full backdrop-blur-lg"
          ></div>
          <div
            class="relative z-20 flex flex-col items-center justify-center gap-2"
          >
            <div class="rounded-full bg-pitch-black-100 p-3 z-20">
              <svg
                class="h-8 w-8 text-white"
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
            <h3 class="text-lg font-calluna-sans-semibold text-pitch-black-100">
              Skupaj
            </h3>
            <p class="text-6xl font-calluna-sans-semibold text-pitch-black-100">
              80
            </p>
            <p class="mt-2 font-calluna-sans-light text-gray-600">
              Maksimalna zmogljivost
            </p>
          </div>
        </div>

        <!-- Seated Capacity -->
        <div
          class="relative flex flex-col items-center justify-center gap-2 rounded-full py-18 md:py-24 bg-cover bg-left"
          style="background-image: url('/heroes/club.png')"
        >
          <div
            class="absolute top-0 left-0 w-full h-full z-10 liquid-glass rounded-full backdrop-blur-lg"
          ></div>
          <div
            class="relative z-20 flex flex-col items-center justify-center gap-2"
          >
            <div class="rounded-full bg-pitch-black-100 p-3">
              <svg
                class="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-calluna-sans-semibold text-pitch-black-100">
              Sedeče
            </h3>
            <p class="text-6xl font-calluna-sans-semibold text-pitch-black-100">
              75
            </p>
            <p class="mt-2 font-calluna-sans-light text-gray-600">
              Bar postavitev + dodatna sedišča
            </p>
          </div>
        </div>

        <!-- Standing Capacity -->
        <div
          class="relative flex flex-col items-center justify-center gap-2 rounded-full py-18 md:py-24 bg-cover bg-left"
          style="background-image: url('/heroes/events.png')"
        >
          <div
            class="absolute top-0 left-0 w-full h-full z-10 liquid-glass rounded-full backdrop-blur-lg"
          ></div>
          <div
            class="relative z-20 flex flex-col items-center justify-center gap-2"
          >
            <div class="rounded-full bg-pitch-black-100 p-3">
              <svg
                class="h-8 w-8 text-white"
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
            </div>
            <h3 class="text-lg font-calluna-sans-semibold text-pitch-black-100">
              Stoječe
            </h3>
            <p class="text-6xl font-calluna-sans-semibold text-pitch-black-100">
              80
            </p>
            <p class="mt-2 font-calluna-sans-light text-gray-600">
              Koncertna postavitev
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Equipment Section -->
  <section id="equipment" class="w-full px-4 md:px-12 scroll-mt-24">
    <div class="mx-auto max-w-7xl flex flex-col md:gap-6 gap-4">
      <h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100">
        Tehnična oprema
      </h2>

      <div class="grid gap-6 lg:grid-cols-2">
        {#each Object.entries(equipment) as [key, items]}
          {@const info = categoryInfo[key as keyof typeof categoryInfo]}
          <div class="overflow-hidden rounded-lg shadow-card h-fit">
            <button
              onclick={() => toggleCategory(key)}
              class="flex w-full items-center justify-between p-6 text-left transition-colors duration-300 hover:bg-off-white-100"
            >
              <div class="flex items-center gap-4">
                <div class="rounded-full bg-pitch-black-100 p-3">
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d={info.icon}
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    class="text-xl font-calluna-sans-semibold text-pitch-black-100"
                  >
                    {info.title}
                  </h3>
                  <p class="text-sm font-calluna-sans-light text-gray-600">
                    {items.length}
                    {items.length === 1
                      ? "artikel"
                      : items.length === 2
                        ? "artikla"
                        : items.length === 3 || items.length === 4
                          ? "artikli"
                          : "artiklov"}
                  </p>
                </div>
              </div>
              <svg
                class="h-6 w-6 transform text-gray-400 transition-transform {expandedCategory ===
                key
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

            {#if expandedCategory === key}
              <div
                class="border-t border-gray-200 bg-gray-50 p-6"
                in:slide={{ duration: 300 }}
                out:slide={{ duration: 300 }}
              >
                <div class="space-y-4">
                  {#each items as item}
                    <div
                      class="flex items-center gap-3 rounded-lg bg-white p-4"
                    >
                      <svg
                        class="mt-1 h-5 w-5 flex-shrink-0 text-pitch-black-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div class="flex-1">
                        <h4
                          class="font-calluna-sans-semibold text-pitch-black-100"
                        >
                          {item.name}
                        </h4>
                        <p
                          class="text-sm font-calluna-sans-light text-gray-600"
                        >
                          {item.spec}
                        </p>
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <div class="mt-8 rounded-lg bg-mean-green-500/10 p-6 relative">
        <div class="flex items-start gap-3">
          <svg
            class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500 absolute md:top-2 md:right-4 top-1 right-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="font-calluna-sans-light text-gray-700">
            Za dodatne tehnične zahteve ali specifično opremo nas kontaktirajte
            vnaprej. Naša tehnična ekipa vam bo z veseljem pomagala.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Technical Specifications -->
  <section id="specs" class="w-full px-4 md:px-12 scroll-mt-24">
    <div class="mx-auto max-w-7xl flex flex-col md:gap-6 gap-4">
      <h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100">
        Tehnične specifikacije
      </h2>

      <div class="grid md:gap-6 gap-12 md:grid-cols-2">
        <!-- Stage -->
        <div class="md:rounded-lg md:p-6 md:shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <svg
              class="h-8 w-8 text-pitch-black-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
            <h3
              class="text-xl font-calluna-sans-semibold text-pitch-black-100/80"
            >
              Oder
            </h3>
          </div>
          <div
            class="space-y-2 font-calluna-sans-light text-pitch-black-100/80"
          >
            <p>
              <span class="font-calluna-sans-semibold">Dimenzije:</span> Podatki
              bodo kmalu dodani
            </p>
            <p>
              <span class="font-calluna-sans-semibold">Višina:</span> Podatki bodo
              kmalu dodani
            </p>
            <p>
              <span class="font-calluna-sans-semibold">Dostop:</span> Enakovredna
              višina s talno površino
            </p>
          </div>
        </div>

        <!-- Power & Infrastructure -->
        <div class="md:rounded-lg md:p-6 md:shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <svg
              class="h-8 w-8 text-pitch-black-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <h3
              class="text-xl font-calluna-sans-semibold text-pitch-black-100/80"
            >
              Elektrika in infrastruktura
            </h3>
          </div>
          <div
            class="space-y-2 font-calluna-sans-light text-pitch-black-100/80"
          >
            <p>
              <span class="font-calluna-sans-semibold">Napajanje:</span> 230V, 16A
              vtičnice na odru
            </p>
            <p>
              <span class="font-calluna-sans-semibold">WiFi:</span> Brezžični internet
              za izvajalce
            </p>
            <p>
              <span class="font-calluna-sans-semibold">Klimatizacija:</span> Da
            </p>
          </div>
        </div>

        <!-- Layout -->
        <div class="md:rounded-lg md:p-6 md:shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <svg
              class="h-8 w-8 text-pitch-black-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
            <h3
              class="text-xl font-calluna-sans-semibold text-pitch-black-100/80"
            >
              Postavitev prostora
            </h3>
          </div>
          <div
            class="space-y-2 font-calluna-sans-light text-pitch-black-100/80"
          >
            <p>
              <span class="font-calluna-sans-semibold">Konfiguracija:</span> Fleksibilna
            </p>
            <p>
              <span class="font-calluna-sans-semibold">Bar:</span> Na voljo, z dodatnimi
              sedeži
            </p>
            <p>
              <span class="font-calluna-sans-semibold">Garderoba:</span> Zaklenjen
              prostor za izvajalce
            </p>
          </div>
        </div>

        <!-- Accessibility -->
        <div class="md:rounded-lg md:p-6 md:shadow-card">
          <div class="mb-4 flex items-center gap-3">
            <svg
              class="h-8 w-8 text-pitch-black-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <h3
              class="text-xl font-calluna-sans-semibold text-pitch-black-100/80"
            >
              Dostopnost
            </h3>
          </div>
          <div
            class="space-y-2 font-calluna-sans-light text-pitch-black-100/80"
          >
            <p>
              <span class="font-calluna-sans-semibold">Invalidski dostop:</span>
              Da, brez stopnic
            </p>
            <p>
              <span class="font-calluna-sans-semibold">WC:</span> Dostopen za invalide
            </p>
            <p>
              <span class="font-calluna-sans-semibold">Parkirišče:</span> Javno parkirišče
              v bližini
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Floor Plan Placeholder -->
  <section id="floorplan" class="w-full px-4 md:px-12 scroll-mt-24">
    <div class="mx-auto max-w-7xl flex flex-col md:gap-6 gap-8">
      <h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100">
        Tloris prostora
      </h2>
      <div
        class="flex items-center justify-center md:rounded-lg md:p-12 md:shadow-card"
      >
        <div class="text-center">
          <svg
            class="mx-auto mb-4 h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 class="text-xl font-calluna-sans-semibold text-gray-700">
            Tloris bo kmalu na voljo
          </h3>
          <p class="mt-2 font-calluna-sans-light text-gray-600">
            Za vprašanja o postavitvi prostora nas kontaktirajte direktno
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Venue History -->
  <section id="history" class="w-full px-4 md:px-0 scroll-mt-24">
    <div class="mx-auto max-w-7xl flex flex-col md:gap-6 gap-4">
      <h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100">
        Zgodovina prostora
      </h2>
      <div class="md:rounded-lg md:p-8 md:shadow-card">
        <p class="mb-4 font-calluna-sans-light text-gray-700 leading-relaxed">
          Klub KGB (Kulturno-glasbeni brlog) deluje od leta 1998 in je postal
          eden ključnih prostorov za alternativno in neodvisno glasbo v
          Mariboru. Skozi leta smo gostili številne lokalne in mednarodne
          umetnike ter postali pomembna točka na glasbeni karti Slovenije.
        </p>
        <p class="font-calluna-sans-light text-gray-700 leading-relaxed">
          Prostor smo skozi leta nenehno posodabljali in izboljševali tehnično
          opremo, da lahko ponudimo najboljše možne pogoje tako za nastopajoče
          kot za obiskovalce. Naš cilj je ostati prostor, kjer se lahko razvija
          in predstavlja kakovostna, nekomercializirana glasba.
        </p>
      </div>
    </div>
  </section>

  <!-- Contact CTA -->
  <section class="w-full pb-12">
    <div class="mx-auto max-w-7xl">
      <div
        class="md:rounded-lg bg-mean-green-500 shadow-card md:p-8 p-4 py-6 text-pitch-black-100"
      >
        <h2 class="mb-4 text-2xl font-calluna-sans-semibold">
          Potrebujete več informacij?
        </h2>
        <p class="mb-6 text-lg font-calluna-sans-light">
          Za podrobnejše tehnične specifikacije, technical rider ali vprašanja o
          prostoru nas kontaktirajte.
        </p>
        <div class="flex flex-col gap-4 sm:flex-row">
          <a
            href="mailto:info@klub-kgb.si"
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Kontaktirajte nas
          </a>
          <a
            href="/venue-rental"
            class={buttonVariants({ variant: "outline" })}
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
            Najem prostora
          </a>
        </div>
      </div>
    </div>
  </section>
</main>
