import { getParamValue } from '@tcf/lib/helpers/urlHelper';
import { userResetPasswordSchema } from '@tcf/models/forms/userSchema';
import { message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms/client';

export const load = async ({ locals, url }) => {
	const form = await superValidate(zod(userResetPasswordSchema));
	const searchParams = new URL(url).searchParams;
	const code = getParamValue(searchParams, 'code');
	await locals.supabase.auth.exchangeCodeForSession(code);

	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userResetPasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const {
				data: { user },
				error
			} = await locals.supabase.auth.updateUser({ password: form.data.password });
			if (error && error.status) {
				const { status, code } = error;
				if (!user) {
					return fail(status, { form, code: 'session_expired' });
				}
				return fail(status, { form, code });
			} else {
				return message(form, 'Votre mot de passe a été correctement mis à jour.');
			}
		} catch (error) {
			return fail(500);
		}
	}
};
