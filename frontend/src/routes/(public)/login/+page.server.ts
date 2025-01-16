import { userLoginSchema } from '@tcf/models/forms/userSchema';
import { message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userLoginSchema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userLoginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await locals.supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error && error.status) {
			const { status, code } = error;
			return fail(status, { form, code });
		} else {
			return message(form, 'Connexion au compte réussi');
		}
	}
};
