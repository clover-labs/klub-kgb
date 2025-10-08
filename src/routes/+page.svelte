<script lang="ts">
	import type { PageData } from "./$types";
	import BlogCard from "$lib/components/BlogCard.svelte";
	import NewsletterForm from "$lib/components/NewsletterForm.svelte";

	export let data: PageData;
	const { blogPosts } = data;
</script>

<svelte:head>
	<title>Klub KGB Maribor</title>
	<meta
		name="description"
		content="Klub KGB Maribor - dogodki, glasba: v središču Maribora."
	/>
	<meta property="og:title" content="Klub KGB Maribor" />
	<meta
		property="og:description"
		content="Klub KGB Maribor - dogodki, glasba: v središču Maribora."
	/>
	<meta property="og:image" content="/hero-image.svg" />
</svelte:head>

<main class="flex flex-col gap-[5rem] md:gap-[12rem]">
	<!-- Hero Section -->
	<section
		class="bg-[url('/heroes/default.png')] bg-cover bg-center h-screen flex flex-col justify-start items-start"
	>
		<!-- Hero content -->
		<div
			class="w-full flex flex-col items-center lg:items-start justify-center h-full px-4 md:px-12 py-2 gap-4"
		>
			<h1
				class="w-full text-pitch-black-100 text-3xl lg:text-5xl font-bold font-calluna-sans-bold text-center lg:text-left"
			>
				Dobrodošli v Klub KGB
			</h1>
			<p
				class="w-full sm:max-w-1/2 text-pitch-black-100 text-lg lg:text-2xl font-calluna-sans-light text-center lg:text-left"
			>
				Prostor, ki gosti dobre ljudi in dogodke že od leta 1998 dalje. Glasba,
				predstave in ostali dogodki, v srcu Maribora.
			</p>
			<a
				href="https://olaii.com/organizer/866/klub-kgb"
				target="_blank"
				class="w-full md:w-fit text-prototype-orange-500 text-xl lg:text-2xl font-calluna-sans-semibold group flex items-center justify-center md:justify-start"
			>
				Na nakup kart <span
					class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
					>→</span
				>
			</a>
		</div>
	</section>

	<!-- Event Section -->
	<section id="dogodki" class="w-full px-4 md:px-12 flex flex-col gap-8">
		<h2
			class="text-pitch-black-100 text-3xl md:text-4xl font-calluna-sans-semibold"
		>
			Dogodki
		</h2>
		<div class="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
			{#each blogPosts as post}
				<BlogCard {post} />
			{/each}
		</div>
	</section>

	<section id="newsletter" class="w-full px-4 md:px-12 flex flex-col gap-4">
		<h2 class="text-pitch-black-100 text-4xl font-calluna-sans-semibold">
			Newsletter
		</h2>
		<p
			class="text-pitch-black-100 text-sm md:text-lg font-calluna-sans-light mb-4"
		>
			Prijavi se na naš newsletter in bodite obveščeni o naših dogodkih in
			novicah.
		</p>
		<NewsletterForm />
		<a
			href="/news"
			class="text-prototype-orange-500 text-lg font-calluna-sans-semibold group flex items-center"
		>
			Preberi najnovejše novice <span
				class="ml-2 group-hover:translate-x-2 transition-transform duration-300"
				>→</span
			>
		</a>
	</section>
</main>
