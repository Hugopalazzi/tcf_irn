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

		await locals.supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					name: form.data.username
				}
			}
		});

		return message(form, 'Création du compte réussis');
	}
};
