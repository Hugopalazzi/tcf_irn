<script lang="ts">
	import '@tcf/styles/styles.scss';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Molecules/Header.svelte';

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="wrapper">
	<Header />
	<main>
		{@render children?.()}
	</main>
</div>

<style lang="scss">
	main {
		padding: rem(16);

		@include min-width(desktop) {
			padding: rem(60);
		}
	}
</style>
