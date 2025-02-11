import Stripe from 'stripe';
import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SECRET_STRIPE_KEY } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { BASE_URL } from '$env/static/private';

// TODO : Remove supabase and stripe
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
const stripe = new Stripe(SECRET_STRIPE_KEY);

export const POST: RequestHandler = async ({ request }) => {
	const { user_id } = await request.json();
	// Get stripe_customer_id from Supabase
	const { data, error } = await supabase.from('user_payments').select('stripe_customer_id').eq('user_id', user_id).single();

	if (error || !data) return json({ error: 'Utilisateur introuvable' }, { status: 400 });
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			customer: data.stripe_customer_id, // Force user to be related to his id
			line_items: [{ price: 'price_1QpZtI2KtLRJi0s0QsR6MFhY', quantity: 1 }],
			mode: 'subscription',
			success_url: `${BASE_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${BASE_URL}/payment`
		});

		return json({ url: session.url });
	} catch (error) {
		console.log(error);
		return json({ error });
	}
};
