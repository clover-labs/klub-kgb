<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import Button from "./ui/button/button.svelte";
  import NewsletterSuccessModal from "./NewsletterSuccessModal.svelte";
  import * as m from "$lib/paraglide/messages";

  let email = $state("");
  let isSubmitting = $state(false);
  let message = $state("");
  let messageType: "success" | "error" | "" = $state("");
  let showSuccessModal = $state(false);

  let {
    class: className,
    align = "center",
  }: { class?: string; align?: "center" | "left" } = $props();

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!email || !isValidEmail(email)) {
      message = m.newsletter_invalid_email();
      messageType = "error";
      return;
    }

    isSubmitting = true;
    message = "";

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessModal = true;
        email = "";
        message = "";
        messageType = "";
      } else {
        message = data.error || m.newsletter_error();
        messageType = "error";
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      message = m.newsletter_error();
      messageType = "error";
    } finally {
      isSubmitting = false;
    }
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
</script>

<div class={className}>
  <form onsubmit={handleSubmit} class="w-full flex flex-col items-center">
    <div
      class="flex items-center justify-{align} gap-4 md:gap-2 flex-col md:flex-row w-full"
    >
      <Input
        type="email"
        class="w-full md:max-w-[20rem] bg-really-white-100"
        bind:value={email}
        placeholder={m.newsletter_email_placeholder()}
        required
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        disabled={isSubmitting || !email}
        variant="mean-green"
        class="uppercase w-full md:w-fit"
      >
        {m.newsletter_subscribe_button()}
      </Button>
    </div>
  </form>

  {#if message}
    <div class="message {messageType}">
      {message}
    </div>
  {/if}
</div>

<!-- Success Modal -->
<NewsletterSuccessModal
  isOpen={showSuccessModal}
  onClose={() => (showSuccessModal = false)}
/>
