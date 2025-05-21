<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginForm from '@tcf/lib/components/Organisms/LoginForm.svelte';
	import { addErrorToast } from '@tcf/lib/helpers/toastHelper.js';
	import { userEmail } from '@tcf/lib/stores/loginEmailStore.js';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema';
	import { emailSchema, userLoginSchema } from '@tcf/models/forms/userSchema';
	import { _ } from 'svelte-i18n';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

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
						message = $_('commonErrors.overRequestRateLimit');
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

<LoginForm {supForm} />
