<script lang="ts">
  import type {
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  type InputType = Exclude<HTMLInputTypeAttribute, "file">;

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type"> &
      (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
      )
  >;

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    class: className,
    ...restProps
  }: Props = $props();
</script>

{#if type === "file"}
  <input
    bind:this={ref}
    data-slot="input"
    class={cn(
      "selection:bg-[var(--color-mean-green-500)] selection:text-[var(--color-really-white-100)] border-[var(--color-pitch-black-200/30)] bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-all duration-200 shadow-sm flex h-9 w-full min-w-0 rounded-md border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-[var(--color-pitch-black-200/30)]/50",
      "focus-visible:border-[var(--color-mean-green-500)] focus-visible:ring-[var(--color-mean-green-500)]/20 focus-visible:ring-[3px]",
      "aria-invalid:border-[var(--color-brick-red-500)] aria-invalid:ring-[var(--color-brick-red-200)]/20 border-gray-300",
      className
    )}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else}
  <input
    bind:this={ref}
    data-slot="input"
    class={cn(
      "selection:bg-[var(--color-mean-green-500)] selection:text-[var(--color-really-white-100)] border-[var(--color-pitch-black-200/30)] bg-transparent px-3 py-1 text-base outline-none transition-all duration-200 shadow-sm flex h-9 w-full min-w-0 rounded-md border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text-[var(--color-pitch-black-200/30)]/50",
      "focus-visible:border-[var(--color-mean-green-500)] focus-visible:ring-[var(--color-mean-green-500)]/20 focus-visible:ring-[3px]",
      "aria-invalid:border-[var(--color-brick-red-500)] aria-invalid:ring-[var(--color-brick-red-200)]/20 border-gray-300",
      className
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
