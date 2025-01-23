<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '@tcf/lib/components/Atoms/BackButton.svelte';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import { addErrorToast } from '@tcf/lib/helpers/toastHelper';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { userForgotPasswordSchema } from '@tcf/models/forms/userSchema';
	import { Envelope, Icon } from 'svelte-hero-icons';
	import { _ } from 'svelte-i18n';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import PasswordResetEmail from '@tcf/lib/components/Molecules/PasswordResetEmail.svelte';
	import { userEmail } from '@tcf/lib/stores/loginEmailStore';

	const { data }: { data: PageData } = $props();
	let emailSent = $state(false);

	const supForm = superForm(data.form, {
		validators: zod(userForgotPasswordSchema),
		...superFormDefaultConfig,

		async onResult({ result }) {
			const { type } = result;
			if (type === 'success') {
				emailSent = true;
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
	$form.email = $userEmail;
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h5>Apprenez le francais en vous amusant avec Mystory.</h5>
	</div>
	<div class="right-size">
		<BackButton />
		{#if !emailSent}
			<h5 class="title">Mot de passe oublié</h5>

			<form method="POST" autocomplete="off" use:enhance>
				<div class="input-wrapper">
					<label class="uppercase" for="email">Your email</label>
					<input bind:value={$form.email} class:error={!!$errors?.email} id="email" name="email" placeholder="john.doe@mail.com" />
					<FormError errors={$errors?.email} />
				</div>

				<div class="link-button-wrapper">
					<button class="btn btn-primary btn-icon" type="submit">
						<Icon src={Envelope} size="18" />Recevoir un email
					</button>
				</div>
			</form>
		{:else}
			<PasswordResetEmail email={$form.email} />
		{/if}
	</div>
</div>
