<script lang="ts">
	import type { PageData } from './$types';
	import NewsletterForm from '$lib/components/NewsletterForm.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';

	export let data: PageData;
	const { blogPosts } = data;
</script>

<svelte:head>
	<title>Landing Page - Your Amazing Product</title>
	<meta name="description" content="Discover our amazing product and stay updated with our latest blog posts" />
	<meta property="og:title" content="Landing Page - Your Amazing Product" />
	<meta property="og:description" content="Discover our amazing product and stay updated with our latest blog posts" />
	<meta property="og:image" content="/hero-image.svg" />
</svelte:head>

<main class="container">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			<h1>Welcome to Our Amazing Product</h1>
			<p class="hero-description">
				Discover the future of innovation with our cutting-edge solution. 
				Join thousands of satisfied customers who have transformed their workflow.
			</p>
			<div class="hero-image">
				<img src="/hero-image.svg" alt="Hero section illustration" />
			</div>
		</div>
	</section>

	<!-- Newsletter Section -->
	<section class="newsletter">
		<div class="newsletter-content">
			<h2>Stay Updated</h2>
			<p>Subscribe to our newsletter for the latest updates and insights</p>
			<NewsletterForm />
		</div>
	</section>

	<!-- Blog Posts Section -->
	<section class="blog-posts">
		<h2>Latest Blog Posts</h2>
		{#if blogPosts.length === 0}
			<div class="no-posts">No blog posts available at the moment.</div>
		{:else}
			<div class="blog-grid">
				{#each blogPosts as post (post.id)}
					<BlogCard {post} />
				{/each}
			</div>
		{/if}
	</section>
</main>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.hero {
		text-align: center;
		padding: 80px 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		margin-bottom: 60px;
	}

	.hero-content h1 {
		font-size: 3.5rem;
		margin-bottom: 20px;
		font-weight: 700;
	}

	.hero-description {
		font-size: 1.25rem;
		margin-bottom: 40px;
		opacity: 0.9;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.hero-image img {
		max-width: 100%;
		height: auto;
		border-radius: 12px;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.newsletter {
		background: #f8f9fa;
		padding: 60px 0;
		margin-bottom: 60px;
	}

	.newsletter-content {
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}

	.newsletter h2 {
		font-size: 2.5rem;
		margin-bottom: 20px;
		color: #333;
	}

	.newsletter p {
		font-size: 1.125rem;
		color: #666;
		margin-bottom: 40px;
	}

	.blog-posts {
		margin-bottom: 80px;
	}

	.blog-posts h2 {
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 50px;
		color: #333;
	}

	.blog-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
	}

	.no-posts {
		text-align: center;
		font-size: 1.125rem;
		color: #666;
		padding: 40px;
	}

	@media (max-width: 768px) {
		.hero-content h1 {
			font-size: 2.5rem;
		}
		
		.hero-description {
			font-size: 1.125rem;
		}
		
		.newsletter h2, .blog-posts h2 {
			font-size: 2rem;
		}
		
		.blog-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
