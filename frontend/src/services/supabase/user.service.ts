import type { SupabaseClient } from '@supabase/supabase-js';
import type { UserLoginForm, UserSignUpForm, UserModifyPasswordForm } from '@tcf/models/forms/userSchema';
import { fail, message } from 'sveltekit-superforms/client';

export class UserService {
	constructor(private supabaseClient: SupabaseClient) { }
	
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

	signUp = async (form: UserSignUpForm, url: URL) => {
		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			data: { email, password, username }
		} = form;
		try {
			const { data: isEmailExist } = await this.supabaseClient.rpc('is_email_exist', { emailuser: email });

			if (isEmailExist) {
				return fail(409, { form, code: 'email_exists' });
			}

			const { error } = await this.supabaseClient.auth.signUp({
				email: email,
				password: password,
				options: {
					data: {
						name: username
					},
					emailRedirectTo: `${url.protocol}//${url.host}/confirmation-email`
				}
			});

			if (error && error.status) {
				const { status, code } = error;
				return fail(status, { form, code });
			} else {
				return message(form, 'Création du compte réussi.');
			}
		} catch (error) {
			return fail(500, { form, error: 'Une erreur interne inconnue est survenue.' });
		}
	};

	modifyPassword = async (form: UserModifyPasswordForm) => {
		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			data: { user },
			error
		} = await this.supabaseClient.auth.updateUser({ password: form.data.password });
		if (error && error.status) {
			const { status, code } = error;
			if (!user) {
				return fail(status, { form, code: 'session_expired' });
			}
			return fail(status, { form, code });
		} else {
			return message(form, 'Votre mot de passe a été correctement mis à jour.');
		}

	};
}
