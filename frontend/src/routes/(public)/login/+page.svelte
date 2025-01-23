<script lang="ts">
	import { goto } from '$app/navigation';
	import FormError from '@tcf/lib/components/Atoms/FormError.svelte';
	import BackButton from '@tcf/lib/components/Atoms/BackButton.svelte';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { emailSchema, userLoginSchema } from '@tcf/models/forms/userSchema';
	import { Envelope, Icon } from 'svelte-hero-icons';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { addErrorToast } from '@tcf/lib/helpers/toastHelper.js';
	import { _ } from 'svelte-i18n';
	import { userEmail } from '@tcf/lib/stores/loginEmailStore.js';

	export let data;

	const supForm = superForm(data.form, {
		validators: zod(userLoginSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			const { type } = result;
			if (type === 'success') {
				await goto(`/dashboard`);
			} else if (type === 'failure') {
				const { data } = result;
				let message = '';

				switch (data?.code) {
					case 'email_not_confirmed':
						message = $_('loginErrors.emailNotConfirmed');
						break;
					case 'invalid_credentials':
						message = $_('loginErrors.invalidCredentials');
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

	const onForgotPasswordClick = () => {
		try {
			const { email } = $form;
			emailSchema.parse(email);
			userEmail.set($form.email);
		} catch {}
	};
</script>

<div class="page-container">
	<div class="left-size">
		<img class="logo" src="/assets/images/logo_my_story.png" alt="My story" />
		<h5>Apprenez le francais en vous amusant avec Mystory.</h5>
	</div>
	<div class="right-size">
		<BackButton />
		<h5 class="title">Login</h5>

		<form method="POST" autocomplete="off" use:enhance>
			<div class="input-wrapper">
				<label class="uppercase" for="email">Your email</label>
				<input bind:value={$form.email} class:error={!!$errors?.email} id="email" name="email" placeholder="john.doe@mail.com" />
				<FormError errors={$errors?.email} />
			</div>
			<div class="input-wrapper">
				<label class="uppercase" for="password">Your password</label>
				<input bind:value={$form.password} class:error={!!$errors?.password} type="password" id="password" name="password" placeholder="password" />
				<FormError errors={$errors?.password} />
			</div>

			<div class="link-button-wrapper">
				<a
					href="/mot-de-passe-oublie"
					onclick={() => {
						onForgotPasswordClick();
					}}>
					Forgot your password ?
				</a>
				<button class="btn btn-primary btn-icon" type="submit">
					<Icon src={Envelope} size="18" />Log in
				</button>
			</div>
		</form>
	</div>
</div>

<style lang="scss">
	.link-button-wrapper {
		display: flex;
		flex-direction: column;
		place-items: center;
		gap: rem(4);
	}
</style>
