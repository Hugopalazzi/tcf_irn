import { userResetPasswordSchema } from '@tcf/models/forms/userSchema';
import { message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userResetPasswordSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userResetPasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await locals.supabase.auth.updateUser(
			{ password: form.data.password },
		);

		if (error && error.status) {
			const { status, code } = error;
			return fail(status, { form, code });
		} else {
			return message(form, 'Votre mot de passe a été correctement mis à jour.');
		}
	}
};
