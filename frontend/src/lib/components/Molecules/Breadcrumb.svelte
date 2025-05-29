<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import ArrowRightIcon from '@tcf/lib/components/Icons/ArrowRightIcon.svelte';

	interface Props {
		links: Array<{ label: string; href: string }>;
	}
	const { links }: Props = $props();

	const bem = createBEM('breadcrumb');

	const linksLength = links.length;
</script>

<div class={bem('container')}>
	{#each links as { href, label }, i}
		<div class={bem('item')}>
			{#if i > 0}
				<ArrowRightIcon />
			{/if}
			<a
				class={bem('link', { last: i === linksLength - 1 })}
				{href}
				aria-current={i === linksLength - 1 ? 'page' : undefined}>
				{label}
			</a>
		</div>
	{/each}
</div>

<style lang="scss">
	.breadcrumb {
		&__container {
			display: flex;
			align-items: center;
			gap: rem(8);
		}

		&__item {
			display: flex;
			align-items: center;
			gap: rem(8);
		}

		&__link {
			color: rgba(0, 0, 0, 0.5);
			text-decoration: none;
			font-weight: 400;
			line-height: rem(20);
			font-size: rem(14);

			&--last {
				color: #000;
				font-weight: 700;
			}
		}
	}
</style>
