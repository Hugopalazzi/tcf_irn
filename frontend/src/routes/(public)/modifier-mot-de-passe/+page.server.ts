import type { Actions } from '@sveltejs/kit';
import { getParamValue } from '@tcf/lib/helpers/urlHelper';
import { userResetPasswordSchema } from '@tcf/models/forms/userSchema';
import { UserService } from '@tcf/services/supabase/user.service';
import { message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms/client';

export const load = async ({ locals, url }) => {
	const form = await superValidate(zod(userResetPasswordSchema));
	const searchParams = new URL(url).searchParams;
	const code = getParamValue(searchParams, 'code');
	await locals.supabase.auth.exchangeCodeForSession(code);

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(userResetPasswordSchema));
		const userService = new UserService(locals.supabase);
		return await userService.modifyPassword(form);
	}
};
