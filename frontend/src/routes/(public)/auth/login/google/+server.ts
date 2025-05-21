import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
	const { data } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: "/auth/callback"
		}
	});

	if (data.url) {
		redirect(307, data.url);
	}

	redirect(307, '/auth/error');
};
