<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	let email = '';
	let isSubmitting = false;
	let message = '';
	let messageType: 'success' | 'error' | '' = '';

	async function handleSubmit() {
		if (!email || !isValidEmail(email)) {
			message = 'Please enter a valid email address';
			messageType = 'error';
			return;
		}

		isSubmitting = true;
		message = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email })
			});

			const data = await response.json();

			if (response.ok) {
				message = 'Thank you for subscribing!';
				messageType = 'success';
				email = '';
				dispatch('subscribe', { email });
			} else {
				message = data.error || 'Something went wrong. Please try again.';
				messageType = 'error';
			}
		} catch (error) {
			console.error('Newsletter subscription error:', error);
			message = 'Something went wrong. Please try again.';
			messageType = 'error';
		} finally {
			isSubmitting = false;
		}
	}

	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
</script>

<div class="newsletter-form">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-group">
			<input
				type="email"
				bind:value={email}
				placeholder="Enter your email address"
				required
				disabled={isSubmitting}
			/>
			<button type="submit" disabled={isSubmitting || !email}>
				{isSubmitting ? 'Subscribing...' : 'Subscribe'}
			</button>
		</div>
	</form>
	
	{#if message}
		<div class="message {messageType}">
			{message}
		</div>
	{/if}
</div>

<style>
	.newsletter-form {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	.form-group {
		display: flex;
		gap: 12px;
		margin-bottom: 20px;
	}

	input {
		flex: 1;
		padding: 16px 20px;
		border: 2px solid #e1e5e9;
		border-radius: 8px;
		font-size: 16px;
		transition: border-color 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: #667eea;
	}

	input:disabled {
		background-color: #f8f9fa;
		cursor: not-allowed;
	}

	button {
		padding: 16px 32px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		white-space: nowrap;
	}

	button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	.message {
		padding: 12px 16px;
		border-radius: 8px;
		font-size: 14px;
		text-align: center;
		font-weight: 500;
	}

	.message.success {
		background-color: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	.message.error {
		background-color: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
	}

	@media (max-width: 640px) {
		.form-group {
			flex-direction: column;
		}
		
		button {
			width: 100%;
		}
	}
</style>
