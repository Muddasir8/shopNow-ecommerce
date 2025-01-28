import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { Metadata } from "../../../../action/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: NextRequest){
    const body = await req.text();
    const headerList = await headers();
    const sig = headerList.get("stripe-signature");

    if(!sig) {
        return NextResponse.json({error: "NO Signature"}, {status: 400});
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SCRET_KEY;

    if(!webhookSecret){
        console.log("Webhook secret is not set");
        return NextResponse.json(
            {error: "Stripe webhook secret is not set"},
            {status: 400}
        );
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (error) {
        console.error("Webhook signature verification failed:", error)
        return NextResponse.json(
            {error: `Webhook Error: ${error}`},
            {status: 400}
        );
    }

    if(event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order create in sanity:", order);
        } catch (error) {
            console.error("Error creating order in sanity:", error);
            return NextResponse.json(
                {error: "Error creating order"},
                {status: 500}
            );
        }
    }
    return NextResponse.json({received: true });
}


async function createOrderInSanity(session:Stripe.Checkout.Session) {
    const{
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details,
    } = session;

    const {orderNumber, customerName, customerEmail, clerkUserId} = 
    metadata as Metadata;

    const lineItemWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"],
        }
    );

    const sanityProduct = lineItemWithProduct.data.map((item) =>({
        key: crypto.randomUUID(),
        product: {
            type: "reference",
            ref: (item.price?.product as Stripe.Product)?.metadata.id,
        },
        quantity: item.quantity || 0,
    }));
    const order = await backendClient.create({
        type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntendId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
        products: sanityProduct,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
        _type: ""
    });
    return order;
}