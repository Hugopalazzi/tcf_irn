<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '@tcf/lib/components/Atoms/BackButton.svelte';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import { addErrorToast, addSuccessToast } from '@tcf/lib/helpers/toastHelper';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { userResetPasswordSchema } from '@tcf/models/forms/userSchema';
	import { Envelope, Icon } from 'svelte-hero-icons';
	import { _ } from 'svelte-i18n';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const supForm = superForm(data.form, {
		validators: zod(userResetPasswordSchema),
		...superFormDefaultConfig,

		async onResult({ result }) {
			const { type } = result;
			if (type === 'success') {
				await goto(`/dashboard`).then(() => addSuccessToast($_('signUp.success'), 'top-center'));
			} else if (type === 'failure') {
				const { data } = result;
				let message = '';

				switch (data?.code) {
					case 'email_not_confirmed':
						message = $_('loginErrors.emailNotConfirmed');
						break;
					case 'user_not_found':
						message = $_('loginErrors.userNotFound');
						break;
					case 'user_banned':
						message = $_('loginErrors.userBanned');
						break;
					case 'over_request_rate_limit':
						message = $_('loginErrors.overRequestRateLimit');
						break;
					default:
						message = $_('commonErrors.defaultError');
						break;
				}
				addErrorToast(message);
			}
		}
	});
	const { form, enhance, errors } = supForm;
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h5>Apprenez le francais en vous amusant avec Mystory.</h5>
	</div>
	<div class="right-size">
		<BackButton />
		<h5 class="title">Mot de passe oublié</h5>

		<form method="POST" autocomplete="off" use:enhance>
			<div class="input-wrapper">
				<label class="uppercase" for="password">Set password</label>
				<input
					bind:value={$form.password}
					type="password"
					id="password"
					name="password"
					placeholder="New password"
					class:error={!!$errors?.password} />
				<FormError errors={$errors?.password} />
			</div>
			<div class="input-wrapper">
				<label class="uppercase" for="passwordConfirmation">Password confirmation</label>
				<input
					bind:value={$form.passwordConfirmation}
					class:error={!!$errors?.passwordConfirmation}
					type="password"
					id="passwordConfirmation"
					name="passwordCconfirmation"
					placeholder="Confirm your password" />
				<FormError errors={!$form?.passwordConfirmation ? $errors?.passwordConfirmation : $errors?._errors} />
			</div>

			<div class="link-button-wrapper">
				<button class="btn btn-primary btn-icon" type="submit">
					<Icon src={Envelope} size="18" />Changer mon mot de passe
				</button>
			</div>
		</form>
	</div>
</div>
