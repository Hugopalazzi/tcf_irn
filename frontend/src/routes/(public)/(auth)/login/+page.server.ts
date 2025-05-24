import type { Actions } from '@sveltejs/kit';
import { userLoginSchema } from '@tcf/models/forms/userSchema';
import { UserService } from '@tcf/services/supabase/user.service.js';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userLoginSchema));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userLoginSchema));
		const userService = new UserService(locals.supabase);
		return await userService.login(form);
	}
};
