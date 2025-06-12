<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { type StatusType, statusEnum } from '@tcf/models/global';
	import SelectIcon from '../Icons/SelectIcon.svelte';
	import { t } from '@tcf/lib/helpers/tHelper';

	type Props = {
		optionPrefix: string;
		label: string;
		onClick: (...args: any[]) => void;
		status?: StatusType;
	};

	const { optionPrefix, label, status, onClick }: Props = $props();

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Space') {
			event.preventDefault();
		}
	};
	const bem = createBEM('choice-button');
</script>

<button onclick={onClick} class={bem('', { status: status })}>
	<span class={bem('prefix')}>{optionPrefix}</span>
	<div class={bem('label-wrapper')}>
		<span class={bem('label')}>{label}</span>
		{#if status === statusEnum.SELECTED || status === statusEnum.ERROR}
			<SelectIcon />
		{:else if status === statusEnum.SUCCESS}
			<span class={bem('correct-answer')}>{t('choiceButton.correctAnswer')}</span>
		{/if}
	</div>
</button>

<style lang="scss">
	.choice-button {
		display: flex;
		align-items: center;
		gap: rem(20);
		border-radius: rem(10);
		border: 1px solid #dcdcdc;
		background: #f9f9f9;
		display: flex;
		padding: rem(8);
		gap: rem(20);
		flex: 1 0 0;

		&--status {
			&_selected {
				background: #a3e7fc;
			}

			&_error,
			&_success {
				.choice-button__label {
					color: #fff;
				}
			}

			&_error {
				background: #f14336;
			}

			&_success {
				background: #4cc16d;
			}
		}

		&__prefix {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10px;
			background: #1e0c5b;
			width: rem(40);
			height: rem(40);
			flex-shrink: 0;
			aspect-ratio: 1/1;
			color: #fff;
			font-size: rem(12);
			font-weight: 700;
			line-height: rem(20);
		}

		&__label {
			color: #000;
			font-size: rem(14);
			font-weight: 700;
			line-height: rem(20);
		}

		&__label-wrapper {
			display: flex;
			gap: rem(20);
			justify-content: space-between;
			align-items: center;
			flex: 1 1 0;
		}

		&__correct-answer {
			color: #fff;
			text-align: right;
			font-size: rem(12);
			font-weight: 600;
			line-height: rem(20);
		}
	}

	@media (min-width: $breakpoint-desktop) {
		.choice-button {
			gap: rem(12);
			padding: rem(12);

			&__prefix {
				font-size: rem(14);
			}

			&__label {
				font-size: rem(16);
			}
		}
	}
</style>
