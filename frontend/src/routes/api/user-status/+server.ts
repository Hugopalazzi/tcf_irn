import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import { error, json } from '@sveltejs/kit';

// TODO : Remove supabase and stripe
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function GET({ request }) {
	const token = request.headers.get('Authorization');
	if (!token) {
		return error(401, 'No token found');
	}
	const {
		data: { user }
	} = await supabase.auth.getUser(token);

	if (!user) return json({ hasPaid: false });

	const { data } = await supabase.from('user_payments').select('subscription_status').eq('user_id', user.id).single();

	return json({ hasPaid: data?.subscription_status === 'active' });
}
