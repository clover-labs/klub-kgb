<script lang="ts">
	import { menuConfig, hasSubmenu } from "$lib/config/menu";
	import type { MenuItem } from "$lib/config/menu";
	import MegaMenu from "./MegaMenu.svelte";
	import MobileMenu from "./MobileMenu.svelte";
	import LanguageSwitcher from "./LanguageSwitcher.svelte";

	let openSubmenu: string | null = null;
	let mobileMenuOpen: boolean = false;

	function toggleSubmenu(label: string) {
		openSubmenu = openSubmenu === label ? null : label;
	}

	function closeSubmenu() {
		openSubmenu = null;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape" && openSubmenu) {
			closeSubmenu();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<header class="relative z-50 w-full bg-white px-2 py-2 md:px-4">
	<div class="flex items-center justify-between">
		<!-- Logo -->
		<a href="/" class="flex-shrink-0">
			<img src="/logo.svg" alt="KGB Logo" class="size-10" />
		</a>

		<!-- Desktop Navigation -->
		<nav class="hidden flex-1 items-center justify-end gap-4 md:flex" aria-label="Main navigation">
			{#each menuConfig as item}
				{#if hasSubmenu(item)}
					<!-- Menu item with submenu -->
					<button
						on:click={() => toggleSubmenu(item.label)}
						on:mouseenter={() => toggleSubmenu(item.label)}
						class="flex items-center gap-1 font-calluna-sans-semibold uppercase text-pitch-black-100 transition-colors hover:text-mean-green-500"
						aria-expanded={openSubmenu === item.label}
						aria-haspopup="true"
					>
						{item.label}
						<svg
							class="h-4 w-4 transform transition-transform {openSubmenu ===
							item.label
								? 'rotate-180'
								: ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
				{:else}
					<!-- Regular link -->
					<a
						href={item.href}
						target={item.external ? "_blank" : undefined}
						rel={item.external ? "noopener noreferrer" : undefined}
						class="font-calluna-sans-semibold uppercase text-pitch-black-100 transition-colors hover:text-mean-green-500"
					>
						{item.label}
					</a>
				{/if}
			{/each}

			<!-- Language Switcher -->
			<LanguageSwitcher />
		</nav>

		<!-- Mobile: Language Switcher + Hamburger -->
		<div class="flex items-center gap-2 md:hidden">
			<LanguageSwitcher />
			<!-- Mobile Hamburger Button -->
			<button
				on:click={toggleMobileMenu}
				class="flex items-center justify-center rounded-lg p-2 text-pitch-black-100 transition-colors hover:bg-gray-100"
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
			>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mega Menu (outside navigation, positioned relative to header) -->
	{#each menuConfig as item}
		{#if hasSubmenu(item)}
			<MegaMenu
				items={item.children || []}
				isOpen={openSubmenu === item.label}
				onClose={closeSubmenu}
			/>
		{/if}
	{/each}
</header>

<!-- Mobile Menu -->
<MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
