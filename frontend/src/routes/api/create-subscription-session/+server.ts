import { json, type RequestHandler } from '@sveltejs/kit';
import { stripeClient } from '@tcf/lib/configs/stripe.config';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Ensure request has a body before parsing
		if (!request.body) {
			throw new Error('Request body is empty');
		}

		let requestData: { user_id?: string };
		try {
			requestData = await request.json();
		} catch {
			throw new Error('Invalid JSON payload');
		}

		const { user_id } = requestData;
		if (!user_id) {
			throw new Error('Missing required field: user_id');
		}

		// Get stripe_customer_id from Supabase
		const { data, error } = await supabaseClient
			.from('user_payments')
			.select('stripe_customer_id')
			.eq('user_id', user_id)
			.single();

		if (error || !data?.stripe_customer_id) {
			throw new Error('Utilisateur introuvable');
		}

		// Create a Stripe checkout session
		const session = await stripeClient.checkout.sessions.create({
			payment_method_types: ['card'],
			customer: data.stripe_customer_id, // Ensure the customer ID is linked to the user
			line_items: [{ price: 'price_1QpZtI2KtLRJi0s0QsR6MFhY', quantity: 1 }],
			mode: 'subscription',
			success_url: "/payment?session_id={CHECKOUT_SESSION_ID}",
			cancel_url: "/payment"
		});

		return json({ url: session.url });
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		errorLogger(400, `Error handling create subscription session: ${errorMessage}`);
		return json({ error: errorMessage }, { status: 400 });
	}
};
