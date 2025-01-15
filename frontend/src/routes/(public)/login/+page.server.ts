import { userLoginSchema } from '@tcf/models/forms/userSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userLoginSchema));

	return {
		form
	};
};
export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const loginForm = await superValidate(formData, zod(userLoginSchema));

		await locals.supabase.auth.signInWithPassword({
			email: loginForm.data.email,
			password: loginForm.data.password,
		});

		return loginForm;
	}
};
