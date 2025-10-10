<script lang="ts">
	import TableOfContents from "$lib/components/TableOfContents.svelte";
	import type { PageData } from './$types';
	import type { FAQ } from '$lib/types';

	let { data }: { data: PageData } = $props();
	const { faqs } = data;

	// State for accordion sections
	let expandedQuestion: string | null = $state(null);
	let searchQuery: string = $state("");

	function toggleQuestion(id: string) {
		expandedQuestion = expandedQuestion === id ? null : id;
	}

	// Category metadata for display
	const categoryMeta: Record<string, { title: string; icon: string; color: string }> = {
		"dogodki": {
			title: "Dogodki",
			icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
			color: "prototype-orange"
		},
		"sedezi-mize": {
			title: "Sedeži, mize, rezervacije",
			icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
			color: "mean-green"
		},
		"nastopi-najem": {
			title: "Nastopi in najem prostora",
			icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
			color: "brick-red"
		}
	};

	// Group FAQs by category
	const faqSections = $derived.by(() => {
		const grouped = faqs.reduce((acc: any, faq: FAQ) => {
			if (!acc[faq.category]) {
				acc[faq.category] = {
					id: faq.category,
					...categoryMeta[faq.category],
					questions: []
				};
			}
			acc[faq.category].questions.push(faq);
			return acc;
		}, {});
		return Object.values(grouped);
	});

	// Most asked questions (featured FAQs)
	const mostAskedFaqs = $derived.by(() => {
		return faqs.filter((faq: FAQ) => faq.is_featured).slice(0, 4);
	});

	// Derived state for search filtering
	let filteredSections = $derived.by(() => {
		if (!searchQuery.trim()) return faqSections;

		const query = searchQuery.toLowerCase();
		return faqSections
			.map((section) => ({
				...section,
				questions: section.questions.filter(
					(q) =>
						q.question.toLowerCase().includes(query) ||
						q.answer.toLowerCase().includes(query)
				),
			}))
			.filter((section) => section.questions.length > 0);
	});

	// Form state
	let formData = $state({
		name: "",
		email: "",
		topic: "",
		question: "",
	});
	let submitStatus: "idle" | "submitting" | "success" | "error" =
		$state("idle");

	async function handleSubmit(e: Event) {
		e.preventDefault();
		submitStatus = "submitting";

		try {
			// TODO: Replace with actual API endpoint
			await new Promise((resolve) => setTimeout(resolve, 1000));
			submitStatus = "success";
			formData = { name: "", email: "", topic: "", question: "" };
		} catch (error) {
			submitStatus = "error";
		}
	}

	// Scroll to section
	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}

	// Find FAQ by slug
	function findFAQ(slug: string) {
		const faq = faqs.find((f: FAQ) => f.slug === slug);
		if (faq && faq.category) {
			const section = faqSections.find((s: any) => s.id === faq.category);
			return { section, question: faq };
		}
		return null;
	}

	// ToC sections for TableOfContents component
	const tocSections = faqSections.map((section) => ({
		id: section.id,
		title: section.title,
		color: section.color,
	}));
</script>

<svelte:head>
	<title>Pogosta vprašanja - Klub KGB Maribor</title>
	<meta
		name="description"
		content="Odgovori na najpogostejša vprašanja o dogodkih, rezervacijah, nastopih in najemu prostora v Klubu KGB Maribor"
	/>
</svelte:head>

<!-- Table of Contents -->
<TableOfContents sections={tocSections} />

