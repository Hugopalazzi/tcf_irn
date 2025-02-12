import { json, type RequestHandler } from '@sveltejs/kit';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';

export const GET: RequestHandler = async ({ request }) => {
	try {
		// Get Authorization token from headers
		const token = request.headers.get('Authorization');

		if (!token) {
			throw new Error('No token found');
		}

		// Ensure the token starts with 'Bearer ' and extract the token part
		const tokenParts = token.split(' ');
		if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
			throw new Error('Invalid token format');
		}

		const actualToken = tokenParts[1]; // The token part after 'Bearer'
		// Get user from Supabase auth
		const { data: authData, error: authError } = await supabaseClient.auth.getUser(actualToken);

		if (authError || !authData?.user) {
			throw new Error('Invalid or expired token');
		}

		// Get user payment status
		const { data: paymentData, error: paymentError } = await supabaseClient
			.from('user_payments')
			.select('subscription_status')
			.eq('user_id', authData.user.id)
			.single();

		if (paymentError) {
			throw new Error('Failed to fetch payment data from user');
		}

		return json({ hasPaid: paymentData?.subscription_status === 'active' });
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		errorLogger(400, `Error handling user status : ${errorMessage}`);
		return json({ error: errorMessage }, { status: 400 });
	}
};
