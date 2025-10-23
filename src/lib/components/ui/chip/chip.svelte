<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    isActive,
    label,
    onClick,
    children,
  }: {
    isActive: boolean;
    label: string;
    onClick: () => void;
    children?: Snippet;
  } = $props();
</script>

<button
  onclick={onClick}
  class="flex cursor-pointer items-center gap-2 rounded-md px-6 py-1 font-calluna-sans-semibold transition-colors {isActive
    ? 'bg-pitch-black-200 text-really-white-100'
    : 'bg-gray-100 text-pitch-black-100 hover:bg-gray-200'}"
>
  {#if children}
    {@render children?.()}
  {/if}
  {label}
</button>
