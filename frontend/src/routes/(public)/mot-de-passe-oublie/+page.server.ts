import { userForgotPasswordSchema } from '@tcf/models/forms/userSchema';
import { message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userForgotPasswordSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userForgotPasswordSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { data: isEmailExist } = await locals.supabase.rpc('is_email_exist', { emailuser: form.data.email });

		if (!isEmailExist) {
			return fail(409, { form, code: 'email_exists' });
		}

		const { error } = await locals.supabase.auth.resetPasswordForEmail(form.data.email, {
			redirectTo: `${url.hostname}/modifier-mot-de-passe`
		});

		console.log(error);

		if (error && error.status) {
			const { status, code } = error;
			return fail(status, { form, code });
		} else {
			return message(form, 'Connexion au compte réussi');
		}
	}
};
