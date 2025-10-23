<script lang="ts">
  import NewsletterForm from "$lib/components/NewsletterForm.svelte";
  import * as m from "$lib/paraglide/messages";
</script>

<svelte:head>
  <title>O nas - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Spoznajte Klub KGB Maribor - prostor, ki gosti dobre ljudi in dogodke že od leta 1998 dalje."
  />
</svelte:head>

<main class="flex flex-col md:gap-8 gap-4 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-left bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/club.png');"
  >
    <h1
      class="w-full text-prototype-orange-500 text-3xl lg:text-6xl font-bold font-calluna-sans-bold text-center uppercase"
    >
      <span class="text-pitch-black-100">O Klubu</span>
      KGB
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Prostor, ki gosti dobre ljudi in dogodke že od leta 1998 dalje.
    </p>
  </section>

  <!-- Content Section -->
  <section class="w-full px-4 md:px-12">
    <div class="mx-auto max-w-7xl space-y-12">
      <div class="max-w-4xl">
        <h2
          class="text-2xl md:text-3xl md:font-calluna-sans-bold font-calluna-sans-semibold text-pitch-black-100"
        >
          Naša <span class="text-prototype-orange-500">Zgodba</span>
        </h2>
        <p
          class="mt-4 font-calluna-sans-light text-gray-700 leading-relaxed text-md md:text-lg"
        >
          Klub KGB je eden izmed najbolj prepoznavnih klubov v Mariboru, ki
          deluje že od leta 1998. V središču mesta gostimo raznolike dogodke -
          od koncertov in stand-up komedij do predstav in kulturnih dogodkov.
          Naš prostor je postal dom za lokalno sceno in mednarodno priznan klub,
          ki vabi k druženju in odkrivanju nove glasbe.
        </p>
      </div>

      <div>
        <h2
          class="text-2xl font-calluna-sans-semibold text-pitch-black-100 md:text-4xl"
        >
          Kaj ponujamo
        </h2>
        <div class="mt-4 grid gap-6 md:grid-cols-2">
          <div class="rounded-lg shadow-card p-6">
            <h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
              Koncerti
            </h3>
            <p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
              Gostimo lokalne in mednarodne izvajalce različnih žanrov.
            </p>
          </div>
          <div class="rounded-lg shadow-card p-6">
            <h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
              Stand-up komedija
            </h3>
            <p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
              Redno gostimo komike iz Slovenije in tujine za večere smeha in
              dobre volje.
            </p>
          </div>
          <div class="rounded-lg shadow-card p-6">
            <h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
              Kulturni dogodki
            </h3>
            <p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
              Prostor odpiramo za razstave, predstave in druge kulturne
              prireditve.
            </p>
          </div>
          <div class="rounded-lg shadow-card p-6">
            <h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
              Najem prostorov
            </h3>
            <p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
              Klub je mogoče najeti za zasebne in poslovne dogodke.
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-4xl">
        <h2
          class="text-lg font-calluna-sans-semibold text-pitch-black-100 md:text-4xl"
        >
          Lokacija
        </h2>
        <p class="font-calluna-sans-light text-gray-700 leading-relaxed">
          Nahajamo se v samem središču Maribora, na Vojašniškem trgu 5. Prostor
          je lahko dostopen z javnim prevozom in v neposredni bližini parkirišč.
        </p>
        <div class="mt-4 rounded-lg shadow-card p-6">
          <p class="font-calluna-sans-semibold text-pitch-black-100">
            Klub KGB
          </p>
          <p class="mt-1 font-calluna-sans-light text-gray-700">
            Vojašniški trg 5
          </p>
          <p class="font-calluna-sans-light text-gray-700">
            2000 Maribor, Slovenija
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Newsletter Section -->
  <section
    id="newsletter"
    class="w-full bg-pitch-black-200 py-20 mt-12 md:mt-18 px-4 md:px-0"
  >
    <div
      class="w-full max-w-7xl mx-auto flex flex-col items-center md:gap-4 gap-2 px-4 md:px-0"
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
      <NewsletterForm class="mt-4 md:mt-12 w-full" />
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
