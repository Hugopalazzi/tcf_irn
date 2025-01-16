<script lang="ts">
	import '@tcf/styles/styles.scss';
	import { Toaster } from 'svelte-french-toast';

	let { children } = $props();
</script>

<div class="wrapper">
	<div class="wrapper__body">
		<main id="contenu-site">
			<Toaster />
			{@render children()}
		</main>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		min-height: 100vh;
		justify-content: center;
	}

	main {
		padding: rem(24);
		height: 100%;
		box-sizing: border-box;
	}
</style>
