import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';
import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(userCreationAccountSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const form = await superValidate(formData, zod(userCreationAccountSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			data: { email, password, username }
		} = form;

		try {
			const { data: isEmailExist } = await locals.supabase.rpc('is_email_exist', { emailuser: email });

			if (isEmailExist) {
				return fail(409, { form, code: 'email_exists' });
			}

			const { error } = await locals.supabase.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						name: username
					}
				}
			});

			if (error && error.status) {
				const { status, code } = error;
				return fail(status, { form, code });
			} else {
				return message(form, 'Création du compte réussi');
			}
		} catch (error) {
			console.error(error);
		}
	}
};
