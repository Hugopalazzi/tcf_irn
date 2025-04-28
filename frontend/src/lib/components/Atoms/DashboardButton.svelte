<script lang="ts">
	import { page } from '$app/state';
	import '@tcf/styles/styles.scss';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children: Snippet;
	}

	let { href = '', children }: Props = $props();
</script>

<a {href} class="btn btn-primary" class:active={page.url.pathname.startsWith(href)}>
	{@render children()}
</a>

<style lang="scss">
	.active {
		background-color: var(--secondary-color);
		:global(span) {
			color: black;
		}
	}
</style>
