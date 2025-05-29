<script lang="ts">
	import { goto } from '$app/navigation';
	import RegisterForm from '@tcf/lib/components/Organisms/RegisterForm.svelte';
	import { addErrorToast, addSuccessToast } from '@tcf/lib/helpers/toastHelper.js';
	import { superFormDefaultConfig } from '@tcf/models/forms/commonSchema.js';
	import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
	import { m } from '$lib/paraglide/messages.js';
	import { superForm, superValidate } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';

	const { data } = $props();

	const supForm = superForm(data.form, {
		validators: zod(userCreationAccountSchema),
		...superFormDefaultConfig,
		resetForm: true,

		async onResult({ result }) {
			if (result.type === 'success') {
				await goto(`/login`).then(() => addSuccessToast(m['signUp.success'](), 'top-center'));
			} else if (result.type === 'failure') {
				const formValidate = await superValidate(result.data?.form.data, zod(userCreationAccountSchema));
				if (formValidate.valid === false) {
					return;
				}
				const { data } = result;
				let message = '';
				switch (data?.code) {
					case 'signup_disabled':
						message = m['signUpErrors.signupDisabled']();
						break;
					case 'email_address_invalid':
						message = m['signUpErrors.emailAddressInvalid']();
						break;
					case 'email_address_not_authorized':
						message = m['signUpErrors.emailAddressNotAuthorized']();
						break;
					case 'email_provider_disabled':
						message = m['signUpErrors.emailProviderDisabled']();
						break;
					case 'email_exists':
						message = m['signUpErrors.emailExists']();
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
	});
</script>

<RegisterForm {supForm} />
