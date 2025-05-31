<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		label: string;
		children: Snippet;
		bold?: boolean;
	}

	const bem = createBEM('burger-link');

	const { href, label, children, bold }: Props = $props();
</script>

<a {href} class={bem('', { active: bold })}>
	{@render children()}
	<span>
		{label}
	</span>
</a>

<style lang="scss">
	.burger-link {
		display: flex;
		padding: rem(12) 0;
		align-items: center;
		gap: rem(12);
		align-self: stretch;
		color: #909090;
		font-size: rem(14);
		font-style: normal;
		font-weight: 400;
		line-height: rem(20);
		&--active {
			font-weight: 700;
			color: #000;
		}
	}
</style>
