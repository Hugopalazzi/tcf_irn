<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import InputTextWrapperForm from '../Molecules/InputTextWrapperForm.svelte';
	import CheckboxInput from '../Molecules/CheckboxInput.svelte';

	interface Props {
		supForm: SuperForm<any>;
	}

	let { supForm }: Props = $props();

	const { form, enhance, errors } = supForm;

	const bem = createBEM('form');
</script>

<div class={bem('form-container')}>
	<span class={bem('form-title')}>{$_('form.registration.title')}</span>
</div>
<form method="POST" class={bem('container')} autocomplete="off" use:enhance>
	<InputTextWrapperForm
		inputId="email"
		name="email"
		placeholder={$_('form.email.placeholder')}
		bind:bindedValue={$form.email}
		bindedError={$errors?.email}
		autocomplete="email" />
	<div class={bem('input-wrapper')}>
		<label class={bem('label')} for="username">{$_('form.username.label')}</label>
		<input
			class={bem('input')}
			bind:value={$form.username}
			class:error={!!$errors?.username}
			id="username"
			name="username"
			placeholder={$_('form.username.placeholder')}
			autocomplete="username" />
		<FormError errors={$errors?.username} />
	</div>
	<div class={bem('input-wrapper')}>
		<label class={bem('label')} for="password">{$_('form.password.label')}</label>
		<input
			class={bem('input')}
			bind:value={$form.password}
			type="password"
			id="password"
			name="password"
			placeholder={$_('form.password.placeholder')}
			class:error={!!$errors?.password} />
		<FormError errors={$errors?.password} />
	</div>
	<div class={bem('input-wrapper')}>
		<label class={bem('label')} for="passwordConfirmation">{$_('form.passwordConfirmation.label')}</label>
		<input
			class={bem('input')}
			bind:value={$form.passwordConfirmation}
			class:error={!!$errors?.passwordConfirmation}
			type="password"
			id="passwordConfirmation"
			name="passwordConfirmation"
			placeholder={$_('form.passwordConfirmation.placeholder')} />
		<FormError errors={!$form?.passwordConfirmation ? $errors?.passwordConfirmation : $errors?._errors} />
	</div>
	<CheckboxInput
		inputId="agreeTerms"
		name="agreeTerms"
		label={$_('form.agreeTerms.label')}
		placeholder={$_('form.agreeTerms.placeholder')}
		bind:checked={$form.agreeTerms}
		bindedError={$errors?.agreeTerms} />
	<button type="submit" class="btn btn-primary btn-icon">{$_('register')}</button>
</form>

<style lang="scss">
	.form {
		&__form-container {
			display: flex;
			flex-direction: column;
			gap: rem(24);
		}

		&__form-title {
			color: #000;
			text-align: center;
			font-size: 14px;
			font-style: normal;
			font-weight: 700;
			line-height: 16px;
		}
		&__container {
			display: flex;
			flex-direction: column;
			gap: rem(24);
		}

		&__input-wrapper {
			display: flex;
			flex-direction: column;
			gap: rem(4);
			border: 1px solid #dcdcdc;
			border-radius: rem(12);
			padding: rem(12) rem(16);
		}

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

		&__input-wrapper input.error {
			border-color: red;
		}
	}
</style>
