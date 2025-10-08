<script lang="ts">
	import TableOfContents from '$lib/components/TableOfContents.svelte';

	let expandedSection: string | null = $state(null);

	function toggleSection(section: string) {
		expandedSection = expandedSection === section ? null : section;
	}

	// ToC sections for TableOfContents component
	const tocSections = [
		{ id: 'osnovno', title: 'Osnovno', color: 'mean-green' },
		{ id: 'arrival', title: 'Prihod in logistika', color: 'prototype-orange' },
		{ id: 'access', title: 'Dostop do kluba', color: 'brick-red' },
		{ id: 'pre-event', title: 'Pred dogodkom', color: 'mean-green' },
		{ id: 'soundcheck', title: 'Tonska vaja', color: 'prototype-orange' },
		{ id: 'during-after', title: 'Med in po dogodku', color: 'brick-red' }
	];
</script>

<svelte:head>
	<title>Za nastopajoče - Klub KGB Maribor</title>
	<meta name="description" content="Informacije za nastopajoče v Klubu KGB Maribor - logistika, dostop, tehnične informacije" />
</svelte:head>

<!-- Table of Contents -->
<TableOfContents sections={tocSections} />

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-mean-green-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1 class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl">
				Za nastopajoče
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl">
				Komaj čakamo na tvoj nastop! Tukaj najdete vse pomembne informacije.
			</p>
		</div>
	</section>

	<!-- Basic Info -->
	<section id="osnovno" class="w-full px-4 md:px-12 scroll-mt-24">
		<div class="mx-auto max-w-5xl">
			<div class="mb-8 rounded-lg bg-mean-green-500/10 p-8">
				<h2 class="mb-4 text-3xl font-calluna-sans-bold text-pitch-black-100">
					Osnovno o Klubu KGB
				</h2>
			</div>

			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<div class="mb-3 flex items-center gap-3">
						<svg class="h-6 w-6 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<h3 class="font-calluna-sans-bold text-pitch-black-100">Obratovalni čas</h3>
					</div>
					<p class="font-calluna-sans-light text-gray-700">TOR-ČET: 19:00 - 00:00</p>
					<p class="font-calluna-sans-light text-gray-700">PET-SOB: 19:00 - 02:00</p>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-lg">
					<div class="mb-3 flex items-center gap-3">
						<svg class="h-6 w-6 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<h3 class="font-calluna-sans-bold text-pitch-black-100">Lokacija</h3>
					</div>
					<p class="font-calluna-sans-light text-gray-700">Vojašniški trg 5, 2000 Maribor</p>
					<p class="text-sm font-calluna-sans-light text-gray-600">Peš cona, staro mestno jedro</p>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-lg">
					<div class="mb-3 flex items-center gap-3">
						<svg class="h-6 w-6 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
						</svg>
						<h3 class="font-calluna-sans-bold text-pitch-black-100">Kapaciteta</h3>
					</div>
					<p class="font-calluna-sans-light text-gray-700">75 (sedeče)</p>
					<p class="font-calluna-sans-light text-gray-700">100 (stoječe)</p>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-lg">
					<div class="mb-3 flex items-center gap-3">
						<svg class="h-6 w-6 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
						<h3 class="font-calluna-sans-bold text-pitch-black-100">Okolica</h3>
					</div>
					<p class="text-sm font-calluna-sans-light text-gray-700">
						Kletni prostori večstanovanjske hiše - dostop skozi skupni hodnik
					</p>
				</div>
			</div>

			<div class="mt-6 rounded-lg bg-yellow-50 p-6">
				<div class="flex items-start gap-3">
					<svg class="mt-1 h-6 w-6 flex-shrink-0 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
					<div class="font-calluna-sans-light text-gray-800">
						<p class="mb-2"><strong class="font-calluna-sans-semibold">Pomembno:</strong></p>
						<ul class="list-disc space-y-1 pl-5 text-sm">
							<li>V skupnem hodniku se ne zadržujemo (brez pogovorov, kajenja, telefonskih klicev)</li>
							<li>Klub je v kleti - ni mobilnega signala</li>
							<li>WiFi za goste ni na voljo (samo počasna povezava za blagajno)</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Accordion Sections -->
	<section class="w-full bg-off-white-100 px-4 py-12 md:px-12">
		<div class="mx-auto max-w-5xl">
			<div class="flex flex-col gap-4">
				<!-- 1. Prihod in logistika -->
				<div id="arrival" class="overflow-hidden rounded-lg bg-white shadow-lg scroll-mt-24">
					<button
						onclick={() => toggleSection('arrival')}
						class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
					>
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500">
								<span class="text-xl font-calluna-sans-bold text-pitch-black-100">1</span>
							</div>
							<h3 class="text-xl font-calluna-sans-bold text-pitch-black-100">
								Prihod in logistika
							</h3>
						</div>
						<svg
							class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection === 'arrival' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if expandedSection === 'arrival'}
						<div class="border-t border-gray-200 p-6">
							<div class="space-y-6 font-calluna-sans-light text-gray-700">
								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Prihod</h4>
									<p>Predlagamo prihod <strong>2 uri pred odprtjem</strong> kluba, tj. cca ob <strong>17:00 uri</strong>.</p>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Vstop v peš cono</h4>
									<p class="mb-2">V peš cono lahko vstopimo preko določenih mest, kjer so potopni stebrički:</p>
									<ul class="list-disc space-y-1 pl-5">
										<li>Predhodno kontaktirajte osebje kluba za spust stebričkov</li>
										<li>Ena dovolilnica velja za vse avte</li>
										<li>V peš coni lahko ostanete <strong>max. 15 minut</strong></li>
									</ul>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Raztovorjenje</h4>
									<p>Osebje kluba bo prineslo dovolilnico za vstop v peš cono. Raztovorite opremo in se z avti umaknite iz peš cone po isti poti.</p>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Parkiranje</h4>
									<p>Priporočamo parkiranje v <a href="https://maps.app.goo.gl/aUsYqbQd9iVwsAoc9" target="_blank" rel="noopener noreferrer" class="text-mean-green-500 underline hover:text-mean-green-400">Parkirni hiši Lent</a>.</p>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- 2. Dostop -->
				<div id="access" class="overflow-hidden rounded-lg bg-white shadow-lg scroll-mt-24">
					<button
						onclick={() => toggleSection('access')}
						class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
					>
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500">
								<span class="text-xl font-calluna-sans-bold text-pitch-black-100">2</span>
							</div>
							<h3 class="text-xl font-calluna-sans-bold text-pitch-black-100">
								Dostop do kluba
							</h3>
						</div>
						<svg
							class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection === 'access' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if expandedSection === 'access'}
						<div class="border-t border-gray-200 p-6">
							<div class="space-y-6 font-calluna-sans-light text-gray-700">
								<div>
									<h4 class="mb-3 font-calluna-sans-semibold text-pitch-black-100">Lokacije vstopa (stebrički):</h4>
									<ul class="list-disc space-y-2 pl-5">
										<li><a href="https://maps.app.goo.gl/QvCVt7WXQdMsJfa48" target="_blank" rel="noopener noreferrer" class="text-mean-green-500 underline hover:text-mean-green-400">Koroška cesta</a></li>
										<li><a href="https://maps.app.goo.gl/hhHU44g3XMnuaWY36" target="_blank" rel="noopener noreferrer" class="text-mean-green-500 underline hover:text-mean-green-400">Lent, promenada</a></li>
									</ul>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Pot od Koroške ceste:</h4>
									<ol class="list-decimal space-y-1 pl-5 text-sm">
										<li>Naravnost po Koroški cesti (smer proti kužnemu znamenju)</li>
										<li>Pri zgradbi Optika ArmaMaxa → zavijete desno</li>
										<li>Na koncu ulice → zavijete desno</li>
										<li>Nadaljujete do izveska "KGB Music club" (na levi)</li>
									</ol>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Pot od Lenta:</h4>
									<ol class="list-decimal space-y-1 pl-5 text-sm">
										<li>Naravnost po promenadi (smer proti Rdečemu mostu)</li>
										<li>Pri Stari trti → zavijete desno</li>
										<li>Nato zavijete levo na ozko ulico, ki se vzpenja</li>
										<li>Nadaljujete naravnost in prispete na Vojašniški trg</li>
										<li>Peljete se do izveska "KGB Music club" (na levi)</li>
									</ol>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- 3. Pred dogodkom -->
				<div id="pre-event" class="overflow-hidden rounded-lg bg-white shadow-lg scroll-mt-24">
					<button
						onclick={() => toggleSection('before')}
						class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
					>
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500">
								<span class="text-xl font-calluna-sans-bold text-pitch-black-100">3</span>
							</div>
							<h3 class="text-xl font-calluna-sans-bold text-pitch-black-100">
								Pred dogodkom
							</h3>
						</div>
						<svg
							class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection === 'before' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if expandedSection === 'before'}
						<div class="border-t border-gray-200 p-6">
							<div class="space-y-6 font-calluna-sans-light text-gray-700">
								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Guestlista</h4>
									<ul class="list-disc space-y-1 pl-5">
										<li>Pošljite <strong>ime in priimek</strong> vsake povabljene osebe</li>
										<li>Specificirajte: prost vstop ali plačilo karte</li>
										<li>Rok: <strong>najkasneje 48 ur pred dogodkom</strong></li>
									</ul>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Pijača - nastopajoči</h4>
									<ul class="list-disc space-y-1 pl-5">
										<li>Vsak nastopajoči: 2 brezplačni pijači (ena lahko žgana)</li>
										<li>Ne-nastopajoči spremljevalci: 1 pijača</li>
										<li>Seznam spremljevalcev: <strong>najkasneje na tonski vaji</strong></li>
										<li>Naročilo pri gostitelju pred koncertom</li>
									</ul>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Prodaja kart</h4>
									<p>Na vhodu prodajamo karte <strong>izključno z gotovino</strong> - prosimo za točen znesek.</p>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Rezervacije miz</h4>
									<p class="mb-2">Za skupine <strong>več kot 5 oseb</strong>:</p>
									<ul class="list-disc space-y-1 pl-5">
										<li>Rezervacije: info@klub-kgb.si</li>
										<li>Rok: <strong>najkasneje 48 ur pred dogodkom</strong></li>
										<li>Pri koncertih: navadne mize zamenjamo za stoječe (brez stolov)</li>
									</ul>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- 4. Tonska vaja -->
				<div id="soundcheck" class="overflow-hidden rounded-lg bg-white shadow-lg scroll-mt-24">
					<button
						onclick={() => toggleSection('soundcheck')}
						class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
					>
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500">
								<span class="text-xl font-calluna-sans-bold text-pitch-black-100">4</span>
							</div>
							<h3 class="text-xl font-calluna-sans-bold text-pitch-black-100">
								Tonska vaja do pričetka
							</h3>
						</div>
						<svg
							class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection === 'soundcheck' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if expandedSection === 'soundcheck'}
						<div class="border-t border-gray-200 p-6">
							<div class="space-y-6 font-calluna-sans-light text-gray-700">
								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Časovnica</h4>
									<ul class="list-disc space-y-1 pl-5">
										<li><strong>17:30</strong>: Začetek tonske vaje (1h30min pred odprtjem)</li>
										<li><strong>19:00</strong>: Odprtje vrat za obiskovalce</li>
										<li><strong>20:00</strong>: Pričetek koncerta (standardno)</li>
									</ul>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Vstopnice</h4>
									<p class="mb-2">Osebje Kluba KGB bo preverjalo in prodajalo vstopnice:</p>
									<ul class="list-disc space-y-1 pl-5">
										<li>Validacija: preko mobilne aplikacije Olaii (QR koda)</li>
										<li>Prodaja: samo gotovina, račun velja kot vstopnica</li>
										<li>Trajanje: do 30 min po začetku prireditve</li>
									</ul>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Backstage</h4>
									<p class="mb-2">Klub KGB nima ločenega backstage prostora:</p>
									<ul class="list-disc space-y-1 pl-5">
										<li>Odlaganje stvari: ob straneh odra (ločeno z zaveso) ali v skladišču</li>
										<li>Preoblačenje: v majhnem predprostoru ob vhodu</li>
									</ul>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<!-- 5. Med in po dogodku -->
				<div id="during-after" class="overflow-hidden rounded-lg bg-white shadow-lg scroll-mt-24">
					<button
						onclick={() => toggleSection('during')}
						class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
					>
						<div class="flex items-center gap-4">
							<div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-prototype-orange-500">
								<span class="text-xl font-calluna-sans-bold text-pitch-black-100">5</span>
							</div>
							<h3 class="text-xl font-calluna-sans-bold text-pitch-black-100">
								Med in po dogodku
							</h3>
						</div>
						<svg
							class="h-6 w-6 transform text-gray-400 transition-transform {expandedSection === 'during' ? 'rotate-180' : ''}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{#if expandedSection === 'during'}
						<div class="border-t border-gray-200 p-6">
							<div class="space-y-6 font-calluna-sans-light text-gray-700">
								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Strežba med dogodkom</h4>
									<p>Natakarji bodo hodili med obiskovalce in stregli pijačo. Če ne želite strežbe, nas obvestite za prilagoditev.</p>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Skupen prostor</h4>
									<p>Klub je enoten prostor brez zamejitev - prihod na/odhod z odra bo iz občinstva.</p>
								</div>

								<div>
									<h4 class="mb-2 font-calluna-sans-semibold text-pitch-black-100">Glasnost med dogodkom</h4>
									<p class="mb-2">Pričakujte določeno glasnost zaradi:</p>
									<ul class="list-disc space-y-1 pl-5">
										<li>Strežba: hladilniki, ledomat</li>
										<li>Prostor: ventilacijski sistem, skladiščne aktivnosti</li>
									</ul>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="w-full px-4 pb-12 md:px-12">
		<div class="mx-auto max-w-5xl">
			<div class="rounded-lg bg-brick-red-500 p-8 text-white">
				<h3 class="mb-4 text-2xl font-calluna-sans-bold">
					Imate vprašanja?
				</h3>
				<p class="mb-6 font-calluna-sans-light">
					Če smo karkoli pozabili ali imate dodatna vprašanja, nam pišite:
				</p>
				<div class="flex flex-col gap-3">
					<a href="mailto:booking@klub-kgb.si" class="flex items-center gap-3 font-calluna-sans-semibold hover:underline">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						booking@klub-kgb.si
					</a>
				</div>
			</div>
		</div>
	</section>
</main>
