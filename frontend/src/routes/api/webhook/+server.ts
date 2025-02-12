import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { PUBLIC_STRIPE_WEBHOOK_API_SECRET } from '$env/static/public';
import { errorLogger } from '@tcf/lib/helpers/errorHelper';
import { stripeClient } from '@tcf/lib/configs/stripe.config';
import { supabaseClient } from '@tcf/lib/configs/supabase.config';

export async function POST({ request }) {
	try {
		const sig = request.headers.get('stripe-signature');
		const rawBody = await request.text();
		if (!sig || !rawBody) {
			errorLogger(400, 'Error handling webhook: no sig or body found.');
			return json({ error: 'Error handling webhook: no sig or body found.' }, { status: 400 });
		}

		const event: Stripe.Event = stripeClient.webhooks.constructEvent(rawBody, sig, PUBLIC_STRIPE_WEBHOOK_API_SECRET);

		if (!event?.data?.object) {
			errorLogger(400, 'Error handling webhook: No event data object.');
			return json({ error: 'Error handling webhook: No event data object.' }, { status: 400 });
		}

		const subscription = event.data.object as Stripe.Subscription;

		if (!subscription.customer || typeof subscription.customer !== 'string') {
			errorLogger(500, 'Error handling webhook: No valid customer ID found.');
			return json({ error: 'Error handling webhook: No valid customer ID found.' }, { status: 500 });
		}

		const stripeCustomerId = subscription.customer;

		switch (event.type) {
			case 'payment_intent.succeeded':
				await supabaseClient.from('user_payments').update({ subscription_status: 'active' }).eq('stripe_customer_id', stripeCustomerId);
				break;

			case 'customer.subscription.deleted': // Example: Handle subscription cancellation
				await supabaseClient.from('user_payments').update({ subscription_status: 'canceled' }).eq('stripe_customer_id', stripeCustomerId);
				break;

			default:
				console.error(`Unhandled event type: ${event.type}`);
		}

		return json({ received: true });
	} catch (error) {
		errorLogger(500, `Error handling webhook:', ${error}`);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
