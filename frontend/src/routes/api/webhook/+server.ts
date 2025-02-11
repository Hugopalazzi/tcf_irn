import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL, PUBLIC_STRIPE_WEBHOOK_API_SECRET } from '$env/static/public';
import { SECRET_STRIPE_KEY } from '$env/static/private';

// TODO : Remove supabase and stripe
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ request }) {
    try {
        const sig = request.headers.get('stripe-signature');
        const rawBody = await request.text();
        if (!sig || !rawBody) {
			
            return json({ error: 'Invalid request' }, { status: 400 });
        }

        const event: Stripe.Event = stripe.webhooks.constructEvent(rawBody, sig, PUBLIC_STRIPE_WEBHOOK_API_SECRET);

        if (!event?.data?.object) {
            return json({ error: 'No event data' }, { status: 400 });
        }

        const subscription = event.data.object as Stripe.Subscription;

        if (!subscription.customer || typeof subscription.customer !== 'string') {
            console.error('Error handling webhook: No valid customer ID found.');
            return json({ error: 'No customer found' }, { status: 500 });
        }

        const stripeCustomerId = subscription.customer;

        switch (event.type) {
            case 'payment_intent.succeeded':
                await supabase.from('user_payments').update({ subscription_status: 'active' }).eq('stripe_customer_id', stripeCustomerId);
                break;

            case 'customer.subscription.deleted': // Example: Handle subscription cancellation
                await supabase.from('user_payments').update({ subscription_status: 'canceled' }).eq('stripe_customer_id', stripeCustomerId);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return json({ received: true });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}