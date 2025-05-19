<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthenticationCard from '@tcf/lib/components/Organisms/AuthenticationCard.svelte';
	import RegisterForm from '@tcf/lib/components/Organisms/RegisterForm.svelte';
	import { addErrorToast, addSuccessToast } from '@tcf/lib/helpers/toastHelper.js';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema.js';
	import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
	import { _ } from 'svelte-i18n';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	const { data } = $props();

	const supForm = superForm(data.form, {
		validators: zod(userCreationAccountSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			if (result.type === 'success') {
				await goto(`/`).then(() => addSuccessToast($_('signUp.success'), 'top-center'));
			} else if (result.type === 'failure') {
				if (result.data?.form.valid === false) {
					return;
				}
				const { data } = result;
				let message = '';
				switch (data?.code) {
					case 'signup_disabled':
						message = $_('signUpErrors.signupDisabled');
						break;
					case 'email_address_invalid':
						message = $_('signUpErrors.emailAddressInvalid');
						break;
					case 'email_address_not_authorized':
						message = $_('signUpErrors.emailAddressNotAuthorized');
						break;
					case 'email_provider_disabled':
						message = $_('signUpErrors.emailProviderDisabled');
						break;
					case 'email_exists':
						message = $_('signUpErrors.emailExists');
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
</script>

<AuthenticationCard><RegisterForm {supForm} /></AuthenticationCard>
