<script lang="ts">
	import '@tcf/styles/styles.scss';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();
</script>

<main id="contenu-site">
	<Toaster />
	{@render children()}
</main>
