<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	export type ScoreCardElementProps = {
		label: string;
		value: number;
	};

	const { label, value }: ScoreCardElementProps = $props();

	const bem = createBEM('score-card');
</script>

<div class={bem('container')}>
	<span class={bem('label')}>{label}</span>
	<span class={bem('value')}>{value}</span>
</div>

<style lang="scss">
	.score-card {
		&__container {
			display: flex;
			flex-direction: column;
			padding: rem(12) rem(8);
			gap: rem(8);
			width: 100%;
			border-radius: rem(12);
			border: 1px solid #dcdcdc;
			background: #f9f9f9;
		}

		&__label {
			color: #7f7f7f;
			text-align: center;
			font-size: rem(12);
			font-style: normal;
			font-weight: 500;
			line-height: rem(16);
		}

		&__value {
			color: #000;
			text-align: center;
			font-size: rem(16);
			font-style: normal;
			font-weight: 700;
			line-height: rem(20);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.score-card {
			&__container {
				padding: rem(16);
			}

			&__label {
				font-size: rem(14);
				line-height: rem(20);
			}

			&__value {
				font-size: rem(20);
				line-height: rem(24);
			}
		}
	}
</style>
