import { userCreationAccountSchema } from '@tcf/models/forms/userSchema';
import { UserService } from '@tcf/services/supabase/user.service';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';

export const load = async () => {
	const form = await superValidate(zod(userCreationAccountSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userCreationAccountSchema));
		const userService = new UserService(locals.supabase);
		return await userService.signUp(form, url);
	}
};
