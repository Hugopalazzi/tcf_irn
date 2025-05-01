<script lang="ts">
	import { page } from '$app/state';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children: Snippet;
	}

	const bem = createBEM('header-link');

	let { href = '', children }: Props = $props();
</script>

<a {href} class={`${bem()} ${page.url.href.startsWith(href) ? bem('active') : ''}`}>
	{@render children()}
</a>

<style lang="scss">
	.header-link {
		display: flex;
		align-items: center;
		font-family: var(--clanOT);
		font-weight: var(--medium);
		font-size: var(--text-lg);
		letter-spacing: 0;
		text-align: center;
		gap: rem(12);
		appearance: none;
		cursor: pointer;
		padding: rem(12) rem(20);
		color: var(--white);
		background-color: var(--primary-100);
		border-radius: rem(32);
		justify-content: center;

		&__active {
			background-color: var(--secondary-color);
			:global(span) {
				color: black;
			}
		}
	}
</style>
