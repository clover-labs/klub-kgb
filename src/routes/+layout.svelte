<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import "../app.css";
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<slot />

<style>
	body {
		background-color: #f0f0f0;
		padding: 10px;
	}

	body {
		border: 1px solid red;
		padding: 10px;
		margin: 10px;
	}
</style>
