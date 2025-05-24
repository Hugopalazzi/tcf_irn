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
	<main>
		<Header />
		{@render children?.()}
	</main>
</div>
