<script lang="ts">
	import NewsletterForm from "$lib/components/NewsletterForm.svelte";
</script>

<svelte:head>
	<title>O nas - Klub KGB Maribor</title>
	<meta
		name="description"
		content="Spoznajte Klub KGB Maribor - prostor, ki gosti dobre ljudi in dogodke že od leta 1998 dalje."
	/>
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-mean-green-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-4xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl"
			>
				O Klubu KGB
			</h1>
			<p class="mt-6 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl">
				Prostor, ki gosti dobre ljudi in dogodke že od leta 1998 dalje.
			</p>
		</div>
	</section>

	<!-- Content Section -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto max-w-4xl space-y-8">
			<div>
				<h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100 md:text-3xl">
					Naša zgodba
				</h2>
				<p class="mt-4 font-calluna-sans-light text-gray-700 leading-relaxed">
					Klub KGB je eden izmed najbolj prepoznavnih klubov v Mariboru, ki deluje že od leta 1998.
					V središču mesta gostimo raznolike dogodke - od koncertov in stand-up komedij do predstav in kulturnih dogodkov.
					Naš prostor je postal dom za lokalno sceno in mednarodno priznan klub, ki vabi k druženju in odkrivanju nove glasbe.
				</p>
			</div>

			<div>
				<h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100 md:text-3xl">
					Kaj ponujamo
				</h2>
				<div class="mt-4 grid gap-6 md:grid-cols-2">
					<div class="rounded-lg bg-off-white-100 p-6">
						<h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
							Koncerti
						</h3>
						<p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
							Gostimo lokalne in mednarodne izvajalce različnih žanrov.
						</p>
					</div>
					<div class="rounded-lg bg-off-white-100 p-6">
						<h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
							Stand-up komedija
						</h3>
						<p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
							Redno gostimo komike iz Slovenije in tujine za večere smeha in dobre volje.
						</p>
					</div>
					<div class="rounded-lg bg-off-white-100 p-6">
						<h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
							Kulturni dogodki
						</h3>
						<p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
							Prostor odpiramo za razstave, predstave in druge kulturne prireditve.
						</p>
					</div>
					<div class="rounded-lg bg-off-white-100 p-6">
						<h3 class="font-calluna-sans-semibold text-lg text-pitch-black-100">
							Najem prostorov
						</h3>
						<p class="mt-2 font-calluna-sans-light text-gray-700 text-sm">
							Klub je mogoče najeti za zasebne in poslovne dogodke.
						</p>
					</div>
				</div>
			</div>

			<div>
				<h2 class="text-2xl font-calluna-sans-semibold text-pitch-black-100 md:text-3xl">
					Lokacija
				</h2>
				<p class="mt-4 font-calluna-sans-light text-gray-700 leading-relaxed">
					Nahajamo se v samem središču Maribora, na Vojašniškem trgu 5.
					Prostor je lahko dostopen z javnim prevozom in v neposredni bližini parkirišč.
				</p>
				<div class="mt-4 rounded-lg bg-gray-100 p-6">
					<p class="font-calluna-sans-semibold text-pitch-black-100">Klub KGB</p>
					<p class="mt-1 font-calluna-sans-light text-gray-700">Vojašniški trg 5</p>
					<p class="font-calluna-sans-light text-gray-700">2000 Maribor, Slovenija</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="w-full bg-off-white-100 px-4 py-12 md:px-12">
		<div class="mx-auto max-w-4xl">
			<h2 class="text-3xl font-calluna-sans-semibold text-pitch-black-100">
				Ostanite obveščeni
			</h2>
			<p class="mt-2 font-calluna-sans-light text-gray-700">
				Prijavite se na naš newsletter in bodite prvi obveščeni o prihajajočih dogodkih.
			</p>
			<div class="mt-6">
				<NewsletterForm />
			</div>
		</div>
	</section>
</main>
