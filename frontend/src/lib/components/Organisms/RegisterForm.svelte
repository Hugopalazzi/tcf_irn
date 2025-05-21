<script lang="ts">
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import CheckboxInput from '@tcf/lib/components/Molecules/CheckboxInput.svelte';
	import InputPassword from '@tcf/lib/components/Molecules/InputPassword.svelte';
	import InputTextWrapperForm from '@tcf/lib/components/Molecules/InputTextWrapperForm.svelte';
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';

	interface Props {
		supForm: SuperForm<any>;
	}

	const { supForm }: Props = $props();

	const { form, enhance, errors, submitting } = supForm;

	const bem = createBEM('form');
</script>

<div class={bem('form-container')}>
	<span class={bem('form-title')}>{$_('form.registration.title')}</span>
</div>
<form method="POST" class={bem('container')} autocomplete="off" use:enhance>
	<InputTextWrapperForm
		inputId="email"
		name="email"
		label={$_('form.email.label')}
		placeholder={$_('form.email.placeholder')}
		bind:bindedValue={$form.email}
		bindedError={$errors?.email}
		autocomplete="email" />

	<InputTextWrapperForm
		inputId="username"
		name="username"
		label={$_('form.username.label')}
		placeholder={$_('form.username.placeholder')}
		bind:bindedValue={$form.username}
		bindedError={$errors?.username}
		autocomplete="username" />

	<InputPassword
		inputId="password"
		name="password"
		label={$_('form.password.label')}
		placeholder={$_('form.password.placeholder')}
		bind:bindedValue={$form.password}
		bindedError={$errors?.password}
		autocomplete="new-password" />

	<InputPassword
		inputId="passwordConfirmation"
		name="passwordConfirmation"
		label={$_('form.passwordConfirmation.label')}
		placeholder={$_('form.passwordConfirmation.placeholder')}
		bind:bindedValue={$form.passwordConfirmation}
		bindedError={!$form?.passwordConfirmation ? $errors?.passwordConfirmation : $errors?._errors}
		autocomplete="new-password" />

	<CheckboxInput
		inputId="agreeTerms"
		name="agreeTerms"
		label={$_('form.agreeTerms.label')}
		placeholder={$_('form.agreeTerms.placeholder')}
		bind:checked={$form.agreeTerms}
		bindedError={$errors?.agreeTerms} />

	<Button
		onClick={() => {}}
		extraClass="centered-submit-button"
		color="primary"
		label={$_('register')}
		disabled={$submitting}
		bind:submitting={$submitting}></Button>
	<span class={bem('redirect-label')}>
		{$_('form.registration.redirectLoginLabel')}
		<a href={$_('form.registration.loginLink')} class={bem('redirect-link')}>{$_('form.registration.redirectLoginLink')}</a>
	</span>
</form>
