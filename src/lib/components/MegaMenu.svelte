<script lang="ts">
	import type { MenuItem } from "$lib/config/menu";
	import { fade, fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { isSection } from "$lib/config/menu";

	export let items: MenuItem[] = [];
	export let isOpen: boolean = false;
	export let onClose: () => void = () => {};

	function handleBackdropClick() {
		onClose();
	}

	function handleLinkClick() {
		onClose();
	}

	// Get sections from items
	$: sections = items.filter((item) => isSection(item));
</script>

{#if isOpen}
	<!-- Backdrop -->
	<button
		class="fixed inset-0 z-40 bg-pitch-black-100/50"
		on:click={handleBackdropClick}
		transition:fade={{ duration: 200 }}
		aria-label="Close menu"
	></button>

	<!-- Mega Menu Panel -->
	<div
		class="absolute left-0 right-0 top-full z-50 w-full"
		transition:fly={{ y: -10, duration: 200, easing: quintOut }}
	>
		<!-- Shadow element -->
		<div class="absolute inset-0 top-1/2 shadow-lg" aria-hidden="true"></div>

		<div class="relative bg-white">
			<div class="w-full px-4 py-8 md:px-8 md:py-10">
				<!-- Sections Grid -->
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each sections as section}
						<div>
							<!-- Section Header -->
							<h3
								class="mb-4 border-b border-gray-200 pb-2 font-calluna-sans-semibold uppercase text-pitch-black-100"
							>
								{section.label}
							</h3>

							<!-- Section Items -->
							<div class="space-y-3">
								{#each section.children || [] as item}
									<a
										href={item.href}
										class="group block rounded-lg p-3 transition-colors hover:bg-off-white-100"
										on:click={handleLinkClick}
									>
										<div
											class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-mean-green-500"
										>
											{item.label}
										</div>
										{#if item.description}
											<p class="mt-1 text-sm font-calluna-sans-light text-gray-600">
												{item.description}
											</p>
										{/if}
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<!-- Quick Links -->
				<div class="mt-8 border-t border-gray-200 pt-6">
					<div class="flex flex-wrap gap-4">
						<a
							href="/faq"
							class="group flex items-center gap-3 rounded-lg bg-off-white-100 px-6 py-3 transition-all hover:bg-brick-red-500 hover:shadow-md"
							on:click={handleLinkClick}
						>
							<svg class="h-6 w-6 text-brick-red-500 transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-white">
								Pogosta Vprašanja
							</span>
						</a>

						<a
							href="/contact"
							class="group flex items-center gap-3 rounded-lg bg-off-white-100 px-6 py-3 transition-all hover:bg-mean-green-500 hover:shadow-md"
							on:click={handleLinkClick}
						>
							<svg class="h-6 w-6 text-mean-green-500 transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							<span class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-white">
								Kontakt
							</span>
						</a>

						<a
							href="/venue-rental"
							class="group flex items-center gap-3 rounded-lg bg-off-white-100 px-6 py-3 transition-all hover:bg-prototype-orange-500 hover:shadow-md"
							on:click={handleLinkClick}
						>
							<svg class="h-6 w-6 text-prototype-orange-500 transition-colors group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span class="font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-white">
								Najemi Klub KGB
							</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
