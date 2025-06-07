<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Snippet } from 'svelte';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';

	const bem = createBEM('frame');

	interface Props {
		title?: string;
		description?: string;
		children?: Snippet;
		button?: Snippet;
		additionalClass?: string;
	}

	const { additionalClass, title, description, children, button }: Props = $props();
</script>

<div class={mergeClassNames(bem('container'), additionalClass)}>
	{#if title}
		<div class={bem('btn-heading-container')}>
			<div class={bem('heading')}>
				<h2 class={bem('title')}>{title}</h2>
				{#if description}<p class={bem('description')}>{description}</p>{/if}
			</div>
			{@render button?.()}
		</div>
	{/if}
	{@render children?.()}
</div>

<style lang="scss">
	.frame {
		&__container {
			display: flex;
			padding: rem(16);
			flex-direction: column;
			align-items: flex-start;
			gap: rem(16);
			border-radius: rem(10);
			border: 1px solid #dcdcdc;
			background: #fff;
		}

		&__btn-heading-container {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 8px;
			width: 100%;
		}

		&__heading {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: rem(4);
		}

		&__title {
			color: #000;
			font-size: rem(16);
			font-style: normal;
			font-weight: 700;
			line-height: rem(20);
		}

		&__description {
			color: #666;
			font-size: rem(14);
			font-style: normal;
			font-weight: 500;
			line-height: rem(20);
			align-self: stretch;
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.frame {
			&__container {
				padding: rem(20);
				gap: rem(20);
				border-radius: rem(20);
			}

			&__title {
				font-size: rem(20);
				line-height: rem(24);
			}
		}
	}

	@media (min-width: $breakpoint-tablet) {
		.frame {
			&__btn-heading-container {
				flex-direction: row;
			}
		}
	}
</style>
