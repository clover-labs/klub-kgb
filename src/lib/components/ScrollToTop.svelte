<script lang="ts">
  import { onMount } from "svelte";
  import { ChevronUp } from "@lucide/svelte";

  let showButton = $state(false);

  function handleScroll() {
    // Show button when user scrolls down 300px
    showButton = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

{#if showButton}
  <button
    onclick={scrollToTop}
    class="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-pitch-black-100 text-white shadow-lg transition-all duration-300 cursor-pointer hover:bg-pitch-black-200/70 hover:scale-110 active:scale-95"
    aria-label="Scroll to top"
  >
    <ChevronUp class="h-6 w-6" />
  </button>
{/if}

<style>
  button {
    animation: fadeIn 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
