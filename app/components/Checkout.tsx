"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/Store";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Checkout() {
    const cartStore = useCartStore();
    const [clientSecret, setClientSecret] = useState("");
    const router = useRouter();

    useEffect(() => {
        //create a paymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent,
            }),
        })
            .then((res) => {
                if (res.status === 403) {
                    // user is not authenticated
                    return router.push("/api/auth/signin");
                }
                return res.json();
                // set client secret and payment intent
            })
            .then((data) => {
                setClientSecret(data.paymentIntent.client_secret);
                cartStore.setPaymentIntent(data.paymentIntent.id);
            });
    }, []);

    return (
        <div>
            <h1>checkout</h1>
        </div>
    );
}
