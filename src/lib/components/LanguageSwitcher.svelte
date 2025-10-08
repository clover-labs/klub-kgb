<script lang="ts">
	import { page } from '$app/stores';
	import { languageTag } from '$lib/paraglide/runtime';

	const languages = [
		{ code: 'sl', label: 'Slovenščina' },
		{ code: 'en', label: 'English' }
	];

	let isOpen = $state(false);

	// Get current language
	let currentLang = $derived(languageTag());

	// Function to switch language
	function switchLanguage(newLang: string) {
		if (newLang === currentLang) return;

		const currentPath = $page.url.pathname;
		let newPath: string;

		if (newLang === 'en') {
			// Switch to English: add /en prefix
			const cleanPath = currentPath.replace(/^\/en/, '');
			newPath = `/en${cleanPath || '/'}`;
		} else {
			// Switch to Slovenian: remove /en prefix
			newPath = currentPath.replace(/^\/en/, '') || '/';
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
		if (!target.closest('.language-switcher')) {
			closeDropdown();
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div class="language-switcher relative">
	<!-- Globe Icon Button -->
	<button
		onclick={toggleDropdown}
		class="flex items-center justify-center rounded-lg p-2 text-pitch-black-100 transition-colors hover:bg-off-white-100"
		aria-label="Select language"
		aria-expanded={isOpen}
	>
		<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute right-0 top-full mt-2 w-40 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
		>
			<div class="py-1" role="menu">
				{#each languages as lang}
					<button
						onclick={() => switchLanguage(lang.code)}
						class="flex w-full items-center px-4 py-2 text-left font-calluna-sans-light text-sm text-pitch-black-100 transition-colors hover:bg-off-white-100 {lang.code ===
						currentLang
							? 'font-calluna-sans-semibold bg-off-white-100'
							: ''}"
						role="menuitem"
					>
						{lang.label}
						{#if lang.code === currentLang}
							<svg class="ml-auto h-4 w-4 text-mean-green-500" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
