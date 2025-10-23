<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Drawer from "$lib/components/ui/drawer";
  import { draw } from "svelte/transition";

  interface Props {
    isOpen: boolean;
    onClose: () => void;
  }

  let { isOpen, onClose }: Props = $props();

  // Handle body scroll lock
  $effect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  const isMobile = $derived(globalThis.innerWidth < 768);
</script>

{#if !isMobile}
  <Dialog.Root open={isOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title
          class="text-2xl font-calluna-sans-bold text-pitch-black-100"
        >
          Uspešno ste se prijavili!
        </Dialog.Title>
        <Dialog.Close onclick={onClose}></Dialog.Close>
      </Dialog.Header>

      <!-- Modal Body -->
      <div class="p-0 md:p-6">
        <div class="text-center flex flex-col gap-6 items-center">
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
                in:draw={{ duration: 300 }}
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <!-- Message -->
          <div class="space-y-3 font-calluna-sans-light text-gray-700">
            <p>Hvala za prijavo na naš newsletter!</p>
            <p>
              Prosimo, <strong class="font-calluna-sans-semibold"
                >preverite vaš e-poštni predal</strong
              >
              (ali spam mapo) za potrditveno sporočilo in sledite navodilom za dokončanje
              prijave.
            </p>
          </div>

          <!-- Email Icon with Tip -->
          <div
            class="w-full rounded-lg bg-mean-green-500/10 p-4 flex items-center gap-3"
          >
            <div class="flex items-start gap-3">
              <svg
                class="h-6 w-6 flex-shrink-0 text-mean-green-500"
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
            </div>
            <div class="text-left flex flex-col items-start">
              <p class="text-sm font-calluna-sans-semibold text-gray-800">
                Preverite vaš e-poštni predal
              </p>
              <p class="text-sm font-calluna-sans-light text-gray-700">
                Če sporočila ne najdete, preverite mapo spam/neželena pošta.
              </p>
            </div>
          </div>

          <Button variant="pitch-black" size="lg" onclick={onClose}>
            V redu
          </Button>
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{:else if isMobile}
  <Drawer.Root open={isOpen}>
    <Drawer.Content class="p-0 md:p-6 px-4 py-2">
      <Drawer.Header>
        <Drawer.Title
          class="text-2xl font-calluna-sans-bold text-pitch-black-100 text-center"
        >
          Uspešno ste se prijavili!
        </Drawer.Title>
      </Drawer.Header>
      <div class="text-center flex flex-col gap-6 items-center">
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
              in:draw={{ duration: 300 }}
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <!-- Message -->
        <div class="space-y-3 font-calluna-sans-light text-gray-700">
          <p>Hvala za prijavo na naš newsletter!</p>
          <p>
            Prosimo, <strong class="font-calluna-sans-semibold"
              >preverite vaš e-poštni predal</strong
            >
            (ali spam mapo) za potrditveno sporočilo in sledite navodilom za dokončanje
            prijave.
          </p>
        </div>

        <!-- Email Icon with Tip -->
        <div
          class="w-full rounded-lg bg-mean-green-500/10 p-4 flex items-center gap-3"
        >
          <div class="flex items-start gap-3">
            <svg
              class="h-6 w-6 flex-shrink-0 text-mean-green-500"
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
          </div>
          <div class="text-left flex flex-col items-start">
            <p class="text-sm font-calluna-sans-semibold text-gray-800">
              Preverite vaš e-poštni predal
            </p>
            <p class="text-sm font-calluna-sans-light text-gray-700">
              Če sporočila ne najdete, preverite mapo spam/neželena pošta.
            </p>
          </div>
        </div>

        <Button variant="pitch-black" size="lg" onclick={onClose}>
          V redu
        </Button>
      </div>
    </Drawer.Content>
  </Drawer.Root>
{/if}
