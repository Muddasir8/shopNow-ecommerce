import Stripe from 'stripe';

if(!process.env.STRIPE_SCRET_KEY) {
    throw new Error ("STRIPE_SCRET_KEY is not set")
}

const stripe = new Stripe(process.env.STRIPE_SCRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});

export default stripe;