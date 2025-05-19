<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import type { FullAutoFill } from 'svelte/elements';

	interface Props {
		inputId: string;
		name: string;
		label:string;
		placeholder: string;
		bindedValue: string;
		bindedError: any;
		autocomplete?: FullAutoFill;
	}

	let { bindedValue = $bindable(''), bindedError, label, inputId, name, placeholder, autocomplete }: Props = $props();
	const bem = createBEM('input-text-wrapper-form');
</script>

<div class={bem()}>
	<label class={bem('label')} for={inputId}>{label}</label>
	<input
		class={bem('input')}
		bind:value={bindedValue}
		class:error={!!bindedError}
		id={inputId}
		{name}
		{placeholder}
		{autocomplete}
		aria-invalid={!!bindedError} />
	<FormError errors={bindedError} />
</div>

<style lang="scss">
	.input-text-wrapper-form {
		display: flex;
		flex-direction: column;
		gap: rem(4);
		border: 1px solid #dcdcdc;
		border-radius: rem(12);
		padding: rem(12) rem(16);

		&__input {
			border: none;
			color: #000;
			font-size: rem(14);
			font-style: normal;
			font-weight: 500;
			line-height: rem(20);

			&:focus-visible {
				outline: none;
				border-bottom: 1px solid #000000;
			}
		}

		&__label {
			color: #808990;
			font-size: rem(12);
			font-style: normal;
			font-weight: 500;
			line-height: rem(16);
			letter-spacing: 0.36px;
		}
	}
</style>
