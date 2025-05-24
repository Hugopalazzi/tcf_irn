<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { mergeClassNames } from '@tcf/lib/helpers/mergeClassNames';
	import type { GradientColorsType } from '@tcf/models/gradientColors';
	import type { Component } from 'svelte';

	export type ScoreCardElementProps = {
		result: string;
		title: string;
		backgroundIconColor: GradientColorsType;
		Icon?: Component<any>;
	};

	const { result, title, backgroundIconColor, Icon }: ScoreCardElementProps = $props();
	const bem = createBEM('score-card');
</script>

<div class={bem('container')}>
	{#if Icon}
		<div class={mergeClassNames(bem('icon-container'), backgroundIconColor)}>
			<Icon />
		</div>
	{/if}
	<div class={bem('text-container')}>
		<p class={bem('result-wrapper')}>
			<span class={bem('result')}>{result}</span>
			<span class={bem('title')}>{title}</span>
		</p>
	</div>
</div>

<style lang="scss">
	.blue-gradient {
		background: linear-gradient(135deg, #a3e7fc 0%, #1a90b4 100%);
	}
	.green-gradient {
		background: linear-gradient(135deg, #9cffb8 0%, #0ead3b 100%);
	}
	.red-gradient {
		background: linear-gradient(135deg, #ffa39c 0%, #cf2f23 100%);
	}

	.score-card {
		&__container {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: rem(12);
			gap: rem(16);
			flex: 1 0 0;
			border-radius: rem(20);
			border: 1px solid #dcdcdc;
			background: #f9f9f9;
		}

		&__icon-container {
			border-radius: rem(8);
			display: flex;
			padding: rem(10);
		}

		&__result-wrapper {
			display: flex;
			flex-direction: column;
		}

		&__result {
			font-weight: 600;
			font-size: rem(20);
			line-height: rem(20);
		}

		&__title {
			color: rgba(0, 0, 0, 0.8);
			font-size: rem(12);
			line-height: rem(16);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.score-card {
			&__container {
				padding: rem(16);
				gap: rem(16);
			}

			&__result {
				line-height: rem(32);
				font-size: rem(28);
			}

			&__title {
				font-size: rem(14);
				line-height: rem(20);
			}

			&__icon-container {
				padding: rem(10);
			}
		}
	}
</style>