<main class="flex flex-col gap-12">
	<!-- Hero Section -->
	<section class="w-full bg-brick-red-500 px-4 py-16 md:px-12 md:py-24">
		<div class="mx-auto max-w-7xl">
			<h1
				class="text-4xl font-calluna-sans-bold text-white md:text-5xl lg:text-6xl"
			>
				Pogosta vprašanja
			</h1>
			<p class="mt-4 text-lg font-calluna-sans-light text-white md:text-xl">
				Vse, kar vas zanima o Klubu KGB
			</p>
		</div>
	</section>

	<!-- Search Bar -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto max-w-4xl">
			<div class="relative">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Išči med vprašanji..."
					class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
				/>
				<svg
					class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>
		</div>
	</section>

	<!-- Combined Topics & Most Asked Questions -->
	{#if !searchQuery}
		<section class="w-full bg-off-white-100 px-4 py-12 md:px-12">
			<div class="mx-auto max-w-7xl">
				<!-- Topics -->
				<div class="mb-12">
					<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
						Teme
					</h2>
					<div class="flex flex-wrap gap-3">
						{#each faqSections as section}
							<button
								onclick={() => scrollToSection(section.id)}
								class="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow transition-all hover:shadow-lg hover:-translate-y-0.5"
							>
								<div class="rounded-full bg-{section.color}-500 p-2">
									<svg
										class="h-5 w-5 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d={section.icon}
										/>
									</svg>
								</div>
								<span class="font-calluna-sans-semibold text-pitch-black-100"
									>{section.title}</span
								>
								<span class="text-sm font-calluna-sans-light text-gray-600">
									({section.questions.length})
								</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- Most Asked Questions -->
				{#if mostAskedFaqs.length > 0}
					<div>
						<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
							Najpogostejša vprašanja
						</h2>
						<div class="grid gap-4 md:grid-cols-2">
							{#each mostAskedFaqs as faq}
								<button
									onclick={() => {
										scrollToSection(faq.category);
										setTimeout(() => toggleQuestion(faq.slug), 300);
									}}
									class="flex items-start gap-3 rounded-lg bg-white p-4 text-left shadow transition-all hover:shadow-md"
								>
									<svg
										class="mt-1 h-5 w-5 flex-shrink-0 text-brick-red-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										/>
									</svg>
									<span class="font-calluna-sans-semibold text-pitch-black-100">
										{faq.question}
									</span>
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- FAQ Sections -->
	<section class="w-full px-4 md:px-12">
		<div class="mx-auto max-w-4xl">
			{#if filteredSections.length === 0}
				<div class="rounded-lg bg-gray-50 p-12 text-center">
					<svg
						class="mx-auto mb-4 h-16 w-16 text-gray-300"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 class="mb-2 text-xl font-calluna-sans-semibold text-gray-700">
						Ni rezultatov
					</h3>
					<p class="font-calluna-sans-light text-gray-600">
						Poskusite z drugimi iskalnimi pojmi ali postavite vprašanje spodaj
					</p>
				</div>
			{:else}
				{#each filteredSections as section}
					<div id={section.id} class="mb-12 scroll-mt-24">
						<div class="mb-6 flex items-center gap-3">
							<div class="rounded-full bg-{section.color}-500 p-3">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d={section.icon}
									/>
								</svg>
							</div>
							<h2 class="text-3xl font-calluna-sans-bold text-pitch-black-100">
								{section.title}
							</h2>
						</div>

						<div class="space-y-4">
							{#each section.questions as question}
								<div class="overflow-hidden rounded-lg bg-white shadow">
									<button
										onclick={() => toggleQuestion(question.slug)}
										class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
									>
										<h3
											class="font-calluna-sans-semibold text-pitch-black-100 pr-4"
										>
											{question.question}
										</h3>
										<svg
											class="h-6 w-6 flex-shrink-0 transform text-gray-400 transition-transform {expandedQuestion ===
											question.slug
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

									{#if expandedQuestion === question.slug}
										<div class="border-t border-gray-200 bg-gray-50 p-6">
											<!-- Main Answer -->
											<div
												class="prose prose-sm max-w-none font-calluna-sans-light text-gray-700 leading-relaxed
												       prose-p:mb-4 prose-p:leading-relaxed
												       prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-ul:space-y-2
												       prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4 prose-ol:space-y-2
												       prose-li:ml-0 prose-li:pl-1
												       prose-strong:font-calluna-sans-semibold prose-strong:text-pitch-black-100
												       prose-headings:font-calluna-sans-bold prose-headings:text-pitch-black-100 prose-headings:mb-3"
												style="white-space: pre-wrap;"
											>
												{@html question.answer}
											</div>

											<!-- Callout Boxes -->
											{#if question.important_note}
												<div class="mt-4 rounded-lg bg-prototype-orange-500/20 border-l-4 border-prototype-orange-500 p-4">
													<div class="flex items-start gap-3">
														<svg class="h-6 w-6 flex-shrink-0 text-prototype-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
														</svg>
														<div class="flex-1">
															<p class="font-calluna-sans-semibold text-pitch-black-100 mb-1">Pomembno</p>
															<p class="text-sm font-calluna-sans-light text-gray-700">{question.important_note}</p>
														</div>
													</div>
												</div>
											{/if}

											{#if question.warning_note}
												<div class="mt-4 rounded-lg bg-brick-red-500/20 border-l-4 border-brick-red-500 p-4">
													<div class="flex items-start gap-3">
														<svg class="h-6 w-6 flex-shrink-0 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
														<div class="flex-1">
															<p class="font-calluna-sans-semibold text-pitch-black-100 mb-1">Opozorilo</p>
															<p class="text-sm font-calluna-sans-light text-gray-700">{question.warning_note}</p>
														</div>
													</div>
												</div>
											{/if}

											{#if question.tip_note}
												<div class="mt-4 rounded-lg bg-mean-green-500/20 border-l-4 border-mean-green-500 p-4">
													<div class="flex items-start gap-3">
														<svg class="h-6 w-6 flex-shrink-0 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
														</svg>
														<div class="flex-1">
															<p class="font-calluna-sans-semibold text-pitch-black-100 mb-1">Namig</p>
															<p class="text-sm font-calluna-sans-light text-gray-700">{question.tip_note}</p>
														</div>
													</div>
												</div>
											{/if}

											{#if question.info_note}
												<div class="mt-4 rounded-lg bg-gray-100 border-l-4 border-gray-400 p-4">
													<div class="flex items-start gap-3">
														<svg class="h-6 w-6 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
														</svg>
														<div class="flex-1">
															<p class="font-calluna-sans-semibold text-pitch-black-100 mb-1">Informacija</p>
															<p class="text-sm font-calluna-sans-light text-gray-700">{question.info_note}</p>
														</div>
													</div>
												</div>
											{/if}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</section>

	<!-- Related Pages -->
	<section class="w-full bg-off-white-100 px-4 py-12 md:px-12">
		<div class="mx-auto max-w-7xl">
			<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
				Koristne povezave
			</h2>
			<div class="flex flex-wrap gap-3">
				<a
					href="/venue-rental"
					class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow transition-all hover:shadow-lg hover:-translate-y-0.5"
				>
					<svg
						class="h-5 w-5 text-prototype-orange-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span class="font-calluna-sans-semibold text-pitch-black-100"
						>Najem prostora</span
					>
				</a>
				<a
					href="/for-artists"
					class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow transition-all hover:shadow-lg hover:-translate-y-0.5"
				>
					<svg
						class="h-5 w-5 text-mean-green-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
						/>
					</svg>
					<span class="font-calluna-sans-semibold text-pitch-black-100"
						>Za izvajalce</span
					>
				</a>
				<a
					href="/venue"
					class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 shadow transition-all hover:shadow-lg hover:-translate-y-0.5"
				>
					<svg
						class="h-5 w-5 text-brick-red-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
					<span class="font-calluna-sans-semibold text-pitch-black-100"
						>O prostoru</span
					>
				</a>
			</div>
		</div>
	</section>

	<!-- Contact Form -->
	<section class="w-full px-4 pb-12 md:px-12">
		<div class="mx-auto max-w-3xl">
			<div class="rounded-lg bg-white p-8 shadow-lg">
				<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
					Niste našli odgovora?
				</h2>

				{#if submitStatus === "success"}
					<div class="mb-6 rounded-lg bg-mean-green-500/20 p-4">
						<div class="flex items-center gap-2">
							<svg
								class="h-5 w-5 text-mean-green-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<p class="font-calluna-sans-semibold text-pitch-black-100">
								Hvala! Vaše vprašanje je bilo poslano.
							</p>
						</div>
						<p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
							Odgovorili vam bomo v najkrajšem možnem času.
						</p>
					</div>
				{/if}

				{#if submitStatus === "error"}
					<div class="mb-6 rounded-lg bg-brick-red-500/20 p-4">
						<div class="flex items-center gap-2">
							<svg
								class="h-5 w-5 text-brick-red-500"
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
							<p class="font-calluna-sans-semibold text-pitch-black-100">
								Napaka pri pošiljanju
							</p>
						</div>
						<p class="mt-2 text-sm font-calluna-sans-light text-gray-700">
							Prišlo je do napake. Prosimo, poskusite znova ali nas
							kontaktirajte direktno.
						</p>
					</div>
				{/if}

				<form onsubmit={handleSubmit} class="flex flex-col gap-4">
					<div class="grid gap-4 md:grid-cols-2">
						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100"
								>Ime *</span
							>
							<input
								type="text"
								bind:value={formData.name}
								required
								placeholder="Vaše ime"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
							/>
						</label>

						<label class="flex flex-col gap-2">
							<span class="font-calluna-sans-semibold text-pitch-black-100"
								>E-pošta *</span
							>
							<input
								type="email"
								bind:value={formData.email}
								required
								placeholder="vaš@email.com"
								class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
							/>
						</label>
					</div>

					<label class="flex flex-col gap-2">
						<span class="font-calluna-sans-semibold text-pitch-black-100"
							>Tema vprašanja *</span
						>
						<select
							bind:value={formData.topic}
							required
							class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
						>
							<option value="">Izberite temo</option>
							<option value="dogodki">Dogodki</option>
							<option value="nastop">Nastop</option>
							<option value="rezervacije">Rezervacije</option>
							<option value="drugo">Drugo</option>
						</select>
					</label>

					<label class="flex flex-col gap-2">
						<span class="font-calluna-sans-semibold text-pitch-black-100"
							>Vaše vprašanje *</span
						>
						<textarea
							bind:value={formData.question}
							required
							rows="4"
							placeholder="Opišite vaše vprašanje..."
							class="rounded-lg border border-gray-300 px-4 py-3 font-calluna-sans-light focus:border-brick-red-500 focus:outline-none focus:ring-2 focus:ring-brick-red-500/20"
						></textarea>
					</label>

					<button
						type="submit"
						disabled={submitStatus === "submitting"}
						class="rounded-lg bg-brick-red-500 px-6 py-3 font-calluna-sans-semibold text-white transition-colors hover:bg-brick-red-400 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{submitStatus === "submitting" ? "Pošiljam..." : "Pošlji vprašanje"}
					</button>

					<p class="text-sm font-calluna-sans-light text-gray-600">
						* Obvezna polja
					</p>
				</form>

				<div class="mt-6 border-t border-gray-200 pt-6">
					<p class="mb-3 font-calluna-sans-semibold text-pitch-black-100">
						Ali nas kontaktirajte direktno:
					</p>
					<div
						class="flex flex-wrap items-center gap-6 font-calluna-sans-light text-gray-700"
					>
						<div class="flex items-center gap-2">
							<svg
								class="h-5 w-5 text-brick-red-500"
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
							<span class="font-calluna-sans-semibold">Splošna vprašanja:</span>
							<a
								href="mailto:info@klub-kgb.si"
								class="text-brick-red-500 hover:underline"
							>
								info@klub-kgb.si
							</a>
						</div>
						<div class="flex items-center gap-2">
							<svg
								class="h-5 w-5 text-brick-red-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								/>
							</svg>
							<span class="font-calluna-sans-semibold">Booking:</span>
							<a
								href="mailto:booking@klub-kgb.si"
								class="text-brick-red-500 hover:underline"
							>
								booking@klub-kgb.si
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
