<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import type { FullAutoFill } from 'svelte/elements';

	interface Props {
		inputId: string;
		label: string;
		name: string;
		checked: boolean;
		bindedError: any;
		autocomplete?: FullAutoFill;
	}

	let {
		inputId,
		label,
		checked = $bindable(false),
		bindedError,
		name,
		autocomplete
	}: Props = $props();
	const bem = createBEM('checkbox');
</script>

<label for={inputId} class={bem('label')}>
	<div class={bem('row')}>
		<input
			bind:checked
			type="checkbox"
			class={bem('input')}
			class:error={!!bindedError}
			id={inputId}
			{name}
			{autocomplete} />
		<span class={bem('box')}></span>
		<span class={bem('text')}>{label}</span>
	</div>
	<FormError errors={bindedError} />
</label>

<style lang="scss">
	.checkbox {
		&__label {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: rem(4); // space between checkbox row and error
		}

		&__row {
			display: flex;
			align-items: center;
			gap: rem(8);
		}

		&__input {
			opacity: 0;
			width: 0;
			height: 0;
			position: absolute;
			pointer-events: none;

			&:checked + .checkbox__box::before {
				border: rem(1) solid $primary-100;
				background-color: $primary-color;
			}

			&:checked + .checkbox__box::after {
				content: '';
			}

			&:focus + .checkbox__box::before {
				outline: $primary-100 solid rem(2);
				outline-offset: rem(2);
			}

			&:disabled + .checkbox__box::before {
				border: rem(1) solid $secondary-500;
				background-color: $light-grey;
			}
		}

		&__box {
			position: relative;
			width: rem(16);
			height: rem(16);
			flex-shrink: 0;

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: rem(1) solid var(--secondary-500);
				border-radius: rem(4);
				background-color: var(--white);
			}

			&::after {
				content: none;
				position: absolute;
				left: rem(4);
				top: rem(4);
				height: rem(5);
				width: rem(8);
				border-left: rem(2) solid;
				border-bottom: rem(2) solid;
				transform: rotate(-45deg);
				color: var(--white);
			}
		}

		&__text {
			line-height: 1.4;
			cursor: pointer;
			color: #000;
			font-size: rem(14);
			font-style: normal;
			font-weight: 500;
			line-height: rem(20);
		}
	}
</style>
