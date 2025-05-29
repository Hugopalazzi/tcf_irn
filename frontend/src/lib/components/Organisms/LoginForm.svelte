<script lang="ts">
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
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
	<span class={bem('form-title')}>{m['form.login.title']()}</span>
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

	<InputPassword
		inputId="password"
		name="password"
		label={m['form.password.label']()}
		placeholder={m['form.password.placeholder']()}
		bind:bindedValue={$form.password}
		bindedError={$errors?.password}
		autocomplete="current-password" />

	<a href="/mot-de-passe-oublie" onclick={() => {}} class={bem('forgot-password')}>
		{m['form.login.forgotPasswordLabel']()}
	</a>
	<Button
		onClick={() => {}}
		extraClass="centered-submit-button"
		color="primary"
		label={m['form.login.submitButton']()}
		disabled={$submitting}
		bind:submitting={$submitting} />
</form>
<span class={bem('redirect-label')}>
	{m['form.login.redirectRegisterLabel']()}
	<a href={m['form.login.registerLink']()} class={bem('redirect-link')}>
		{m['form.login.redirectRegisterLink']()}
	</a>
</span>

<style lang="scss">
	.form {
		&__forgot-password {
			color: #7f7f7f;
			text-align: center;
			font-size: rem(14);
			font-style: normal;
			font-weight: 700;
			line-height: rem(16);
		}
	}
</style>
