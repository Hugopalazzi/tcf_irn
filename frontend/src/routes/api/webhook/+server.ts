import { json, type RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import { PUBLIC_STRIPE_WEBHOOK_API_SECRET } from '$env/static/public';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';
import { stripeClient } from '@tcf/lib/configs/stripe.config';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Get and validate the Stripe signature
		const sig = request.headers.get('stripe-signature');
		const rawBody = await request.text();

		if (!sig || !rawBody) {
			throw new Error('No signature or body found.');
		}

		// Verify and construct the event from Stripe
		let event: Stripe.Event;
		try {
			event = stripeClient.webhooks.constructEvent(rawBody, sig, PUBLIC_STRIPE_WEBHOOK_API_SECRET);
		} catch (err) {
			throw new Error('Invalid Stripe webhook signature.');
		}

		// Ensure event contains data
		if (!event?.data?.object) {
			throw new Error('No event data object found.');
		}

		const subscription = event.data.object as Stripe.Subscription;

		// Validate the customer ID
		if (!subscription.customer || typeof subscription.customer !== 'string') {
			throw new Error('No valid customer ID found.');
		}

		const stripeCustomerId = subscription.customer;

		// Handle different event types
		switch (event.type) {
			case 'payment_intent.succeeded':
				await supabaseClient.from('user_payments').update({ subscription_status: 'active' }).eq('stripe_customer_id', stripeCustomerId);
				break;

			case 'customer.subscription.deleted': // Handle subscription cancellation
				await supabaseClient.from('user_payments').update({ subscription_status: 'canceled' }).eq('stripe_customer_id', stripeCustomerId);
				break;

			default:
				console.warn(`Unhandled event type: ${event.type}`);
		}

		return json({ received: true });
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : 'Unknown error';
		errorLogger(500, `Error handling webhook: ${errorMessage}`);
		return json({ error: errorMessage }, { status: 500 });
	}
};
