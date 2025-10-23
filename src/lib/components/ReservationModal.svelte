<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button, buttonVariants } from "$lib/components/ui/button";

  interface Props {
    eventTitle: string;
  }

  let { eventTitle }: Props = $props();
  let isOpen = $state(false);

  let reservationForm = $state({
    email: "",
    phone: "",
    event: eventTitle,
    people: "",
    agreeToTerms: false,
    notes: "",
  });

  let formErrors = $state({
    email: "",
    phone: "",
    people: "",
    agreeToTerms: "",
  });

  let isSubmitting = $state(false);
  let submitSuccess = $state(false);
  let submitError = $state("");

  // Update event title when it changes
  $effect(() => {
    reservationForm.event = eventTitle;
  });

  // Handle body scroll lock
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  function handleClose() {
    // Reset form if successful
    if (submitSuccess) {
      reservationForm = {
        email: "",
        phone: "",
        event: eventTitle,
        people: "",
        agreeToTerms: false,
        notes: "",
      };
      formErrors = {
        email: "",
        phone: "",
        people: "",
        agreeToTerms: "",
      };
      submitSuccess = false;
      submitError = "";
    }
    isOpen = false;
  }

  function validateForm(): boolean {
    let isValid = true;
    formErrors = {
      email: "",
      phone: "",
      people: "",
      agreeToTerms: "",
    };

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reservationForm.email) {
      formErrors.email = "E-pošta je obvezna";
      isValid = false;
    } else if (!emailRegex.test(reservationForm.email)) {
      formErrors.email = "Vnesite veljaven e-poštni naslov";
      isValid = false;
    }

    // Phone validation
    if (!reservationForm.phone) {
      formErrors.phone = "Telefonska številka je obvezna";
      isValid = false;
    }

    // People validation
    if (!reservationForm.people) {
      formErrors.people = "Izberite število oseb";
      isValid = false;
    }

    // Terms validation
    if (!reservationForm.agreeToTerms) {
      formErrors.agreeToTerms = "Strinjati se morate s pogoji rezervacije";
      isValid = false;
    }

    return isValid;
  }

  async function handleReservationSubmit(e: Event) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    isSubmitting = true;
    submitError = "";

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationForm),
      });

      if (response.ok) {
        submitSuccess = true;
      } else {
        submitError =
          "Prišlo je do napake pri oddaji rezervacije. Prosimo, poskusite ponovno.";
      }
    } catch (error) {
      submitError =
        "Prišlo je do napake pri oddaji rezervacije. Prosimo, poskusite ponovno.";
    } finally {
      isSubmitting = false;
    }
  }
  const isMobile = $derived(globalThis.innerWidth < 768);
</script>

