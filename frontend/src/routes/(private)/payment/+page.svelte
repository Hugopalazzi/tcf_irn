<script>
	export let data;
	let loading = false;

	async function subscribe() {
		loading = true;

		const res = await fetch('/api/create-subscription-session', {
			method: 'POST',
			body: JSON.stringify({ user_id: data?.user?.id }),
			headers: { 'Content-Type': 'application/json' }
		});

		const { url } = await res.json();
		window.location.href = url; // Redirect to stripe checkout
	}
</script>

<button on:click={subscribe} disabled={loading}>
	{loading ? 'Chargement...' : 'S’abonner'}
</button>
