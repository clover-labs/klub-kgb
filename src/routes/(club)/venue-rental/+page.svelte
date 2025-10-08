<script lang="ts">
	import VenueRentalSuccessModal from '$lib/components/VenueRentalSuccessModal.svelte';

	let formData = $state({
		name: '',
		email: '',
		phone: '',
		eventDate: '',
		eventType: '',
		guestCount: '',
		message: ''
	});

	let submitStatus: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let errorMessage = $state('');
	let showSuccessModal = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitStatus = 'submitting';
		errorMessage = '';

		try {
			const response = await fetch('/api/venue-rental', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitStatus = 'idle';
				showSuccessModal = true;
				// Reset form
				formData = {
					name: '',
					email: '',
					phone: '',
					eventDate: '',
					eventType: '',
					guestCount: '',
					message: ''
				};
			} else {
				throw new Error('Failed to submit form');
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Prišlo je do napake. Prosimo, poskusite znova ali nas kontaktirajte direktno.';
		}
	}
</script>

<svelte:head>
	<title>Najem prostora - Klub KGB Maribor</title>
	<meta name="description" content="Klub KGB Maribor je na voljo za najem za zasebne in poslovne dogodke. Kontaktirajte nas za več informacij." />
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-prototype-orange-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1 class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl">
				Najem prostora
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl">
				Klub KGB Maribor je na voljo za najem za zasebne in poslovne dogodke
			</p>
		</div>
	</section>

	<!-- Content Section -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
			<!-- Left Column: Information -->
			<div class="flex flex-col gap-8">
				<div>
					<h2 class="mb-4 text-3xl font-calluna-sans-bold text-pitch-black-100">
						O prostoru
					</h2>
					<p class="mb-4 font-calluna-sans-light text-gray-700 leading-relaxed">
						Klub KGB je kultni prostor v srcu Maribora, ki od leta 1998 gosti raznolike dogodke.
						Naš prostor je idealen za koncerte, zasebne zabave, poslovne dogodke, predstavitve in druge priložnosti.
					</p>
					<p class="font-calluna-sans-light text-gray-700 leading-relaxed">
						Prostor je opremljen s profesionalno avdio in video opremo ter nudi edinstveno atmosfero
						za vaš dogodek.
					</p>
				</div>

				<!-- Features -->
				<div>
					<h3 class="mb-4 text-2xl font-calluna-sans-semibold text-pitch-black-100">
						Kaj ponujamo
					</h3>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Profesionalna oprema</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">Avdio in video sistem</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Osrednja lokacija</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">Vojašniški trg 5, Maribor</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Fleksibilna ureditev</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">Prilagodljiv prostor</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Edinstvena atmosfera</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">Kultni prostor z zgodovino</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Contact Info -->
				<div class="rounded-lg bg-off-white-100 p-6">
					<h3 class="mb-4 text-xl font-calluna-sans-semibold text-pitch-black-100">
						Kontakt
					</h3>
					<div class="flex flex-col gap-3">
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							<a href="mailto:info@klub-kgb.si" class="font-calluna-sans-light text-gray-700 hover:text-brick-red-500 transition-colors">
								info@klub-kgb.si
							</a>
						</div>
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<span class="font-calluna-sans-light text-gray-700">
								Vojašniški trg 5, 2000 Maribor
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Column: Form -->
			<div>
				<div class="sticky top-24 rounded-lg bg-white p-8 shadow-lg">
					<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
						Pošljite povpraševanje
					</h2>

					{#if submitStatus === 'error'}
						<div class="mb-6 rounded-lg bg-brick-red-500/20 p-4">
							<div class="flex items-center gap-2">
								<svg class="h-5 w-5 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
								<p class="font-calluna-sans-semibold text-pitch-black-100">
									Napaka pri pošiljanju
								</p>
							</div>
							<p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
								{errorMessage}
							</p>
						</div>
					{/if}

					<form onsubmit={handleSubmit} class="flex flex-col gap-4">
						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Ime in priimek *</span>
							<input
								type="text"
								bind:value={formData.name}
								required
								placeholder="Vaše ime"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">E-pošta *</span>
							<input
								type="email"
								bind:value={formData.email}
								required
								placeholder="vaš@email.com"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Telefonska številka</span>
							<input
								type="tel"
								bind:value={formData.phone}
								placeholder="+386 ..."
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Datum dogodka</span>
							<input
								type="date"
								bind:value={formData.eventDate}
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Vrsta dogodka</span>
							<select
								bind:value={formData.eventType}
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							>
								<option value="">Izberite vrsto dogodka</option>
								<option value="concert">Koncert</option>
								<option value="party">Zasebna zabava</option>
								<option value="corporate">Poslovni dogodek</option>
								<option value="presentation">Predstavitev</option>
								<option value="other">Drugo</option>
							</select>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Pričakovano število gostov</span>
							<input
								type="number"
								bind:value={formData.guestCount}
								placeholder="npr. 50"
								min="1"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Sporočilo *</span>
							<textarea
								bind:value={formData.message}
								required
								rows="4"
								placeholder="Opišite vaš dogodek in posebne zahteve..."
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-prototype-orange-500 focus:outline-none focus:ring-2 focus:ring-prototype-orange-500/20"
							></textarea>
						</label>

						<button
							type="submit"
							disabled={submitStatus === 'submitting'}
							class="rounded-lg bg-prototype-orange-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-prototype-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{submitStatus === 'submitting' ? 'Pošiljam...' : 'Pošlji povpraševanje'}
						</button>

						<p class="text-sm font-calluna-sans-light text-gray-600">
							* Obvezna polja
						</p>
					</form>
				</div>
			</div>
		</div>
	</section>
</main>

<!-- Success Modal -->
<VenueRentalSuccessModal
	isOpen={showSuccessModal}
	onClose={() => showSuccessModal = false}
/>
