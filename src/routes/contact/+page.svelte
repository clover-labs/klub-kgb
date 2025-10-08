<script lang="ts">
	import NewsletterForm from "$lib/components/NewsletterForm.svelte";
</script>

<svelte:head>
	<title>Kontakt - Klub KGB Maribor</title>
	<meta
		name="description"
		content="Stopite v stik z Klub KGB Maribor. Smo tu za vas!"
	/>
</svelte:head>

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-prototype-orange-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-4xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl lg:text-6xl"
			>
				Kontakt
			</h1>
			<p
				class="mt-6 text-lg font-calluna-sans-light text-pitch-black-100 md:text-xl"
			>
				Imate vprašanje? Želite najeti prostor? Pišite nam!
			</p>
		</div>
	</section>

	<!-- Contact Information -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto max-w-4xl">
			<div class="grid gap-8 md:grid-cols-2">
				<!-- Contact Details -->
				<div class="space-y-6">
					<div>
						<h2
							class="text-2xl font-calluna-sans-semibold text-pitch-black-100 md:text-3xl"
						>
							Kontaktni podatki
						</h2>
						<div class="mt-6 space-y-4">
							<div class="flex items-start gap-4">
								<svg
									class="mt-1 h-6 w-6 text-mean-green-500"
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
								<div>
									<p class="font-calluna-sans-semibold text-pitch-black-100">
										Email
									</p>
									<a
										href="mailto:info@klub-kgb.si"
										class="font-calluna-sans-light text-mean-green-500 hover:underline"
									>
										info@klub-kgb.si
									</a>
								</div>
							</div>

							<div class="flex items-start gap-4">
								<svg
									class="mt-1 h-6 w-6 text-mean-green-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<div>
									<p class="font-calluna-sans-semibold text-pitch-black-100">
										Naslov
									</p>
									<p class="font-calluna-sans-light text-gray-700">
										Vojašniški trg 5
									</p>
									<p class="font-calluna-sans-light text-gray-700">
										2000 Maribor, Slovenija
									</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 class="text-xl font-calluna-sans-semibold text-pitch-black-100">
							Družbena omrežja
						</h3>
						<div class="mt-4 flex gap-4">
							<a
								href="https://www.facebook.com/klubkgbmaribor"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-lg bg-off-white-100 p-3 transition-colors hover:bg-mean-green-500"
								aria-label="Facebook"
							>
								<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
									/>
								</svg>
							</a>
							<a
								href="https://www.instagram.com/kgbmaribor/"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-lg bg-off-white-100 p-3 transition-colors hover:bg-mean-green-500"
								aria-label="Instagram"
							>
								<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
									/>
								</svg>
							</a>
							<a
								href="https://www.threads.com/@kgbmaribor"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded-lg bg-off-white-100 p-3 transition-colors hover:bg-mean-green-500"
								aria-label="Threads"
							>
								<svg
									class="h-6 w-6"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
								>
									<circle cx="12" cy="12" r="4"></circle>
									<path
										d="M16,8v5a3,3,0,0,0,3,3h0a3,3,0,0,0,3-3V12a9.87,9.87,0,0,0-.79-3.89,10,10,0,0,0-5.32-5.32,10,10,0,0,0-7.78,0A10,10,0,0,0,2.79,8.11a10,10,0,0,0,0,7.78,10,10,0,0,0,5.32,5.32,10,10,0,0,0,7.78,0"
									></path>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<!-- Contact Form Placeholder / Newsletter -->
				<div class="rounded-lg bg-off-white-100 p-6 md:p-8">
					<h3 class="text-xl font-calluna-sans-semibold text-pitch-black-100">
						Newsletter
					</h3>
					<p class="mt-2 font-calluna-sans-light text-gray-700">
						Prijavite se na naš newsletter in ostanite obveščeni o vseh
						dogodkih.
					</p>
					<div class="mt-6">
						<NewsletterForm />
					</div>
					<div class="mt-6 border-t border-gray-300 pt-6">
						<p class="text-sm font-calluna-sans-light text-gray-600">
							Za splošna vprašanja nas kontaktirajte na{" "}
							<a
								href="mailto:info@klub-kgb.si"
								class="font-calluna-sans-semibold text-mean-green-500 hover:underline"
							>
								info@klub-kgb.si
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Opening Hours / Additional Info -->
	<section class="w-full bg-off-white-100 px-4 py-12 md:px-12">
		<div class="mx-auto max-w-4xl">
			<h2
				class="text-2xl font-calluna-sans-semibold text-pitch-black-100 md:text-3xl"
			>
				Najem prostorov
			</h2>
			<p class="mt-4 font-calluna-sans-light text-gray-700 leading-relaxed">
				Klub KGB je na voljo za najem za zasebne in poslovne dogodke. Za več
				informacij in rezervacije nas kontaktirajte na tej strani.
			</p>
			<a
				href="/venue-rental"
				class="mt-6 inline-flex items-center rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-400"
			>
				Najem prostorov
			</a>
		</div>
	</section>
</main>
