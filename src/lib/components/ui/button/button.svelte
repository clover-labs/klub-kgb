<script lang="ts" module>
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements";
  import { type VariantProps, tv } from "tailwind-variants";

  export const buttonVariants = tv({
    base: "focus-visible:border-ring cursor-pointer focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
      variant: {
        "mean-green":
          "bg-mean-green-500 text-really-white-100 hover:bg-mean-green-400 shadow-sm",
        "mean-green-outline":
          "border-2 border-mean-green-500 bg-transparent text-mean-green-900 hover:bg-mean-green-500 hover:text-really-white-100",
        "brick-red":
          "bg-brick-red-500 text-really-white-100 hover:bg-brick-red-200 shadow-sm",
        "brick-red-outline":
          "border-2 border-brick-red-500 bg-transparent text-brick-red-900 hover:bg-brick-red-500 hover:text-really-white-100",
        "prototype-orange":
          "bg-prototype-orange-500 text-really-white-100 hover:bg-prototype-orange-400 shadow-sm",
        "pitch-black":
          "bg-pitch-black-100 text-really-white-100 hover:bg-pitch-black-200 shadow-sm",
        outline:
          "border-2 border-pitch-black-100 bg-transparent text-pitch-black-900 hover:bg-pitch-black-500 hover:text-really-white-100",
        ghost: "text-pitch-black-100 hover:bg-off-white-100",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "default",
    },
  });

  export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
  export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
    };
</script>

<script lang="ts">
  let {
    class: className,
    variant = "ghost",
    size = "default",
    ref = $bindable(null),
    href = undefined,
    type = "button",
    disabled,
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size }), className)}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    role={disabled ? "link" : undefined}
    tabindex={disabled ? -1 : undefined}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    data-slot="button"
    class={cn(buttonVariants({ variant, size }), className)}
    {type}
    {disabled}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
