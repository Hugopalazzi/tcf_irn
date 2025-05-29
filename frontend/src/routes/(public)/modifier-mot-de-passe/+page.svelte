<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '@tcf/lib/components/Atoms/BackButton.svelte';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import { addErrorToast, addSuccessToast } from '@tcf/lib/helpers/toastHelper';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { userResetPasswordSchema } from '@tcf/models/forms/userSchema';
	import { Envelope, Icon } from 'svelte-hero-icons';
	import { m } from '$lib/paraglide/messages.js';
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
				await goto(`/dashboard`).then(() =>
					addSuccessToast(m['signUp.success'](), 'top-center')
				);
			} else if (type === 'failure') {
				const { data } = result;
				const isFormValid = (await validateForm()).valid;
				if (isFormValid) {
					let message = '';
					switch (data?.code) {
						case 'reauthentication_needed':
							message = m['resetPasswordErrors.reauthenticationNeeded']();
							break;
						case 'same_password':
							message = m['resetPasswordErrors.samePassword']();
							break;
						case 'weak_password':
							message = m['resetPasswordErrors.weakPassword']();
							break;
						case 'session_expired':
							message = m['commonErrors.sessionExpired']();
							break;
						case 'over_request_rate_limit':
							message = m['commonErrors.overRequestRateLimit']();
							break;
						default:
							message = m['commonErrors.defaultError']();
							break;
					}
					addErrorToast(message);
				}
			}
		}
	});
	const { form, enhance, errors, validateForm } = supForm;
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
				<label class="uppercase" for="passwordConfirmation">
					Password confirmation
				</label>
				<input
					bind:value={$form.passwordConfirmation}
					class:error={!!$errors?.passwordConfirmation}
					type="password"
					id="passwordConfirmation"
					name="passwordCconfirmation"
					placeholder="Confirm your password" />
				<FormError
					errors={!$form?.passwordConfirmation
						? $errors?.passwordConfirmation
						: $errors?._errors} />
			</div>

			<div class="link-button-wrapper">
				<button class="btn btn-primary btn-icon" type="submit">
					<Icon src={Envelope} size="18" />Changer mon mot de passe
				</button>
			</div>
		</form>
	</div>
</div>
