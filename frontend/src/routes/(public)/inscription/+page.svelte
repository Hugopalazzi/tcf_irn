<script lang="ts">
	import { goto } from '$app/navigation';
	import FormError from '@tcf/lib/FormError.svelte';
	import BackButton from '@tcf/lib/widgets/BackButton.svelte';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema.js';
	import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
	import { addErrorToast, addSuccessToast } from '@tcf/toast/toast.service.js';
	import { Envelope, Icon } from 'svelte-hero-icons';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data;

	const supForm = superForm(data.form, {
		validators: zod(userCreationAccountSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			if (result.type === 'success') {
				await goto(`/`).then(() => addSuccessToast(`Votre compte a bien été créé.`));
			} else if (result.type === 'error') {
				if (result.error?.message) {
					addErrorToast(result.error.message);
				} else {
					addErrorToast();
				}
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
		<h5 class="title">Register</h5>

		<form method="POST" autocomplete="off" use:enhance>
			<div class="input-wrapper">
				<label class="uppercase" for="email"> Your email </label>
				<input
					bind:value={$form.email}
					class:error={!!$errors?.email}
					id="email"
					name="email"
					placeholder="john.doe@mail.com"
				/>
				<FormError errors={$errors?.email} />
			</div>
			<div class="input-wrapper">
				<label class="uppercase" for="username"> Your username </label>
				<input
					bind:value={$form.username}
					class:error={!!$errors?.username}
					id="username"
					name="username"
					placeholder="johndoe"
				/>
				<FormError errors={$errors?.username} />
			</div>
			<div class="input-wrapper">
				<label class="uppercase" for="password"> Set password </label>
				<input
					bind:value={$form.password}
					type="password"
					id="password"
					name="password"
					placeholder="New password"
					class:error={!!$errors?.password}
				/>
				<FormError errors={$errors?.password} />
			</div>
			<div class="input-wrapper">
				<label class="uppercase" for="passwordConfirmation"> Password confirmation </label>
				<input
					bind:value={$form.passwordConfirmation}
					class:error={!!$errors?.passwordConfirmation}
					type="password"
					id="passwordConfirmation"
					name="passwordCconfirmation"
					placeholder="Confirm your password"
				/>
				<FormError
					errors={!$form?.passwordConfirmation ? $errors?.passwordConfirmation : $errors?._errors}
				/>
			</div>

			<button type="submit" class="btn btn-primary btn-icon">
				<Icon src={Envelope} size="18" />Sign Up
			</button>
		</form>
	</div>
</div>
