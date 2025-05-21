<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import type { Component } from 'svelte';

	export type ScoreCardElementProps = {
		result: string;
		title: string;
		color1: string;
		color2: string;
		Icon?: Component<any>;
	};

	const { result, title, color1, color2, Icon }: ScoreCardElementProps = $props();
	const uuid = $props.id();
	const bem = createBEM('score-card');
</script>

<div class={bem('container')} aria-describedby={uuid}>
	{#if Icon}
		<div class={bem('icon-container')} style="background: linear-gradient(135deg, {color1} 0%, {color2} 100%);">
			<Icon />
		</div>
	{/if}
	<div class={bem('text-container')}>
		<h2 id={uuid} class={bem('result')}>{result}</h2>
		<p class={bem('title')}>{title}</p>
	</div>
</div>

<style lang="scss">
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

		&__result {
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
