<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Select from "$lib/components/ui/select";
  import VenueRentalSuccessModal from "$lib/components/VenueRentalSuccessModal.svelte";

  let formData = $state({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    message: "",
  });

  let submitStatus: "idle" | "submitting" | "success" | "error" =
    $state("idle");
  let errorMessage = $state("");
  let showSuccessModal = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    submitStatus = "submitting";
    errorMessage = "";

    try {
      const response = await fetch("/api/venue-rental", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        submitStatus = "idle";
        showSuccessModal = true;
        // Reset form
        formData = {
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          eventType: "",
          guestCount: "",
          message: "",
        };
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      submitStatus = "error";
      errorMessage =
        "Prišlo je do napake. Prosimo, poskusite znova ali nas kontaktirajte direktno.";
    }
  }
</script>

<svelte:head>
  <title>Najem prostora - Klub KGB Maribor</title>
  <meta
    name="description"
    content="Klub KGB Maribor je na voljo za najem za zasebne in poslovne dogodke. Kontaktirajte nas za več informacij."
  />
</svelte:head>

<main class="flex flex-col md:gap-8 gap-4 -mt-23">
  <!-- Hero Section -->
  <section
    class="h-140 pb-4 px-4 md:px-0 md:pb-0 md:h-100 flex flex-col justify-end md:justify-center items-center md:gap-6 gap-2 border-b-1 border-gray-200 md:h-[60vh] md:bg-cover bg-left bg-no-repeat bg-size-[250%]"
    style="background-image: url('/heroes/club.png');"
  >
    <h1
      class="w-full text-prototype-orange-500 text-3xl lg:text-6xl font-bold font-calluna-sans-semibold text-center uppercase"
    >
      Najem
      <span class="text-pitch-black-100">Prostora</span>
    </h1>
    <p
      class="w-full sm:max-w-1/3 text-lg lg:text-2xl font-calluna-sans-light text-center"
    >
      Klub KGB Maribor je na voljo za najem za zasebne in poslovne dogodke
    </p>
  </section>
  <!-- Content Section -->
  <section class="w-full px-4 md:px-12">
    <div class="mx-auto grid max-w-7xl gap-6 md:gap-8 lg:grid-cols-2">
      <!-- Left Column: Information -->
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2
            class="text-2xl md:text-3xl md:font-calluna-sans-semibold font-calluna-sans-semibold text-pitch-black-100"
          >
            O prostoru
          </h2>
          <p class="mb-4 font-calluna-sans-light text-gray-700 leading-relaxed">
            Klub KGB je kultni prostor v srcu Maribora, ki od leta 1998 gosti
            raznolike dogodke. Naš prostor je idealen za koncerte, zasebne
            zabave, poslovne dogodke, predstavitve in druge priložnosti.
          </p>
          <p class="font-calluna-sans-light text-gray-700 leading-relaxed">
            Prostor je opremljen s profesionalno avdio in video opremo ter nudi
            edinstveno atmosfero za vaš dogodek.
          </p>
        </div>

        <!-- Features -->
        <div>
          <h3
            class="mb-4 text-2xl font-calluna-sans-semibold text-pitch-black-100"
          >
            Kaj ponujamo
          </h3>
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="flex items-center gap-3">
              <svg
                class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500"
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
              <div>
                <h4
                  class="text-lg md:text-sm font-calluna-sans text-pitch-black-100"
                >
                  Profesionalna oprema
                </h4>
                <p class="text-sm font-calluna-sans-light text-gray-600">
                  Avdio in video sistem
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg
                class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500"
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
              <div>
                <h4
                  class="text-lg md:text-sm font-calluna-sans text-pitch-black-100"
                >
                  Osrednja lokacija
                </h4>
                <p class="text-sm font-calluna-sans-light text-gray-600">
                  Vojašniški trg 5, Maribor
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg
                class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500"
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
              <div>
                <h4
                  class="text-lg md:text-sm font-calluna-sans text-pitch-black-100"
                >
                  Fleksibilna ureditev
                </h4>
                <p class="text-sm font-calluna-sans-light text-gray-600">
                  Prilagodljiv prostor
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <svg
                class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500"
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
              <div>
                <h4
                  class="text-lg md:text-sm font-calluna-sans text-pitch-black-100"
                >
                  Edinstvena atmosfera
                </h4>
                <p class="text-sm font-calluna-sans-light text-gray-600">
                  Kultni prostor z zgodovino.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="md:rounded-lg md:shadow-card md:p-6">
          <h3
            class="mb-4 text-xl font-calluna-sans-semibold text-pitch-black-100"
          >
            Kontakt
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href="mailto:info@klub-kgb.si"
                class="font-calluna-sans-light text-gray-700 hover:text-brick-red-200 transition-colors"
              >
                info@klub-kgb.si
              </a>
            </div>
            <div class="flex items-center gap-3">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="font-calluna-sans-light text-gray-700">
                Vojašniški trg 5, 2000 Maribor
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Form -->
      <div>
        <div class="sticky top-24 rounded-lg p-4 md:p-8 shadow-card">
          <h2
            class="mb-4 md:mb-6 md:mt-0 text-2xl font-calluna-sans-semibold text-pitch-black-100"
          >
            Pošljite povpraševanje
          </h2>

          {#if submitStatus === "error"}
            <div class="mb-6 rounded-lg bg-brick-red-500/20 p-4">
              <div class="flex items-center gap-2">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <p class="font-calluna-sans-semibold text-pitch-black-100">
                  Napaka pri pošiljanju
                </p>
              </div>
              <p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
                {errorMessage}
              </p>
            </div>
          {/if}

          <form onsubmit={handleSubmit} class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label
                for="name"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Ime in priimek *</label
              >
              <Input
                bind:value={formData.name}
                required
                placeholder="Vaše ime"
                name="name"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="email"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >E-pošta *</label
              >
              <Input
                type="email"
                bind:value={formData.email}
                required
                placeholder="vaš@email.com"
                name="email"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="phone"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Telefonska številka *</label
              >
              <Input
                type="tel"
                name="phone"
                bind:value={formData.phone}
                placeholder="+386 ..."
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="eventDate"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Datum dogodka</label
              >
              <input
                type="date"
                bind:value={formData.eventDate}
                name="eventDate"
                class="shadow-sm rounded-lg border border-gray-300 px-4 py-1.5 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="eventType"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Vrsta dogodka</label
              >
              <Select.Root bind:value={formData.eventType} type="single">
                <Select.Trigger>
                  {formData.eventType || "Izberite vrsto dogodka"}
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="concert">Koncert</Select.Item>
                  <Select.Item value="party">Zasebna zabava</Select.Item>
                  <Select.Item value="corporate">Poslovni dogodek</Select.Item>
                  <Select.Item value="presentation">Predstavitev</Select.Item>
                  <Select.Item value="other">Drugo</Select.Item>
                </Select.Content>
              </Select.Root>
            </div>

            <div class="flex flex-col gap-2">
              <label
                for="guestCount"
                class="font-calluna-sans-semibold text-pitch-black-100"
                >Pričakovano število gostov</label
              >
              <Input
                type="number"
                bind:value={formData.guestCount}
                placeholder="npr. 50"
                min="1"
              />
            </div>

            <div class="flex flex-col gap-2">
              <span class="font-calluna-sans-semibold text-pitch-black-100"
                >Sporočilo *</span
              >
              <textarea
                bind:value={formData.message}
                required
                rows="4"
                placeholder="Opišite vaš dogodek in posebne zahteve..."
                class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
              ></textarea>
            </div>

            <Button
              variant="pitch-black"
              size="lg"
              type="submit"
              disabled={submitStatus === "submitting"}
            >
              {submitStatus === "submitting"
                ? "Pošiljam..."
                : "Pošlji povpraševanje"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- Success Modal -->
<VenueRentalSuccessModal
  isOpen={showSuccessModal}
  onClose={() => (showSuccessModal = false)}
/>
