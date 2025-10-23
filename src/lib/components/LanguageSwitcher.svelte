<script lang="ts">
  import { page } from "$app/state";
  import { languageTag } from "$lib/paraglide/runtime";
  import * as Select from "$lib/components/ui/select/index.js";

  const languages = [
    { code: "sl", label: "Slovenščina", icon: "🇸🇮" },
    { code: "en", label: "English", icon: "🇬🇧" },
  ];

  let isOpen = $state(false);

  // Get current language
  let currentLang = $derived(languageTag());

  // Function to switch language
  function switchLanguage(newLang: string) {
    if (newLang === currentLang) return;

    const currentPath = page.url.pathname;
    let newPath: string;

    if (newLang === "en") {
      // Switch to English: add /en prefix
      const cleanPath = currentPath.replace(/^\/en/, "");
      newPath = `/en${cleanPath || "/"}`;
    } else {
      // Switch to Slovenian: remove /en prefix
      newPath = currentPath.replace(/^\/en/, "") || "/";
    }

    isOpen = false;
    // Navigate to the new path
    window.location.href = newPath;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  function closeDropdown() {
    isOpen = false;
  }

  // Close dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest(".language-switcher")) {
      closeDropdown();
    }
  }
</script>

<svelte:window onclick={handleClickOutside} />

<Select.Root type="single">
  <Select.Trigger class="cursor-pointer bg-transparent border-none shadow-none">
    <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </Select.Trigger>
  <Select.Content class="z-[1000]">
    {#each languages as lang}
      <Select.Item value={lang.code}>{lang.icon} {lang.label}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
