<script lang="ts">
	import type { BlogPost } from '$lib/types.js';
	
	export let post: BlogPost;
	
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
		return '/placeholder-image.svg';
	}
</script>

<article class="blog-card">
	<div class="card-image">
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
	
	<div class="card-content">
		<div class="card-meta">
			<time datetime={post.date_created}>
				{formatDate(post.date_created)}
			</time>
		</div>
		
		<h3 class="card-title">
			<a href="/blog/{post.id}">{post.title}</a>
		</h3>
		
		<p class="card-description">
			{post.description}
		</p>
		
		<a href="/blog/{post.id}" class="read-more">
			Read More
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M5 12h14M12 5l7 7-7 7"/>
			</svg>
		</a>
	</div>
</article>

<style>
	.blog-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.blog-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
	}

	.card-image {
		width: 100%;
		height: 200px;
		overflow: hidden;
		position: relative;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.blog-card:hover .card-image img {
		transform: scale(1.05);
	}

	.card-content {
		padding: 24px;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.card-meta {
		margin-bottom: 12px;
	}

	.card-meta time {
		font-size: 14px;
		color: #666;
		font-weight: 500;
	}

	.card-title {
		margin: 0 0 12px 0;
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.card-title a {
		color: #333;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.card-title a:hover {
		color: #667eea;
	}

	.card-description {
		color: #666;
		line-height: 1.6;
		margin: 0 0 20px 0;
		flex: 1;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.read-more {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #667eea;
		text-decoration: none;
		font-weight: 600;
		font-size: 14px;
		transition: color 0.3s ease;
		margin-top: auto;
	}

	.read-more:hover {
		color: #764ba2;
	}

	.read-more svg {
		transition: transform 0.3s ease;
	}

	.read-more:hover svg {
		transform: translateX(4px);
	}

	@media (max-width: 768px) {
		.card-content {
			padding: 20px;
		}
		
		.card-title {
			font-size: 1.25rem;
		}
	}
</style>
