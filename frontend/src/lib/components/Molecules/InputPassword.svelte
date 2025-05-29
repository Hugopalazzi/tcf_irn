<script lang="ts">
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import EyeIcon from '@tcf/lib/components/Icons/EyeIcon.svelte';
	import EyeSlashIcon from '@tcf/lib/components/Icons/EyeSlashIcon.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';
	import type { FullAutoFill } from 'svelte/elements';

	interface Props {
		inputId: string;
		name: string;
		label: string;
		placeholder: string;
		bindedValue: string;
		bindedError: any;
		autocomplete?: FullAutoFill;
	}

	let { bindedValue = $bindable(''), bindedError, label, inputId, name, placeholder, autocomplete }: Props = $props();
	const bem = createBEM('input-wrapper-form');

	let showPassword = $state(false);
</script>

<div class={bem()}>
	<label class={bem('label')} for={inputId}>{label}</label>
	<div class={bem('input-wrapper')}>
		<input
			class={bem('input')}
			bind:value={bindedValue}
			type={showPassword ? 'text' : 'password'}
			class:error={!!bindedError}
			id={inputId}
			{name}
			{placeholder}
			{autocomplete} />
		<button
			onclick={() => (showPassword = !showPassword)}
			type="button"
			aria-label={showPassword ? m['form.password.hidePassword']() : m['form.password.showPassword']()}>
			{#if showPassword}
				<EyeSlashIcon />
			{:else}
				<EyeIcon />
			{/if}
		</button>
	</div>
	<FormError errors={bindedError} />
</div>

<style lang="scss">
	.input-wrapper-form {
		&__input-wrapper {
			padding: 0;
			display: flex;
			align-items: center;
		}
		&__input {
			width: 100%;
		}
	}
</style>
