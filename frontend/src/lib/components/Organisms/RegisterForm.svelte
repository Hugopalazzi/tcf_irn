<script lang="ts">
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import CheckboxInput from '@tcf/lib/components/Molecules/CheckboxInput.svelte';
	import InputPassword from '@tcf/lib/components/Molecules/InputPassword.svelte';
	import InputTextWrapperForm from '@tcf/lib/components/Molecules/InputTextWrapperForm.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { m } from '$lib/paraglide/messages.js';
	import type { SuperForm } from 'sveltekit-superforms';

	interface Props {
		supForm: SuperForm<any>;
	}

	const { supForm }: Props = $props();

	const { form, enhance, errors, submitting } = supForm;

	const bem = createBEM('form');
</script>

<div class={bem('form-container')}>
	<span class={bem('form-title')}>{m['form.registration.title']()}</span>
</div>
<form method="POST" class={bem('container')} autocomplete="off" use:enhance>
	<InputTextWrapperForm
		inputId="email"
		name="email"
		label={m['form.email.label']()}
		placeholder={m['form.email.placeholder']()}
		bind:bindedValue={$form.email}
		bindedError={$errors?.email}
		autocomplete="email" />

	<InputTextWrapperForm
		inputId="username"
		name="username"
		label={m['form.username.label']()}
		placeholder={m['form.username.placeholder']()}
		bind:bindedValue={$form.username}
		bindedError={$errors?.username}
		autocomplete="username" />

	<InputPassword
		inputId="password"
		name="password"
		label={m['form.password.label']()}
		placeholder={m['form.password.placeholder']()}
		bind:bindedValue={$form.password}
		bindedError={$errors?.password}
		autocomplete="new-password" />

	<InputPassword
		inputId="passwordConfirmation"
		name="passwordConfirmation"
		label={m['form.passwordConfirmation.label']()}
		placeholder={m['form.passwordConfirmation.placeholder']()}
		bind:bindedValue={$form.passwordConfirmation}
		bindedError={!$form?.passwordConfirmation
			? $errors?.passwordConfirmation
			: $errors?._errors}
		autocomplete="new-password" />

	<CheckboxInput
		inputId="agreeTerms"
		name="agreeTerms"
		label={m['form.agreeTerms.label']()}
		bind:checked={$form.agreeTerms}
		bindedError={$errors?.agreeTerms} />

	<Button
		onClick={() => {}}
		extraClass="centered-submit-button"
		color="primary"
		label={m['register']()}
		disabled={$submitting}
		bind:submitting={$submitting}></Button>
</form>
<span class={bem('redirect-label')}>
	{m['form.registration.redirectLoginLabel']()}
	<a href={m['form.registration.loginLink']()} class={bem('redirect-link')}>
		{m['form.registration.redirectLoginLink']()}
	</a>
</span>
