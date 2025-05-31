<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		label: string;
		isActive: boolean;
		children: Snippet;
	}

	const bem = createBEM('header-link');

	const { href, label, isActive, children }: Props = $props();
</script>

<a {href} class={bem('', { active: isActive })}>
	{@render children()}
	<span>
		{label}
	</span>
</a>

<style lang="scss">
	.header-link {
		display: flex;
		align-items: center;
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

		&--active {
			background-color: var(--secondary-color);
			:global(span) {
				color: black;
			}
		}
	}
</style>
