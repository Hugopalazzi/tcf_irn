<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';
	import InputTextWrapperForm from '@tcf/lib/components/Molecules/InputTextWrapperForm.svelte';
	import CheckboxInput from '@tcf/lib/components/Molecules/CheckboxInput.svelte';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
	import FormError from '../Atoms/FormError.svelte';

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
		
	<div class={bem('input-wrapper')}>
		<label class={bem('label')} for="password">{$_('form.password.label')}</label>
		<input
			class={bem('input')}
			bind:value={$form.password}
			type="password"
			id="password"
			name="password"
			placeholder={$_('form.password.placeholder')}
			autocomplete="new-password"
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
			placeholder={$_('form.passwordConfirmation.placeholder')} 
			autocomplete="new-password" />
		<FormError errors={!$form?.passwordConfirmation ? $errors?.passwordConfirmation : $errors?._errors} />
	</div>
	
	<CheckboxInput
		inputId="agreeTerms"
		name="agreeTerms"
		label={$_('form.agreeTerms.label')}
		placeholder={$_('form.agreeTerms.placeholder')}
		bind:checked={$form.agreeTerms}
		bindedError={$errors?.agreeTerms} />

	<Button onClick={() => {}} extraClass="centered-submit-button" color="primary" label={$_('register')}></Button>
</form>