{#if !isMobile}
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: "mean-green" })}>
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
      Rezerviraj mizo</Dialog.Trigger
    >
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title
          class="text-2xl font-calluna-sans-bold text-pitch-black-100"
        >
          Rezerviraj mizo
        </Dialog.Title>
        <Dialog.Description
          class="text-sm font-calluna-sans-light text-gray-600"
        >
          Za dogodek: {eventTitle}
        </Dialog.Description>
        <Dialog.Close></Dialog.Close>
      </Dialog.Header>

      <!-- Modal Body -->
      <div class="p-0">
        {#if submitSuccess}
          <!-- Success Message -->
          <div class="text-center">
            <div
              class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-mean-green-500/10"
            >
              <svg
                class="h-8 w-8 text-mean-green-500"
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
            </div>
            <h3
              class="mb-2 text-xl font-calluna-sans-bold text-pitch-black-100"
            >
              Rezervacija oddana!
            </h3>
            <p class="font-calluna-sans-light text-gray-600">
              Vaša rezervacija je bila uspešno oddana. V kratkem vas bomo
              kontaktirali za potrditev.
            </p>
            <button
              onclick={handleClose}
              class="mt-6 rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-600"
            >
              V redu
            </button>
          </div>
        {:else}
          <!-- Reservation Form -->
          <form onsubmit={handleReservationSubmit} class="space-y-4">
            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
              >
                E-pošta <span class="text-brick-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                bind:value={reservationForm.email}
                class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
                placeholder="vas.email@primer.si"
                required
              />
              {#if formErrors.email}
                <p
                  class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
                >
                  {formErrors.email}
                </p>
              {/if}
            </div>

            <!-- Phone Field -->
            <div>
              <label
                for="phone"
                class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
              >
                Telefonska številka <span class="text-brick-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                bind:value={reservationForm.phone}
                class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
                placeholder="+386 XX XXX XXX"
                required
              />
              {#if formErrors.phone}
                <p
                  class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
                >
                  {formErrors.phone}
                </p>
              {/if}
            </div>

            <!-- Event Field (Read-only) -->
            <input
              type="hidden"
              id="event"
              bind:value={reservationForm.event}
              class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 font-calluna-sans-light text-gray-600"
              readonly
            />

            <!-- Number of People Dropdown -->
            <div>
              <label
                for="people"
                class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
              >
                Število oseb <span class="text-brick-red-500">*</span>
              </label>
              <select
                id="people"
                bind:value={reservationForm.people}
                class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
                required
              >
                <option value="">Izberite število oseb</option>
                <option value="5">5 oseb</option>
                <option value="6">6 oseb</option>
                <option value="7+">7 ali več oseb</option>
              </select>
              {#if formErrors.people}
                <p
                  class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
                >
                  {formErrors.people}
                </p>
              {/if}
            </div>

            <!-- Notes Field -->
            <div>
              <label
                for="notes"
                class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
              >
                Opombe (neobvezno)
              </label>
              <textarea
                id="notes"
                bind:value={reservationForm.notes}
                rows="3"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
                placeholder="Morebitne posebne zahteve ali vprašanja..."
              ></textarea>
            </div>

            <!-- Terms Checkbox -->
            <Dialog.Footer class="flex !flex-col gap-4">
              <label class="flex items-start gap-3">
                <input
                  type="checkbox"
                  bind:checked={reservationForm.agreeToTerms}
                  class="mt-1 h-4 w-4 rounded border-gray-300 text-mean-green-500 focus:ring-mean-green-500"
                  required
                />
                <span class="text-sm font-calluna-sans-light text-gray-700">
                  Strinjam se s <a
                    href="/faq#tables"
                    target="_blank"
                    class="text-mean-green-500 underline hover:text-mean-green-600"
                    >pogoji rezervacije</a
                  > <span class="text-brick-red-500">*</span>
                </span>
              </label>
              {#if formErrors.agreeToTerms}
                <p
                  class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
                >
                  {formErrors.agreeToTerms}
                </p>
              {/if}

              <!-- Error Message -->
              {#if submitError}
                <div class="rounded-lg bg-brick-red-500/10 p-4">
                  <p class="text-sm font-calluna-sans-light text-brick-red-500">
                    {submitError}
                  </p>
                </div>
              {/if}

              <!-- Submit Button -->
              <div class="flex gap-3 pt-2">
                <button
                  type="button"
                  onclick={handleClose}
                  class="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-gray-50"
                >
                  Prekliči
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  class="flex-1 rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Pošiljanje..." : "Rezerviraj"}
                </button>
              </div>
            </Dialog.Footer>
          </form>
        {/if}
      </div>
    </Dialog.Content>
  </Dialog.Root>
{:else if isMobile}
  <Drawer.Root open={isOpen}>
    <Drawer.Trigger class={buttonVariants({ variant: "mean-green" })}>
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
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
      Rezerviraj mizo</Drawer.Trigger
    >
    <Drawer.Content class="p-0 md:p-6 px-4 py-2">
      <Drawer.Header>
        <Drawer.Title
          class="text-2xl font-calluna-sans-bold text-pitch-black-100 text-center"
        >
          Rezerviraj mizo
        </Drawer.Title>
      </Drawer.Header>
      {#if submitSuccess}
        <!-- Success Message -->
        <div class="text-center">
          <div
            class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-mean-green-500/10"
          >
            <svg
              class="h-8 w-8 text-mean-green-500"
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
          </div>
          <h3 class="mb-2 text-xl font-calluna-sans-bold text-pitch-black-100">
            Rezervacija oddana!
          </h3>
          <p class="font-calluna-sans-light text-gray-600">
            Vaša rezervacija je bila uspešno oddana. V kratkem vas bomo
            kontaktirali za potrditev.
          </p>
          <button
            onclick={handleClose}
            class="mt-6 rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-600"
          >
            V redu
          </button>
        </div>
      {:else}
        <!-- Reservation Form -->
        <form onsubmit={handleReservationSubmit} class="space-y-2">
          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
            >
              E-pošta <span class="text-brick-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              bind:value={reservationForm.email}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
              placeholder="vas.email@primer.si"
              required
            />
            {#if formErrors.email}
              <p
                class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
              >
                {formErrors.email}
              </p>
            {/if}
          </div>

          <!-- Phone Field -->
          <div>
            <label
              for="phone"
              class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
            >
              Telefonska številka <span class="text-brick-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              bind:value={reservationForm.phone}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
              placeholder="+386 XX XXX XXX"
              required
            />
            {#if formErrors.phone}
              <p
                class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
              >
                {formErrors.phone}
              </p>
            {/if}
          </div>

          <!-- Event Field (Read-only) -->
          <input
            type="hidden"
            id="event"
            bind:value={reservationForm.event}
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 font-calluna-sans-light text-gray-600"
            readonly
          />

          <!-- Number of People Dropdown -->
          <div>
            <label
              for="people"
              class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
            >
              Število oseb <span class="text-brick-red-500">*</span>
            </label>
            <select
              id="people"
              bind:value={reservationForm.people}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
              required
            >
              <option value="">Izberite število oseb</option>
              <option value="5">5 oseb</option>
              <option value="6">6 oseb</option>
              <option value="7+">7 ali več oseb</option>
            </select>
            {#if formErrors.people}
              <p
                class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
              >
                {formErrors.people}
              </p>
            {/if}
          </div>

          <!-- Notes Field -->
          <div>
            <label
              for="notes"
              class="mb-1 block font-calluna-sans-semibold text-pitch-black-100"
            >
              Opombe (neobvezno)
            </label>
            <textarea
              id="notes"
              bind:value={reservationForm.notes}
              rows="3"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
              placeholder="Morebitne posebne zahteve ali vprašanja..."
            ></textarea>
          </div>

          <!-- Terms Checkbox -->
          <Drawer.Footer class="flex !flex-col gap-2 p-0">
            <label class="flex items-start gap-3">
              <input
                type="checkbox"
                bind:checked={reservationForm.agreeToTerms}
                class="mt-1 h-4 w-4 rounded border-gray-300 text-mean-green-500 focus:ring-mean-green-500"
                required
              />
              <span class="text-sm font-calluna-sans-light text-gray-700">
                Strinjam se s <a
                  href="/faq#tables"
                  target="_blank"
                  class="text-mean-green-500 underline hover:text-mean-green-600"
                  >pogoji rezervacije</a
                > <span class="text-brick-red-500">*</span>
              </span>
            </label>
            {#if formErrors.agreeToTerms}
              <p
                class="mt-1 text-sm font-calluna-sans-light text-brick-red-500"
              >
                {formErrors.agreeToTerms}
              </p>
            {/if}

            <!-- Error Message -->
            {#if submitError}
              <div class="rounded-lg bg-brick-red-500/10">
                <p class="text-sm font-calluna-sans-light text-brick-red-500">
                  {submitError}
                </p>
              </div>
            {/if}

            <!-- Submit Button -->
            <div class="flex items-center gap-4 mt-2 p-0">
              <Button class="flex-1" variant="pitch-black" onclick={handleClose}
                >Prekliči</Button
              >
              <Button
                class="flex-1"
                variant="mean-green"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Pošiljanje..." : "Rezerviraj"}
              </Button>
            </div>
          </Drawer.Footer>
        </form>
      {/if}
    </Drawer.Content>
  </Drawer.Root>
{/if}
