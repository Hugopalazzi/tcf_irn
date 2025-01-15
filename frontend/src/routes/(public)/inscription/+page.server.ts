import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userCreationAccountSchema));

	return {
		form
	};
};
export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const providentForm = await superValidate(formData, zod(userCreationAccountSchema));
		await locals.supabase.auth.signUp({
			email: providentForm.data.email,
			password: providentForm.data.password
		});

		return providentForm;
	}
};
