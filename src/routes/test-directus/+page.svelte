<script lang="ts">
	import type { PageData } from './$types';
	import { env as publicEnv } from '$env/dynamic/public';
	
	export let data: PageData;
	const { success, posts, message, error } = data;
</script>

<svelte:head>
	<title>Directus Connection Test</title>
</svelte:head>

<main class="test-page">
	<div class="container">
		<h1>API Connection Test</h1>
		
		<div class="status {success ? 'success' : 'error'}">
			<h2>{success ? '✅ Success' : '❌ Error'}</h2>
			<p>{message}</p>
		</div>
		
		{#if error}
			<div class="error-details">
				<h3>Error Details:</h3>
				<pre>{error}</pre>
			</div>
		{/if}
		
		{#if success && posts.length > 0}
			<div class="posts-preview">
				<h3>Fetched Posts ({posts.length}):</h3>
				<ul>
					{#each posts as post}
						<li>
							<strong>{post.title}</strong>
							<br>
							<small>ID: {post.id} | Status: {post.status} | Created: {new Date(post.date_created).toLocaleDateString()}</small>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		
		<div class="environment-info">
			<h3>API Configuration:</h3>
			<ul>
				<li><strong>API Endpoint:</strong> /api/blog</li>
				<li><strong>Backend Directus URL:</strong> {publicEnv.PUBLIC_LANDING_DIRECTUS_URL || 'Not set'}</li>
				<li><strong>Collection:</strong> {publicEnv.PUBLIC_LANDING_DIRECTUS_COLLECTION_NAME || 'Not set'}</li>
			</ul>
		</div>
		
		<div class="actions">
			<a href="/" class="btn">← Back to Home</a>
			<button on:click={() => window.location.reload()} class="btn">🔄 Retry Test</button>
		</div>
	</div>
</main>

<style>
	.test-page {
		padding: 40px 0;
		min-height: 100vh;
		background: #f8f9fa;
	}
	
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 0 20px;
	}
	
	h1 {
		font-size: 2.5rem;
		margin-bottom: 30px;
		text-align: center;
		color: #333;
	}
	
	.status {
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;
		text-align: center;
	}
	
	.status.success {
		background: #d4edda;
		border: 1px solid #c3e6cb;
		color: #155724;
	}
	
	.status.error {
		background: #f8d7da;
		border: 1px solid #f5c6cb;
		color: #721c24;
	}
	
	.status h2 {
		margin: 0 0 10px 0;
		font-size: 1.5rem;
	}
	
	.status p {
		margin: 0;
		font-size: 1.125rem;
	}
	
	.error-details {
		background: white;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;
		border: 1px solid #e1e5e9;
	}
	
	.error-details h3 {
		margin: 0 0 15px 0;
		color: #721c24;
	}
	
	.error-details pre {
		background: #f8f9fa;
		padding: 15px;
		border-radius: 4px;
		overflow-x: auto;
		font-size: 14px;
		margin: 0;
	}
	
	.posts-preview {
		background: white;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;
		border: 1px solid #e1e5e9;
	}
	
	.posts-preview h3 {
		margin: 0 0 15px 0;
		color: #333;
	}
	
	.posts-preview ul {
		margin: 0;
		padding-left: 20px;
	}
	
	.posts-preview li {
		margin-bottom: 10px;
		padding: 10px;
		background: #f8f9fa;
		border-radius: 4px;
	}
	
	.environment-info {
		background: white;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;
		border: 1px solid #e1e5e9;
	}
	
	.environment-info h3 {
		margin: 0 0 15px 0;
		color: #333;
	}
	
	.environment-info ul {
		margin: 0;
		padding-left: 20px;
	}
	
	.environment-info li {
		margin-bottom: 8px;
		font-family: monospace;
	}
	
	.actions {
		display: flex;
		gap: 15px;
		justify-content: center;
	}
	
	.btn {
		display: inline-block;
		padding: 12px 24px;
		background: #667eea;
		color: white;
		text-decoration: none;
		border-radius: 6px;
		font-weight: 600;
		transition: background 0.3s ease;
		border: none;
		cursor: pointer;
		font-size: 16px;
	}
	
	.btn:hover {
		background: #5a6fd8;
	}
</style>
