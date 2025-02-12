import { json } from '@sveltejs/kit';
import { stripeClient } from '@tcf/lib/configs/stripe.config'
import { errorLogger } from '@tcf/lib/helpers/errorHelper';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';

export async function POST({ request }) {
	const { user_id, email } = await request.json();
	if (!user_id || !email) {
		errorLogger(400, 'Error handling create stripe customer : no email or user id found.');
		return json({ error: 'Error handling create stripe customer : no sig or body found.' }, { status: 400 });
	}
	// Create a Stripe customer
	try {
		const customer = await stripeClient.customers.create({ email });

		// Save stripe_customer_id on Supabase
		await supabaseClient.from('user_payments').insert({ user_id, stripe_customer_id: customer.id, subscription_status: 'inactive' });

		return json({ stripe_customer_id: customer.id });
	} catch (error) {
		errorLogger(500, `Error handling create stripe customer:', ${error}`);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}

}
