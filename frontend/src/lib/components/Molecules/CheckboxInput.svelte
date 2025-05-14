<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import type { FullAutoFill } from 'svelte/elements';

	interface Props {
		inputId: string;
		label: string;
		name: string;
		placeholder: string;
		checked: boolean;
		bindedError: any;
		autocomplete?: FullAutoFill;
	}

	let { inputId, label, checked = $bindable(false), bindedError, name, placeholder, autocomplete }: Props = $props();
	const bem = createBEM('input-text-wrapper-form');
</script>

<div class={bem()}>
	<label class="checkbox">
		<input value={checked} type="checkbox" class="checkbox" class:error={!!bindedError} id={inputId} {name} {placeholder} {autocomplete} />
		<span class="checkbox-value">
			{label}
		</span>
	</label>
	<FormError errors={bindedError} />
</div>

<style lang="scss">
	.checkbox {
		input[type='checkbox'] {
			opacity: 0;
			height: 0;
			width: 0;

			&:checked + span::before {
				border: rem(1) solid var(--primary-100);
				background-color: $primary-color;
			}
			&:checked + span::after {
				content: '';
			}
			&:focus + span::before {
				outline: var(--primary-100) solid rem(2);
				outline-offset: rem(2);
			}
			&:disabled {
				color: var(--secondary-700);
			}
			&:disabled + span::before {
				border: rem(1) solid var(--secondary-500);
				background-color: var(--light-grey);
			}
		}
		span.checkbox-value {
			$checkbox-height: rem(16);
			position: relative;
			padding-left: rem(23);
			cursor: pointer;
			height: $checkbox-height;
			display: flex;
			align-items: center;
			align-self: center;

			&::before,
			&::after {
				content: '';
				position: absolute;
				display: inline-block;
			}

			&::before {
				height: $checkbox-height;
				width: $checkbox-height;
				border: rem(1) solid var(--secondary-500);
				border-radius: rem(4);
				background-color: var(--white);
				left: 0;
			}
			&::after {
				content: none;
				height: rem(5);
				width: rem(8);
				border-left: rem(2) solid;
				border-bottom: rem(2) solid;
				transform: rotate(-45deg);
				left: rem(4);
				top: rem(4);
				color: var(--white);
			}
		}
	}
</style>
