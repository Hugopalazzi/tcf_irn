import { userLoginSchema } from '@tcf/models/forms/userSchema';
import { UserService } from '@tcf/services/supabase/user.service.js';
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

		const userService = new UserService(locals.supabase);
		return await userService.login(form);
	}
};
