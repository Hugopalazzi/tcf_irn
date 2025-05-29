export async function createStripeCustomer(user: { id: string; email: string }) {
	const res = await fetch('/api/create-stripe-customer', {
		method: 'POST',
		body: JSON.stringify({ user_id: user.id, email: user.email }),
		headers: { 'Content-Type': 'application/json' }
	});
	const data = await res.json();
	return data.stripe_customer_id;
}
