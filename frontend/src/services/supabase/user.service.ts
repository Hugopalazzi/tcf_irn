import type { SupabaseClient } from '@supabase/supabase-js';
import type { UserLoginForm } from '@tcf/models/forms/userSchema';
import { fail, message } from 'sveltekit-superforms/client';

export class UserService {
	constructor(private supabaseClient: SupabaseClient) {}
	login = async (form: UserLoginForm) => {
		if (!form.valid) {
			return fail(400, { form });
		}

		const { error } = await this.supabaseClient.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) {
			return fail(error.status || 400, { form, code: error.code });
		}

		return message(form, 'Connexion au compte réussi.');
	};
}
