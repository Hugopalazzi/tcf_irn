<script lang="ts">
	import Button from '@tcf/lib/components/Atoms/Button.svelte';
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
	<span class={bem('form-title')}>{$_('form.login.title')}</span>
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

	<InputPassword
		inputId="password"
		name="password"
		label={$_('form.password.label')}
		placeholder={$_('form.password.placeholder')}
		bind:bindedValue={$form.password}
		bindedError={$errors?.password}
		autocomplete="current-password" />

	<a href="/mot-de-passe-oublie" onclick={() => {}} class={bem('forgot-password')}>{$_('form.login.forgotPasswordLabel')}</a>
	<Button
		onClick={() => {}}
		extraClass="centered-submit-button"
		color="primary"
		label={$_('form.login.submitButton')}
		disabled={$submitting}
		bind:submitting={$submitting} />
</form>
<span class={bem('redirect-label')}>
	{$_('form.login.redirectRegisterLabel')}
	<a href={$_('form.login.registerLink')} class={bem('redirect-link')}>{$_('form.login.redirectRegisterLink')}</a>
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
