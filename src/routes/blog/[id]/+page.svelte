<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	
	export let data: PageData;
	
	const { post } = data;
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	function getImageUrl(imageId: string): string {
		// Use the Directus asset URL directly
		return `https://cms.cloverlabs.dev/assets/${imageId}`;
	}
	
	function getFallbackImage(): string {
		// Return a simple placeholder image
		return '/placeholder-image-large.svg';
	}
	
	function goBack() {
		goto('/');
	}
</script>

<svelte:head>
	<title>{post.title} - Blog</title>
	<meta name="description" content={post.description} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description} />
	<meta property="og:image" content={post.image} />
</svelte:head>

<main class="blog-post">
	<div class="container">
		<button class="back-button" on:click={goBack}>
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M19 12H5M12 19l-7-7 7-7"/>
			</svg>
			Back to Home
		</button>
		
		<article class="post-content">
			<header class="post-header">
				<div class="post-meta">
					<time datetime={post.date_created}>
						{formatDate(post.date_created)}
					</time>
				</div>
				
				<h1 class="post-title">{post.title}</h1>
				
				<p class="post-description">{post.description}</p>
			</header>
			
			<div class="post-image">
				<img 
					src={getImageUrl(post.image)} 
					alt={post.title}
					on:error={(e) => {
						// Fallback to a placeholder if image fails to load
						const target = e.target;
						if (target && target instanceof HTMLImageElement) {
							target.src = getFallbackImage();
						}
					}}
				/>
			</div>
			
			{#if post.content}
				<div class="post-body">
					{@html post.content}
				</div>
			{:else}
				<div class="post-body">
					<p>This blog post doesn't have content yet. Please check back later!</p>
				</div>
			{/if}
		</article>
	</div>
</main>

<style>
	.blog-post {
		min-height: 100vh;
		background: #f8f9fa;
		padding: 40px 0;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.back-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		background: white;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		padding: 12px 20px;
		color: #333;
		text-decoration: none;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-bottom: 40px;
	}

	.back-button:hover {
		border-color: #667eea;
		color: #667eea;
		transform: translateX(-4px);
	}

	.post-content {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
	}

	.post-header {
		padding: 40px 40px 20px 40px;
		text-align: center;
	}

	.post-meta {
		margin-bottom: 20px;
	}

	.post-meta time {
		font-size: 16px;
		color: #666;
		font-weight: 500;
	}

	.post-title {
		font-size: 3rem;
		font-weight: 700;
		line-height: 1.2;
		margin: 0 0 20px 0;
		color: #333;
	}

	.post-description {
		font-size: 1.25rem;
		color: #666;
		line-height: 1.6;
		margin: 0;
	}

	.post-image {
		width: 100%;
		height: 400px;
		overflow: hidden;
	}

	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.post-body {
		padding: 40px;
		font-size: 1.125rem;
		line-height: 1.8;
		color: #333;
	}

	.post-body :global(h1),
	.post-body :global(h2),
	.post-body :global(h3),
	.post-body :global(h4),
	.post-body :global(h5),
	.post-body :global(h6) {
		margin: 30px 0 15px 0;
		font-weight: 700;
		color: #333;
	}

	.post-body :global(h1) {
		font-size: 2.25rem;
	}

	.post-body :global(h2) {
		font-size: 1.875rem;
	}

	.post-body :global(h3) {
		font-size: 1.5rem;
	}

	.post-body :global(p) {
		margin: 0 0 20px 0;
	}

	.post-body :global(ul),
	.post-body :global(ol) {
		margin: 0 0 20px 0;
		padding-left: 30px;
	}

	.post-body :global(li) {
		margin: 0 0 8px 0;
	}

	.post-body :global(blockquote) {
		border-left: 4px solid #667eea;
		padding-left: 20px;
		margin: 30px 0;
		font-style: italic;
		color: #666;
	}

	.post-body :global(code) {
		background: #f1f3f4;
		padding: 2px 6px;
		border-radius: 4px;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.9em;
	}

	.post-body :global(pre) {
		background: #f8f9fa;
		padding: 20px;
		border-radius: 8px;
		overflow-x: auto;
		margin: 20px 0;
	}

	.post-body :global(pre code) {
		background: none;
		padding: 0;
	}

	@media (max-width: 768px) {
		.blog-post {
			padding: 20px 0;
		}
		
		.post-header {
			padding: 30px 20px 15px 20px;
		}
		
		.post-title {
			font-size: 2.25rem;
		}
		
		.post-description {
			font-size: 1.125rem;
		}
		
		.post-image {
			height: 250px;
		}
		
		.post-body {
			padding: 30px 20px;
			font-size: 1rem;
		}
		
		.post-body :global(h1) {
			font-size: 1.875rem;
		}
		
		.post-body :global(h2) {
			font-size: 1.5rem;
		}
		
		.post-body :global(h3) {
			font-size: 1.25rem;
		}
	}
</style>
