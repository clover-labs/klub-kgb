<script lang="ts">
	import type { MenuItem } from "$lib/config/menu";
	import { fade, fly, slide } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { menuConfig, hasSubmenu, isSection } from "$lib/config/menu";

	export let isOpen: boolean = false;
	export let onClose: () => void = () => {};

	let expandedItems: Set<string> = new Set();
	let expandedSections: Set<string> = new Set();

	function toggleSubmenu(label: string) {
		if (expandedItems.has(label)) {
			expandedItems.delete(label);
		} else {
			expandedItems.add(label);
		}
		expandedItems = expandedItems;
	}

	function toggleSection(label: string) {
		if (expandedSections.has(label)) {
			expandedSections.delete(label);
		} else {
			expandedSections.add(label);
		}
		expandedSections = expandedSections;
	}

	function handleBackdropClick() {
		onClose();
	}

	function handleLinkClick() {
		onClose();
		expandedItems = new Set();
		expandedSections = new Set();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			onClose();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
	<!-- Backdrop -->
	<button
		class="fixed inset-0 z-40 bg-pitch-black-100/50"
		on:click={handleBackdropClick}
		transition:fade={{ duration: 300 }}
		aria-label="Close menu"
	></button>

	<!-- Mobile Menu Panel -->
	<nav
		class="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-white shadow-xl"
		transition:fly={{ x: '100%', duration: 300, easing: quintOut }}
		aria-label="Mobile navigation"
	>
		<!-- Close Button -->
		<div class="flex items-center justify-between border-b border-gray-200 p-4">
			<span class="text-lg font-calluna-sans-semibold text-pitch-black-100"
				>Menu</span
			>
			<button
				on:click={onClose}
				class="rounded-lg p-2 text-pitch-black-100 transition-colors hover:bg-gray-100"
				aria-label="Close menu"
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<!-- Menu Items -->
		<div class="py-2">
			{#each menuConfig as item}
				{#if hasSubmenu(item)}
					<!-- Item with submenu (Klub) -->
					<div class="border-b border-gray-100">
						<button
							on:click={() => toggleSubmenu(item.label)}
							class="flex w-full items-center justify-between px-4 py-3 text-left font-calluna-sans-semibold uppercase text-pitch-black-100 transition-colors hover:bg-off-white-100"
						>
							{item.label}
							<svg
								class="h-5 w-5 transform transition-transform {expandedItems.has(
									item.label
								)
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

						{#if expandedItems.has(item.label)}
							<div class="bg-gray-50" transition:slide={{ duration: 200 }}>
								{#each item.children || [] as section}
									{#if isSection(section)}
										<!-- Section Header -->
										<div class="border-t border-gray-200">
											<button
												on:click={() => toggleSection(section.label)}
												class="flex w-full items-center justify-between px-6 py-2.5 text-left text-sm font-calluna-sans-semibold text-gray-700 hover:bg-gray-100"
											>
												{section.label}
												<svg
													class="h-4 w-4 transform transition-transform {expandedSections.has(
														section.label
													)
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

											{#if expandedSections.has(section.label)}
												<div
													class="bg-white px-6 py-2"
													transition:slide={{ duration: 200 }}
												>
													{#each section.children || [] as child}
														<a
															href={child.href}
															on:click={handleLinkClick}
															class="block py-2 text-sm font-calluna-sans-light text-gray-700 hover:text-mean-green-500"
														>
															{child.label}
														</a>
													{/each}
												</div>
											{/if}
										</div>
									{:else}
										<!-- Regular child item (if any) -->
										<a
											href={section.href}
											on:click={handleLinkClick}
											class="block px-6 py-2 text-sm font-calluna-sans-light text-gray-700 hover:text-mean-green-500"
										>
											{section.label}
										</a>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<!-- Regular link (Karte) -->
					<a
						href={item.href}
						target={item.external ? "_blank" : undefined}
						rel={item.external ? "noopener noreferrer" : undefined}
						on:click={handleLinkClick}
						class="block border-b border-gray-100 px-4 py-3 font-calluna-sans-semibold uppercase text-pitch-black-100 transition-colors hover:bg-off-white-100 hover:text-mean-green-500"
					>
						{item.label}
					</a>
				{/if}
			{/each}
		</div>
	</nav>
{/if}

<style>
	/* Prevent body scroll when mobile menu is open */
	:global(body:has(nav[aria-label="Mobile navigation"])) {
		overflow: hidden;
	}
</style>
