import Stripe from 'stripe';
import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_STRIPE_KEY } from '$env/static/private';

// TODO : Remove supabase and stripe
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ request }) {
	const { user_id, email } = await request.json();

	// Create a Stripe customer
	const customer = await stripe.customers.create({ email });

	// Save stripe_customer_id on Supabase
	await supabase.from('user_payments').insert({ user_id, stripe_customer_id: customer.id, subscription_status: 'inactive' });

	return json({ stripe_customer_id: customer.id });
}
