import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

export const stripeClient = new Stripe(SECRET_STRIPE_KEY);
