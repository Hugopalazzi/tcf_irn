<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import InputTextWrapperForm from '../Molecules/InputTextWrapperForm.svelte';

	interface Props {
		supForm: SuperForm<any>;
	}

	let { supForm }: Props = $props();

	const { form, enhance, errors } = supForm;

	const bem = createBEM('form');
</script>

<form method="POST" class={bem('container')} autocomplete="off" use:enhance>
	<InputTextWrapperForm
    inputId="email"
    name="email"
	placeholder={$_('form.email.placeholder')}
    bind:bindedValue={$form.email}
    bindedError={$errors?.email}
    autocomplete="email" />
	<!-- <div class={bem('input-wrapper')}>
		<label class={bem('label')} for="email">{$_('form.email.label')}</label>
		<input
			class={bem('input')}
			bind:value={$form.email}
			class:error={!!$errors?.email}
			id="email"
			name="email"
			placeholder={$_('form.email.placeholder')}
			autocomplete="email" />
		<FormError errors={$errors?.email} />
	</div> -->
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
	<button type="submit" class="btn btn-primary btn-icon">Register</button>
</form>

<style lang="scss">
	.form {
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
