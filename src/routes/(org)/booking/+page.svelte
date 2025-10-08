<script lang="ts">
	let formData = $state({
		artistName: '',
		email: '',
		phone: '',
		genre: '',
		website: '',
		socialMedia: '',
		performanceDate: '',
		message: ''
	});

	let submitStatus: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let errorMessage = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitStatus = 'submitting';
		errorMessage = '';

		try {
			const response = await fetch('/api/artist-booking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitStatus = 'success';
				// Reset form
				formData = {
					artistName: '',
					email: '',
					phone: '',
					genre: '',
					website: '',
					socialMedia: '',
					performanceDate: '',
					message: ''
				};
			} else {
				throw new Error('Failed to submit form');
			}
		} catch (error) {
			submitStatus = 'error';
			errorMessage = 'Prialo je do napake. Prosimo, poskusite znova ali nas kontaktirajte direktno.';
		}
	}
</script>

<svelte:head>
	<title>Za umetnike - Klub KGB Maribor</title>
	<meta name="description" content="Klub KGB Maribor vabi umetnike k sodelovanju. Poaljite nam svojo prijavo za nastop." />
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-mean-green-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1 class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl">
				Za umetnike
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl">
				}elite nastopiti v Klubu KGB? Vabljeni k sodelovanju!
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
						O klubu
					</h2>
					<p class="mb-4 font-calluna-sans-light text-gray-700 leading-relaxed">
						Klub KGB je od leta 1998 eden vodilnih prostorov za alternativno in neodvisno glasbo v Mariboru.
						Gostimo raznolike ~anre  od rocka, punka, metala, elektronike do jazza in eksperimentalne glasbe.
					</p>
					<p class="font-calluna-sans-light text-gray-700 leading-relaxed">
						Naa prostor je opremljen s profesionalno avdio in video opremo ter nudi intimno, a energino
						atmosfero za nastope lokalnih in mednarodnih umetnikov.
					</p>
				</div>

				<!-- What We Offer -->
				<div>
					<h3 class="mb-4 text-2xl font-calluna-sans-semibold text-pitch-black-100">
						Kaj ponujamo
					</h3>
					<div class="flex flex-col gap-4">
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Profesionalna tehnika</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									Kvalitetna zvona oprema, razsvetljava in tehnina podpora
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Zavzeto obinstvo</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									Lojalna skupnost posluaalcev in podpornikov alternativne glasbe
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Promocija dogodkov</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									Aktivna promocija preko dru~benih omre~ij in lokalnih medijev
								</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<svg class="mt-1 h-6 w-6 flex-shrink-0 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Podpora lokalnim in mednarodnim</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									Odprti za sodelovanje z lokalnimi in tujimi glasbeniki
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Application Process -->
				<div>
					<h3 class="mb-4 text-2xl font-calluna-sans-semibold text-pitch-black-100">
						Postopek prijave
					</h3>
					<ol class="flex flex-col gap-4">
						<li class="flex items-start gap-3">
							<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500 font-calluna-sans-bold text-pitch-black-100">1</span>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Izpolnite obrazec</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									Poaljite nam osnovne informacije o sebi in svoji glasbi
								</p>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500 font-calluna-sans-bold text-pitch-black-100">2</span>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Pregled prijave</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									Naaa ekipa bo pregledala vaao prijavo in glasbo
								</p>
							</div>
						</li>
						<li class="flex items-start gap-3">
							<span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500 font-calluna-sans-bold text-pitch-black-100">3</span>
							<div>
								<h4 class="font-calluna-sans-semibold text-pitch-black-100">Odgovor in dogovor</h4>
								<p class="text-sm font-calluna-sans-light text-gray-600">
									V primeru interesa vas bomo kontaktirali in se dogovorili za termin
								</p>
							</div>
						</li>
					</ol>
				</div>

				<!-- Contact Info -->
				<div class="rounded-lg bg-off-white-100 p-6">
					<h3 class="mb-4 text-xl font-calluna-sans-semibold text-pitch-black-100">
						Kontakt
					</h3>
					<div class="flex flex-col gap-3">
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							<a href="mailto:booking@klub-kgb.si" class="font-calluna-sans-light text-gray-700 hover:text-mean-green-500 transition-colors">
								booking@klub-kgb.si
							</a>
						</div>
						<div class="flex items-center gap-3">
							<svg class="h-5 w-5 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
						Prijavnica za nastop
					</h2>

					{#if submitStatus === 'success'}
						<div class="mb-6 rounded-lg bg-mean-green-500/20 p-4">
							<div class="flex items-center gap-2">
								<svg class="h-5 w-5 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<p class="font-calluna-sans-semibold text-pitch-black-100">
									Hvala za vaao prijavo!
								</p>
							</div>
							<p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
								Vaae sporoilo smo prejeli. Odgovorili vam bomo v najkrajaem mo~nem asu.
							</p>
						</div>
					{/if}

					{#if submitStatus === 'error'}
						<div class="mb-6 rounded-lg bg-brick-red-500/20 p-4">
							<div class="flex items-center gap-2">
								<svg class="h-5 w-5 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
								<p class="font-calluna-sans-semibold text-pitch-black-100">
									Napaka pri poailjanju
								</p>
							</div>
							<p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
								{errorMessage}
							</p>
						</div>
					{/if}

					<form onsubmit={handleSubmit} class="flex flex-col gap-4">
						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Ime izvajalca / benda *</span>
							<input
								type="text"
								bind:value={formData.artistName}
								required
								placeholder="Ime umetnika ali skupine"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">E-poata *</span>
							<input
								type="email"
								bind:value={formData.email}
								required
								placeholder="vaa@email.com"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Telefonska atevilka</span>
							<input
								type="tel"
								bind:value={formData.phone}
								placeholder="+386 ..."
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Glasbeni ~anr *</span>
							<input
								type="text"
								bind:value={formData.genre}
								required
								placeholder="npr. Rock, Elektronika, Jazz..."
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Spletna stran / Bandcamp</span>
							<input
								type="url"
								bind:value={formData.website}
								placeholder="https://..."
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Dru~bena omre~ja (Spotify, Instagram, Facebook...)</span>
							<input
								type="text"
								bind:value={formData.socialMedia}
								placeholder="Povezave do profilov"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">}eleni datum nastopa (okvirno)</span>
							<input
								type="date"
								bind:value={formData.performanceDate}
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100">Sporoilo *</span>
							<textarea
								bind:value={formData.message}
								required
								rows="5"
								placeholder="Povejte nam nekaj o sebi, svoji glasbi, tehnini opremi, prejanjih nastopih..."
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-mean-green-500 focus:outline-none focus:ring-2 focus:ring-mean-green-500/20"
							></textarea>
						</label>

						<button
							type="submit"
							disabled={submitStatus === 'submitting'}
							class="rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-400 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{submitStatus === 'submitting' ? 'Poailjam...' : 'Poalji prijavo'}
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
