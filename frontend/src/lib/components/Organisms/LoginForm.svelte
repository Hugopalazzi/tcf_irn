<script lang="ts">
	import { createBEM } from '@tcf/lib/helpers/bemHelper';
	import { _ } from 'svelte-i18n';
	import type { SuperForm } from 'sveltekit-superforms';
	import FormError from '../Atoms/FormError.svelte';

	interface Props {
		supForm: SuperForm<any>;
	}

	let { supForm }: Props = $props();

	const { form, enhance, errors } = supForm;

	const bem = createBEM('form');
</script>

<div>
	<h3></h3>
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
			<a href="/mot-de-passe-oublie" onclick={() => {}}>Forgot your password ?</a>
			<button class="btn btn-primary btn-icon" type="submit">Login</button>
		</div>
	</form>
</div>
