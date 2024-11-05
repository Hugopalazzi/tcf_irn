<script lang="ts">
	import { goto } from '$app/navigation';
	import FormError from '@tcf/lib/FormError.svelte';
	import BackButton from '@tcf/lib/widgets/BackButton.svelte';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { userLoginSchema } from '@tcf/models/forms/userSchema';
	import { addErrorToast } from '@tcf/toast/toast.service';
	import { Envelope, Icon } from 'svelte-hero-icons';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	export let data;

	const supForm = superForm(data.form, {
		validators: zod(userLoginSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			if (result.type === 'success') {
				await goto(`/tableau-de-bord`);
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
		<h5 class="title">Login</h5>

		<form method="POST" autocomplete="off" use:enhance>
			<div class="input-wrapper">
				<label for="email"> Your email </label>
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
				<label for="password"> Your password </label>
				<input
					bind:value={$form.password}
					class:error={!!$errors?.password}
					type="password"
					id="password"
					name="password"
					placeholder="password"
				/>
				<FormError errors={$errors?.password} />
			</div>

			<div class="link-button-wrapper">
				<a href="forgot-password"> Forgot your password ?</a>
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
