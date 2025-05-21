<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import InputTextWrapperForm from '@tcf/lib/components/Molecules/InputTextWrapperForm.svelte';
	import Button from '@tcf/lib/components/Atoms/Button.svelte';

	interface Props {
		supForm: SuperForm<any>;
	}

	let { supForm }: Props = $props();

	const { form, enhance, errors } = supForm;

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

	<div class={bem('input-wrapper')}>
		<label class={bem('label')} for="password">{$_('form.password.label')}</label>
		<input
			class={bem('input')}
			bind:value={$form.password}
			type="password"
			id="password"
			name="password"
			placeholder={$_('form.password.placeholder')}
			autocomplete="current-password"
			class:error={!!$errors?.password} />
		<FormError errors={$errors?.password} />
	</div>

	<a href="/mot-de-passe-oublie" onclick={() => {}} class={bem('forgot-password')}>{$_('form.login.forgotPasswordLabel')}</a>
	<Button onClick={() => {}} extraClass="centered-submit-button" color="primary" label={$_('form.login.submitButton')}></Button>
	<span class={bem('redirect-login-register-label')}>
		{$_('form.login.redirectRegisterLabel')}
		<a href='/registration' class={bem('redirect-login-register-link')}>{$_('form.login.redirectRegisterLink')}</a>
	</span>
</form>

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
