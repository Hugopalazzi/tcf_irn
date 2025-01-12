<script lang="ts">
	import '@tcf/styles/styles.scss';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import NavBar from './NavBar.svelte';
	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="wrapper">
	<div class="wrapper__body">
		<main id="contenu-site">
			<NavBar />
			{@render children?.()}
		</main>
	</div>
</div>
