import { BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase }, url }) => {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${BASE_URL}/auth/callback`
		}
	});

	if (data.url) {
		redirect(307, data.url);
	}

	redirect(307, '/auth/error');
};
