import { PUBLIC_BASE_URL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
	const next = '/dashboard'; // or get from query params, or default
	const redirectTo = `${PUBLIC_BASE_URL}/auth/callback?next=${encodeURIComponent(next)}`;
	const { data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: redirectTo
		}
	});

	if (data.url) {
		redirect(307, data.url);
	}

	redirect(307, '/auth/error');
};
