import Stripe from 'stripe'
import { SECRET_STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function POST() {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        // note, for some EU-only payment methods it must be EUR
        currency: 'usd',
        // specify what payment methods are allowed
        // can be card, sepa_debit, ideal, etc...
        payment_method_types: ['card']
    })

    return {
        body: {
            clientSecret: paymentIntent.client_secret
        }
    }

}