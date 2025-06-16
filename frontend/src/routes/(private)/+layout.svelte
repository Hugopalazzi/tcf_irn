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
	let burgerOpen = $state(false);
</script>

<div class="wrapper">
	<Header bind:burgerOpen />
	<main class="layout-wrapper" inert={burgerOpen ? true : undefined}>
		{@render children?.()}
	</main>
</div>

<style lang="scss">
	.layout-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: rem(20) rem(16);
		gap: rem(20);
		margin-left: auto;
		margin-right: auto;
	}

	@media (min-width: $breakpoint-tablet) {
		.layout-wrapper {
			padding: rem(40) rem(32);
			gap: rem(32);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.layout-wrapper {
			padding: rem(52) rem(60) rem(60) rem(32);
			max-width: calc($breakpoint-desktop-large + rem(120));
		}
	}
</style>
