import { error, json } from '@sveltejs/kit';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';


export async function GET({ request }) {
	const token = request.headers.get('Authorization');
	if (!token) {
		return error(401, 'No token found');
	}
	const {
		data: { user }
	} = await supabaseClient.auth.getUser(token);

	if (!user) return json({ hasPaid: false });

	const { data } = await supabase.from('user_payments').select('subscription_status').eq('user_id', user.id).single();

	return json({ hasPaid: data?.subscription_status === 'active' });
}
