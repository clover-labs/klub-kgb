<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { HTMLAttributes } from "svelte/elements";
  import LanguageSwitcher from "$lib/components/LanguageSwitcher.svelte";
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { cn } from "$lib/utils.js";
  import { getMenuConfig } from "$lib/config/menu";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
  import { page } from "$app/state";
  import {
    ChevronDownIcon,
    ChevronRightIcon,
    MenuIcon,
    XIcon,
  } from "@lucide/svelte";
  import { slide } from "svelte/transition";

  const menuConfig = getMenuConfig();
  let isMobileMenuOpen = false;
  let openSectionIndex: number | null = null;

  function toggleMobileMenu() {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "auto";
      openSectionIndex = null; // Reset open section when closing menu
    } else {
      document.body.style.overflow = "hidden";
    }
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function toggleSection(index: number) {
    openSectionIndex = openSectionIndex === index ? null : index;
  }

  type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    href: string;
    content: string;
  };
</script>

{#snippet ListItem({
  title,
  content,
  href,
  class: className,
  ...restProps
}: ListItemProps)}
  <li>
    <NavigationMenu.Link>
      <a
        {href}
        class={cn(
          "block text-off-white-100 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-prototype-orange-500 ease-in-out duration-300",
          className
        )}
        {...restProps}
      >
        <div class="text-sm font-medium leading-none">{title}</div>
        <p class="text-off-white-100/70 line-clamp-2 text-sm leading-snug">
          {content}
        </p>
      </a>
    </NavigationMenu.Link>
  </li>
{/snippet}

<header class="sticky top-0 w-full z-[100] md:py-4">
  <div
    class="flex items-center justify-between max-w-7xl w-full md:rounded-lg py-3 md:py-1 px-4 mx-auto gap-8 liquid-glass backdrop-blur-md"
  >
    <div class="flex items-center gap-2">
      <a href="/" class="flex-shrink-0 flex items-center gap-2">
        <img src="/logo.svg" alt="KGB Logo" class="size-8" />
        <img src="/logos/text-logo.png" alt="KGB Logo" class="h-6" />
      </a>
      <NavigationMenu.Root viewport={false} class="hidden md:block">
        <NavigationMenu.List>
          {#each menuConfig as item}
            {#if item.href}
              <NavigationMenu.Item>
                <NavigationMenu.Link>
                  <a
                    href={item.href}
                    class={navigationMenuTriggerStyle()}
                    target={item.external ? "_blank" : undefined}
                  >
                    {item.label}
                  </a>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            {:else if item.children}
              {#each item.children as section}
                {#if section.section}
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger
                      >{section.label}</NavigationMenu.Trigger
                    >
                    <NavigationMenu.Content>
                      <ul class="grid w-80 px-1 py-2">
                        {#each section.children || [] as child}
                          {@render ListItem({
                            href: child.href || "",
                            title: child.label,
                            content: child.description || "",
                          })}
                        {/each}
                      </ul>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                {/if}
              {/each}
            {/if}
          {/each}
          <NavigationMenu.Indicator />
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
    <div class="hidden md:flex items-center gap-2 relative flex-grow-1">
      <div class="relative flex items-center justify-end gap-2 w-full">
        {#if page.data.breadcrumbs}
          <Breadcrumb.Root>
            <Breadcrumb.List
              class=" max-w-[26rem] overflow-x-auto flex-nowrap px-12"
            >
              {#each page.data.breadcrumbs as breadcrumb, index}
                {#if index > 0}
                  <Breadcrumb.Separator>
                    <ChevronRightIcon class="size-4 text-pitch-black-200/70" />
                  </Breadcrumb.Separator>
                {/if}
                <Breadcrumb.Item>
                  {#if breadcrumb.children}
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger
                        class="flex items-center gap-1 whitespace-nowrap"
                      >
                        {breadcrumb.label}
                        <ChevronDownIcon class="size-4" />
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content align="start">
                        {#each breadcrumb.children as child}
                          <DropdownMenu.Item class="px-4 py-2 group">
                            <a
                              href={child.href}
                              class="block w-full group-hover:text-prototype-orange-500 transition-colors duration-300 whitespace-nowrap"
                            >
                              {child.label}
                            </a>
                          </DropdownMenu.Item>
                        {/each}
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  {:else if index === page.data.breadcrumbs.length - 1}
                    <Breadcrumb.Page class="whitespace-nowrap">
                      {breadcrumb.label}
                    </Breadcrumb.Page>
                  {:else}
                    <Breadcrumb.Link
                      href={breadcrumb.href}
                      class="whitespace-nowrap"
                    >
                      {breadcrumb.label}
                    </Breadcrumb.Link>
                  {/if}
                </Breadcrumb.Item>
              {/each}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        {/if}
      </div>
      <LanguageSwitcher />
    </div>

    <!-- Mobile Menu Button -->
    <button
      class="md:hidden hover:bg-black/5 rounded-lg transition-colors"
      onclick={toggleMobileMenu}
      aria-label="Toggle mobile menu"
    >
      {#if isMobileMenuOpen}
        <XIcon class="size-6 animate-in fade-in" />
      {:else}
        <MenuIcon class="size-6 animate-in fade-in" />
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if isMobileMenuOpen}
    <div
      class="absolute top-full left-0 w-full md:hidden h-screen backdrop-blur-xl bg-really-white-100/70 overflow-y-scroll"
      in:slide={{ duration: 300 }}
      out:slide={{ duration: 300 }}
    >
      <nav class="px-4 py-4">
        <ul class="space-y-4">
          {#each menuConfig as item}
            {#if item.href}
              <li>
                <a
                  href={item.href}
                  class="block py-2 hover:text-prototype-orange-500 transition-colors text-xl font-calluna-sans-semibold"
                  target={item.external ? "_blank" : undefined}
                  onclick={toggleMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            {:else if item.children}
              {#each item.children as section, index}
                {#if section.section}
                  <li class="space-y-2">
                    <button
                      class="flex items-center justify-between w-full py-2 text-xl font-calluna-sans-semibold"
                      onclick={() => toggleSection(index)}
                    >
                      {section.label}
                      <ChevronDownIcon
                        class="size-5 transition-transform duration-200"
                        style={openSectionIndex === index
                          ? "transform: rotate(180deg)"
                          : ""}
                      />
                    </button>
                    {#if openSectionIndex === index}
                      <div transition:slide={{ duration: 200 }}>
                        <ul class="pl-4 space-y-2">
                          {#each section.children || [] as child}
                            <li>
                              <a
                                href={child.href || ""}
                                class="block py-1 hover:text-prototype-orange-500 transition-colors text-lg font-calluna-sans-light"
                                onclick={toggleMobileMenu}
                              >
                                {child.label}
                              </a>
                            </li>
                          {/each}
                        </ul>
                      </div>
                    {/if}
                  </li>
                {/if}
              {/each}
            {/if}
          {/each}
        </ul>
      </nav>
    </div>
  {/if}
</header>
