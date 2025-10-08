<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { TocSection } from '$lib/utils/toc';
	import { observeSections, scrollToSection, flattenSections } from '$lib/utils/toc';

	interface Props {
		sections: TocSection[];
		variant?: 'sidebar' | 'fab';
	}

	let { sections, variant = $bindable('sidebar') }: Props = $props();

	// State
	let activeSection = $state('');
	let isOpen = $state(false);
	let isMobile = $state(false);
	let observer: IntersectionObserver | null = null;

	// Flatten sections for IDs
	const flatSections = $derived(flattenSections(sections));
	const sectionIds = $derived(flatSections.map((s) => s.id));

	// Check screen size
	function checkScreenSize() {
		isMobile = window.innerWidth < 1024; // lg breakpoint
		variant = isMobile ? 'fab' : 'sidebar';
	}

	// Handle section click
	function handleSectionClick(sectionId: string) {
		scrollToSection(sectionId, 100);
		if (variant === 'fab') {
			isOpen = false;
		}
	}

	// Toggle FAB menu
	function toggleMenu() {
		isOpen = !isOpen;
	}

	// Close menu on backdrop click
	function handleBackdropClick() {
		isOpen = false;
	}

	// Find section by ID
	function findSection(id: string): TocSection | undefined {
		return flatSections.find((s) => s.id === id);
	}

	// Lifecycle
	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		// Set up intersection observer
		observer = observeSections(sectionIds, (activeSectionId) => {
			activeSection = activeSectionId;
		});

		// Set initial active section
		const firstSection = document.getElementById(sectionIds[0]);
		if (firstSection && firstSection.getBoundingClientRect().top < 200) {
			activeSection = sectionIds[0];
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', checkScreenSize);
		}
		if (observer) {
			observer.disconnect();
		}
	});
</script>

{#if variant === 'sidebar'}
	<!-- Desktop Sidebar ToC -->
	<aside
		class="fixed right-8 top-32 z-30 hidden max-h-[calc(100vh-200px)] w-64 overflow-y-auto rounded-lg bg-white p-6 shadow-lg lg:block"
	>
		<h3 class="mb-4 border-b border-gray-200 pb-2 font-calluna-sans-bold text-pitch-black-100">
			Vsebina
		</h3>
		<nav>
			<ul class="space-y-2">
				{#each sections as section}
					<li>
						<button
							onclick={() => handleSectionClick(section.id)}
							class="group flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition-all {activeSection ===
							section.id
								? 'bg-' + (section.color || 'brick-red') + '-500/10'
								: 'hover:bg-gray-50'}"
						>
							<!-- Active indicator -->
							<div
								class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition-all {activeSection ===
								section.id
									? 'bg-' + (section.color || 'brick-red') + '-500'
									: 'bg-gray-300 group-hover:bg-gray-400'}"
							></div>

							<span
								class="text-sm font-calluna-sans-light transition-colors {activeSection ===
								section.id
									? 'font-calluna-sans-semibold text-pitch-black-100'
									: 'text-gray-600 group-hover:text-pitch-black-100'}"
							>
								{section.title}
							</span>
						</button>

						<!-- Subsections -->
						{#if section.subsections && section.subsections.length > 0}
							<ul class="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
								{#each section.subsections as subsection}
									<li>
										<button
											onclick={() => handleSectionClick(subsection.id)}
											class="group flex w-full items-start gap-2 rounded px-2 py-1 text-left transition-colors {activeSection ===
											subsection.id
												? 'text-pitch-black-100'
												: 'text-gray-500 hover:text-pitch-black-100'}"
										>
											<span
												class="text-xs font-calluna-sans-light {activeSection === subsection.id
													? 'font-calluna-sans-semibold'
													: ''}"
											>
												{subsection.title}
											</span>
										</button>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{:else if variant === 'fab'}
	<!-- Mobile FAB + Popover ToC -->
	<div class="fixed bottom-6 right-6 z-40 lg:hidden">
		<!-- Backdrop -->
		{#if isOpen}
			<button
				onclick={handleBackdropClick}
				class="fixed inset-0 bg-pitch-black-100/30"
				aria-label="Close menu"
			></button>
		{/if}

		<!-- Popover Menu -->
		{#if isOpen}
			<div
				class="absolute bottom-16 right-0 w-64 max-h-96 overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
			>
				<h3
					class="mb-4 border-b border-gray-200 pb-2 font-calluna-sans-bold text-pitch-black-100"
				>
					Vsebina
				</h3>
				<nav>
					<ul class="space-y-2">
						{#each sections as section}
							<li>
								<button
									onclick={() => handleSectionClick(section.id)}
									class="group flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition-all {activeSection ===
									section.id
										? 'bg-' + (section.color || 'brick-red') + '-500/10'
										: 'hover:bg-gray-50'}"
								>
									<div
										class="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full transition-all {activeSection ===
										section.id
											? 'bg-' + (section.color || 'brick-red') + '-500'
											: 'bg-gray-300 group-hover:bg-gray-400'}"
									></div>

									<span
										class="text-sm font-calluna-sans-light transition-colors {activeSection ===
										section.id
											? 'font-calluna-sans-semibold text-pitch-black-100'
											: 'text-gray-600 group-hover:text-pitch-black-100'}"
									>
										{section.title}
									</span>
								</button>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		{/if}

		<!-- FAB Button -->
		<button
			onclick={toggleMenu}
			class="flex h-14 w-14 items-center justify-center rounded-full bg-brick-red-500 text-white shadow-lg transition-all hover:bg-brick-red-400 hover:shadow-xl active:scale-95"
			aria-label="Toggle table of contents"
		>
			{#if isOpen}
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			{:else}
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			{/if}
		</button>
	</div>
{/if}
