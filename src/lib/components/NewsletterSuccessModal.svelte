<script lang="ts">
	interface Props {
		isOpen: boolean;
		onClose: () => void;
	}

	let { isOpen, onClose }: Props = $props();

	// Handle body scroll lock
	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	});

	// Handle escape key
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4"
		onclick={(e) => e.target === e.currentTarget && onClose()}
	>
		<div
			class="relative w-full max-w-md rounded-lg bg-white shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Close Button -->
			<button
				onclick={onClose}
				class="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-gray-100"
				aria-label="Zapri"
			>
				<svg
					class="h-6 w-6 text-gray-600"
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

			<!-- Modal Content -->
			<div class="p-8 text-center">
				<!-- Success Icon -->
				<div
					class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-mean-green-500/10"
				>
					<svg
						class="h-10 w-10 text-mean-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>

				<!-- Heading -->
				<h2 class="mb-4 text-2xl font-calluna-sans-bold text-pitch-black-100">
					Uspešno ste se prijavili!
				</h2>

				<!-- Message -->
				<div class="mb-6 space-y-3 font-calluna-sans-light text-gray-700">
					<p>Hvala za prijavo na naš newsletter!</p>
					<p>
						Prosimo, <strong class="font-calluna-sans-semibold"
							>preverite vaš e-poštni predal</strong
						> (ali spam mapo) za potrditveno sporočilo in sledite navodilom za dokončanje
						prijave.
					</p>
				</div>

				<!-- Email Icon with Tip -->
				<div class="mb-6 rounded-lg bg-prototype-orange-500/10 p-4">
					<div class="flex items-start gap-3">
						<svg
							class="h-6 w-6 flex-shrink-0 text-prototype-orange-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<p class="text-sm font-calluna-sans-light text-gray-700">
							Če sporočila ne najdete, preverite mapo <strong
								class="font-calluna-sans-semibold">spam/neželena pošta</strong
							>.
						</p>
					</div>
				</div>

				<!-- Close Button -->
				<button
					onclick={onClose}
					class="w-full rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-600"
				>
					V redu
				</button>
			</div>
		</div>
	</div>
{/if}
