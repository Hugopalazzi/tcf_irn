<script lang="ts">
	import '@tcf/styles/styles.scss';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import NavBar from '../../lib/components/Molecules/NavBar.svelte';
	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="wrapper">
	<main>
		<NavBar />
		{@render children?.()}
	</main>
</div>
