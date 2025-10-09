<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { isPastEvent, getDaysUntilEvent, generateEventUrl } from '$lib/utils/slug';
	import ReservationModal from '$lib/components/ReservationModal.svelte';
	import NewsletterForm from '$lib/components/NewsletterForm.svelte';

	let { data }: { data: PageData } = $props();
	const { event, referrer, relatedEvents } = data;

	const isEventPast = isPastEvent(event.event_date);
	const daysUntil = getDaysUntilEvent(event.event_date);

	// Scroll to top after navigation
	afterNavigate(() => {
		window.scrollTo({ top: 0, behavior: 'instant' });
	});

	// Calendar dropdown state
	let isCalendarDropdownOpen = $state(false);

	function toggleCalendarDropdown() {
		isCalendarDropdownOpen = !isCalendarDropdownOpen;
	}

	function closeCalendarDropdown() {
		isCalendarDropdownOpen = false;
	}

	// Reservation modal state
	let isReservationModalOpen = $state(false);

	function openReservationModal() {
		isReservationModalOpen = true;
	}

	function closeReservationModal() {
		isReservationModalOpen = false;
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('sl-SI', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function getImageUrl(imageId: string): string {
		return `https://cms.cloverlabs.dev/assets/${imageId}`;
	}

	function getFallbackImage(): string {
		return '/placeholder-image-large.svg';
	}

	function goBack() {
		if (referrer && referrer !== '/') {
			goto(referrer);
		} else {
			window.history.back();
		}
	}

	function shareEvent() {
		if (navigator.share) {
			navigator.share({
				title: event.title,
				text: event.description,
				url: window.location.href
			});
		}
	}

	// Calendar helper functions
	function formatICSDate(date: Date): string {
		return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
	}

	function formatGoogleDate(date: Date): string {
		return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
	}

	function addToGoogleCalendar() {
		const eventDate = new Date(event.event_date);
		const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

		const calendarTitle = `KGB: ${event.title}`;
		const calendarDescription = [
			`Klub KGB: ${event.title}`,
			'',
			event.description || '',
			'',
			event.link ? `Karte na voljo: ${event.link}` : '',
			`Več informacij na voljo: https://klub-kgb.si${typeof window !== 'undefined' ? window.location.pathname : ''}`
		].filter(line => line !== '').join('\n');

		const params = new URLSearchParams({
			action: 'TEMPLATE',
			text: calendarTitle,
			details: calendarDescription,
			location: 'Klub KGB Maribor, Vojašniški trg 5, 2000 Maribor',
			dates: `${formatGoogleDate(eventDate)}/${formatGoogleDate(endDate)}`
		});

		window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
		closeCalendarDropdown();
	}

	function addToOutlookCalendar() {
		const eventDate = new Date(event.event_date);
		const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

		const calendarTitle = `KGB: ${event.title}`;
		const calendarDescription = [
			`Klub KGB: ${event.title}`,
			'',
			event.description || '',
			'',
			event.link ? `Karte na voljo: ${event.link}` : '',
			`Več informacij na voljo: https://klub-kgb.si${typeof window !== 'undefined' ? window.location.pathname : ''}`
		].filter(line => line !== '').join('\n');

		const params = new URLSearchParams({
			path: '/calendar/action/compose',
			rru: 'addevent',
			subject: calendarTitle,
			body: calendarDescription,
			location: 'Klub KGB Maribor, Vojašniški trg 5, 2000 Maribor',
			startdt: eventDate.toISOString(),
			enddt: endDate.toISOString()
		});

		window.open(`https://outlook.live.com/calendar/0/action/compose?${params.toString()}`, '_blank');
		closeCalendarDropdown();
	}

	function downloadICS() {
		const eventDate = new Date(event.event_date);
		const endDate = new Date(eventDate.getTime() + 3 * 60 * 60 * 1000);

		const calendarTitle = `KGB: ${event.title}`;
		const calendarDescription = [
			`Klub KGB: ${event.title}`,
			'',
			event.description || '',
			'',
			event.link ? `Karte na voljo: ${event.link}` : '',
			`Več informacij na voljo: https://klub-kgb.si${typeof window !== 'undefined' ? window.location.pathname : ''}`
		].filter(line => line !== '').join('\\n');

		const icsContent = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//Klub KGB//Event//EN',
			'BEGIN:VEVENT',
			`DTSTART:${formatICSDate(eventDate)}`,
			`DTEND:${formatICSDate(endDate)}`,
			`SUMMARY:${calendarTitle}`,
			`DESCRIPTION:${calendarDescription}`,
			`LOCATION:Klub KGB Maribor, Vojašniški trg 5, 2000 Maribor`,
			`URL:https://klub-kgb.si${typeof window !== 'undefined' ? window.location.pathname : ''}`,
			'END:VEVENT',
			'END:VCALENDAR'
		].join('\r\n');

		const blob = new Blob([icsContent], { type: 'text/calendar' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${event.title.replace(/[^a-z0-9]/gi, '-')}.ics`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
		closeCalendarDropdown();
	}

</script>

<svelte:head>
	<title>{event.title} - Klub KGB Maribor</title>
	<meta name="description" content={event.description} />
	<meta property="og:title" content={event.title} />
	<meta property="og:description" content={event.description} />
	{#if event.image}
		<meta property="og:image" content={getImageUrl(event.image)} />
	{/if}
</svelte:head>

<main class="min-h-screen bg-off-white-100">
	<!-- Breadcrumbs + Back Button -->
	<div class="w-full border-b border-gray-200 bg-white px-4 py-4 md:px-12">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<!-- Back Button -->
			<button
				onclick={goBack}
				class="inline-flex items-center gap-2 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:text-mean-green-500"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Nazaj
			</button>

			<!-- Breadcrumbs -->
			<nav class="hidden items-center gap-2 text-sm font-calluna-sans-light md:flex">
				<a href="/" class="text-gray-600 transition-colors hover:text-mean-green-500">Domov</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<a href={isEventPast ? '/events/archive' : '/events/upcoming'} class="text-gray-600 transition-colors hover:text-mean-green-500">
					{isEventPast ? 'Arhiv' : 'Prihajajoči dogodki'}
				</a>
				<svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<span class="text-pitch-black-100">{event.title}</span>
			</nav>
		</div>
	</div>

	<!-- Event Content -->
	<div class="mx-auto max-w-5xl px-4 py-8 md:px-12 md:py-12">
		<article class="overflow-hidden rounded-lg bg-white shadow-lg">
			<!-- Hero Image -->
			{#if event.image}
				<div class="relative h-96 w-full overflow-hidden rounded-t-lg bg-off-white-100">
					<img
						src={getImageUrl(event.image)}
						alt={event.title}
						class="h-full w-full object-contain"
						onerror={(e) => {
							const target = e.target;
							if (target && target instanceof HTMLImageElement) {
								target.src = getFallbackImage();
							}
						}}
					/>
					<!-- Status Badge -->
					<div class="absolute right-4 top-4">
						{#if isEventPast}
							<span class="rounded-full bg-gray-600 px-4 py-2 font-calluna-sans-semibold text-sm text-white shadow-lg">
								Pretekli dogodek
							</span>
						{:else if daysUntil <= 7 && daysUntil > 0}
							<span class="rounded-full bg-brick-red-500 px-4 py-2 font-calluna-sans-semibold text-sm text-white shadow-lg">
								Čez {daysUntil} {daysUntil === 1 ? 'dan' : daysUntil === 2 ? 'dneva' : 'dni'}
							</span>
						{:else if daysUntil === 0}
							<span class="animate-pulse rounded-full bg-mean-green-500 px-4 py-2 font-calluna-sans-semibold text-sm text-pitch-black-100 shadow-lg">
								Danes!
							</span>
						{/if}
					</div>
				</div>
			{/if}

			<!-- Event Header -->
			<div class="border-b border-gray-200 p-8 md:p-12">
				<time class="mb-4 block text-sm font-calluna-sans-semibold uppercase tracking-wide text-mean-green-500">
					{formatDate(event.event_date)}
				</time>

				<h1 class="mb-4 text-4xl font-calluna-sans-bold text-pitch-black-100 md:text-5xl">
					{event.title}
				</h1>

				<p class="text-xl font-calluna-sans-light text-gray-700">
					{event.description}
				</p>

				<!-- Desktop CTAs -->
				<div class="mt-6 hidden gap-3 md:flex">
					{#if !isEventPast}
						<button
							onclick={openReservationModal}
							class="inline-flex items-center gap-2 rounded-lg bg-mean-green-500 px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-600"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
							</svg>
							Rezerviraj mizo
						</button>
					{/if}
					{#if event.link}
						<a
							href={event.link}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 rounded-lg bg-brick-red-500 px-6 py-3 font-calluna-sans-semibold text-white transition-colors hover:bg-brick-red-900"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
							</svg>
							{isEventPast ? 'Več informacij' : 'Kupi vstopnico'}
						</a>
					{/if}
						<div class="relative">
							<button
								onclick={toggleCalendarDropdown}
								class="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:border-mean-green-500 hover:text-mean-green-500"
							>
								<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								Dodaj v koledar
								<svg class="h-4 w-4 transition-transform {isCalendarDropdownOpen ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							{#if isCalendarDropdownOpen}
								<!-- Backdrop -->
								<!-- svelte-ignore a11y_consider_explicit_label -->
								<button
									onclick={closeCalendarDropdown}
									class="fixed inset-0 z-40"
									aria-label="Close calendar dropdown"
								></button>

								<!-- Dropdown Menu -->
								<div class="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5">
									<div class="py-1">
										<button
											onclick={addToGoogleCalendar}
											class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
										>
											<svg class="h-5 w-5 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											<span>Google Calendar</span>
										</button>

										<button
											onclick={addToOutlookCalendar}
											class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
										>
											<svg class="h-5 w-5 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
											</svg>
											<span>Outlook Calendar</span>
										</button>

										<button
											onclick={downloadICS}
											class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
										>
											<svg class="h-5 w-5 text-prototype-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
											</svg>
											<span>Prenesi ICS</span>
										</button>
									</div>
								</div>
							{/if}
						</div>
					<button
						onclick={shareEvent}
						class="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:border-prototype-orange-500 hover:text-prototype-orange-500"
					>
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
						</svg>
						Deli
					</button>
				</div>
			</div>

			<!-- Event Content -->
			{#if event.content}
				<div class="prose prose-lg max-w-none p-8 font-calluna-sans-light md:p-12">
					{@html event.content}
				</div>
			{:else}
				<div class="p-8 md:p-12">
					<p class="font-calluna-sans-light text-gray-600">
						{#if isEventPast}
							Več informacij o tem dogodku bo kmalu na voljo.
						{:else}
							Več informacij o dogodku bo objavljenih kmalu. Za nakup vstopnic uporabite gumb zgoraj.
						{/if}
					</p>
				</div>
			{/if}

			<!-- Artist Description Section -->
			{#if event.artist_description}
				<div class="border-t border-gray-200 p-8 md:p-12">
					<h2 class="mb-4 text-2xl font-calluna-sans-bold text-pitch-black-100">
						O izvajalcu
					</h2>
					<div class="prose prose-lg max-w-none font-calluna-sans-light text-gray-700">
						{@html event.artist_description}
					</div>
				</div>
			{/if}

			<!-- Performers Section -->
			{#if event.performers && event.performers.length > 0}
				<div class="border-t border-gray-200 p-8 md:p-12">
					<h2 class="mb-6 text-2xl font-calluna-sans-bold text-pitch-black-100">
						Nastopajoči
					</h2>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
						{#each event.performers as performer}
							<div class="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
								<svg class="h-6 w-6 flex-shrink-0 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
								</svg>
								<div>
									<p class="font-calluna-sans-semibold text-pitch-black-100">
										{performer.performer_name}
									</p>
									{#if performer.performer_role}
										<p class="mt-1 text-sm font-calluna-sans-light text-gray-600">
											{performer.performer_role}
										</p>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Past Event: Gallery/Recap Section Placeholder -->
			{#if isEventPast}
				<div class="border-t border-gray-200 bg-gray-50 p-8 md:p-12">
					<h2 class="mb-4 text-2xl font-calluna-sans-bold text-pitch-black-100">
						Utrinki dogodka
					</h2>
					<p class="font-calluna-sans-light text-gray-600">
						Galerija slik in recap bo kmalu na voljo.
					</p>
				</div>
			{/if}
		</article>

		<!-- Related Events Section -->
		{#if relatedEvents && relatedEvents.length > 0}
			<div class="mt-12">
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-calluna-sans-bold text-pitch-black-100">
						{isEventPast ? 'Drugi pretekli dogodki' : 'Drugi prihajajoči dogodki'}
					</h2>
					<a
						href={isEventPast ? '/events/archive' : '/events/upcoming'}
						class="font-calluna-sans-semibold text-mean-green-500 transition-colors hover:text-mean-green-400"
					>
						Poglej vse →
					</a>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each relatedEvents as relatedEvent}
						<article class="group overflow-hidden rounded-lg bg-white shadow-lg transition-all hover:shadow-xl">
							<a href={generateEventUrl(relatedEvent)} class="block">
								{#if relatedEvent.image}
									<div class="relative h-48 overflow-hidden rounded-t-lg bg-off-white-100">
										<img
											src={getImageUrl(relatedEvent.image)}
											alt={relatedEvent.title}
											class="h-full w-full object-contain"
											onerror={(e) => {
												const target = e.target;
												if (target && target instanceof HTMLImageElement) {
													target.src = getFallbackImage();
												}
											}}
										/>
									</div>
								{/if}

								<div class="p-6">
									<time class="text-xs font-calluna-sans-light text-gray-500" datetime={relatedEvent.event_date}>
										{formatDate(relatedEvent.event_date)}
									</time>

									<h3 class="mt-2 text-xl font-calluna-sans-semibold text-pitch-black-100 transition-colors group-hover:text-brick-red-500">
										{relatedEvent.title}
									</h3>

									{#if relatedEvent.description}
										<p class="mt-3 line-clamp-3 font-calluna-sans-light text-gray-600">
											{relatedEvent.description}
										</p>
									{/if}

									<span class="mt-4 inline-flex items-center font-calluna-sans-semibold text-brick-red-500 transition-colors group-hover:text-brick-red-900">
										Preberi več
										<svg class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</span>
								</div>
							</a>
						</article>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Newsletter Section -->
		<section class="mt-12 w-full rounded-lg bg-off-white-100 px-8 py-12 md:px-12">
			<div class="mx-auto max-w-2xl text-center">
				<h2 class="text-3xl font-calluna-sans-semibold text-pitch-black-100">
					Ostanite obveščeni
				</h2>
				<p class="mt-2 font-calluna-sans-light text-gray-700">
					Prijavite se na naš newsletter in bodite prvi obveščeni o prihajajočih dogodkih.
				</p>
				<div class="mt-6 flex justify-center">
					<NewsletterForm />
				</div>
			</div>
		</section>
	</div>
</main>

<!-- Floating Sticky CTA Bar (Mobile) -->
<div class="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg md:hidden">
	<div class="flex gap-2">
		{#if !isEventPast}
			<button
				onclick={openReservationModal}
				class="flex-1 rounded-lg bg-mean-green-500 px-4 py-3 text-center font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:bg-mean-green-600"
			>
				Rezerviraj mizo
			</button>
		{/if}
		{#if event.link}
			<a
				href={event.link}
				target="_blank"
				rel="noopener noreferrer"
				class="flex-1 rounded-lg bg-brick-red-500 px-4 py-3 text-center font-calluna-sans-semibold text-white transition-colors hover:bg-brick-red-900"
			>
				{isEventPast ? 'Več informacij' : 'Kupi vstopnico'}
			</a>
		{/if}
			<div class="relative">
				<button
					onclick={toggleCalendarDropdown}
					class="rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:border-mean-green-500"
					aria-label="Dodaj v koledar"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</button>

				{#if isCalendarDropdownOpen}
					<!-- Backdrop -->
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						onclick={closeCalendarDropdown}
						class="fixed inset-0 z-40"
						aria-label="Close calendar dropdown"
					></button>

					<!-- Dropdown Menu (positioned above on mobile) -->
					<div class="absolute bottom-full right-0 z-50 mb-2 w-56 overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5">
						<div class="py-1">
							<button
								onclick={addToGoogleCalendar}
								class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
							>
								<svg class="h-5 w-5 text-mean-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span>Google Calendar</span>
							</button>

							<button
								onclick={addToOutlookCalendar}
								class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
							>
								<svg class="h-5 w-5 text-brick-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
								<span>Outlook Calendar</span>
							</button>

							<button
								onclick={downloadICS}
								class="flex w-full items-center gap-3 px-4 py-3 font-calluna-sans-light text-pitch-black-100 transition-colors hover:bg-gray-50"
							>
								<svg class="h-5 w-5 text-prototype-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								<span>Prenesi ICS</span>
							</button>
						</div>
					</div>
				{/if}
			</div>
			<button
				onclick={shareEvent}
				class="rounded-lg border-2 border-gray-300 bg-white px-4 py-3 font-calluna-sans-semibold text-pitch-black-100 transition-colors hover:border-prototype-orange-500"
				aria-label="Deli dogodek"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
				</svg>
			</button>
	</div>
</div>

<style>
	/* Prose styling for event content */
	:global(.prose h1) {
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-family: 'Calluna Sans', sans-serif;
		font-weight: 700;
		color: var(--pitch-black-100);
		margin-bottom: 1rem;
		margin-top: 2rem;
	}
	:global(.prose h2) {
		font-size: 1.5rem;
		line-height: 2rem;
		font-family: 'Calluna Sans', sans-serif;
		font-weight: 700;
		color: var(--pitch-black-100);
		margin-bottom: 0.75rem;
		margin-top: 1.5rem;
	}
	:global(.prose h3) {
		font-size: 1.25rem;
		line-height: 1.75rem;
		font-family: 'Calluna Sans', sans-serif;
		font-weight: 600;
		color: var(--pitch-black-100);
		margin-bottom: 0.5rem;
		margin-top: 1rem;
	}
	:global(.prose p) {
		margin-bottom: 1rem;
		color: rgb(55 65 81);
	}
	:global(.prose ul),
	:global(.prose ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}
	:global(.prose li) {
		margin-bottom: 0.5rem;
	}
	:global(.prose a) {
		color: var(--mean-green-500);
		text-decoration: underline;
	}
	:global(.prose a:hover) {
		color: var(--mean-green-400);
	}
	:global(.prose blockquote) {
		border-left: 4px solid var(--mean-green-500);
		padding-left: 1rem;
		font-style: italic;
		color: rgb(75 85 99);
	}
	:global(.prose code) {
		border-radius: 0.25rem;
		background-color: rgb(243 244 246);
		padding: 0.25rem 0.5rem;
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
	}
</style>

<!-- Reservation Modal -->
<ReservationModal
	isOpen={isReservationModalOpen}
	eventTitle={event.title}
	onClose={closeReservationModal}
/>
