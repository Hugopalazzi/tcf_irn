import { json, type RequestHandler } from '@sveltejs/kit';
import { stripeClient } from '@tcf/lib/configs/stripe.config';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Ensure request has a body before parsing
		if (!request.body) {
			throw new Error('Request body is empty');
		}

		let requestData: { user_id?: string; email?: string };
		try {
			requestData = await request.json();
		} catch {
			throw new Error('Invalid JSON payload');
		}

		const { user_id, email } = requestData;
		if (!user_id || !email) {
			throw new Error('Missing required fields: user_id or email');
		}

		// Create a Stripe customer
		const customer = await stripeClient.customers.create({ email });

		// Save stripe_customer_id in Supabase
		await supabaseClient
			.from('user_payments')
			.insert({ user_id, stripe_customer_id: customer.id, subscription_status: 'inactive' });

		return json({ stripe_customer_id: customer.id });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		errorLogger(400, `Error handling create stripe customer: ${errorMessage}`);
		return json({ error: errorMessage }, { status: 400 });
	}
};
