"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import dance from "@/public/dance.webp";
import Link from "next/link";
import { useCartStore } from "@/Store";
import { useEffect } from "react";

export default function OrderConfirmed() {
    const cartStore = useCartStore();

    useEffect(() => {
        // clear cart
        cartStore.clearCart();
        cartStore.setPaymentIntent("");
    }, []);

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center my-12"
        >
            <div className="flex flex-col items-center p-12 rounded-md text-center">
                <h1 className="text-xl font-medium">
                    Your order has been placed 🚀
                </h1>
                <h2 className="font-sm my-4">
                    Check your email for the receipt.
                </h2>
                <Image
                    src={dance}
                    alt="dance"
                    width={300}
                    height={300}
                    className="py-4"
                />
                <div className="flex items-center justify-center gap-12">
                    <Link href={"/dashboard"}>
                        <button
                            onClick={() => {
                                setTimeout(() => {
                                    cartStore.setCheckout("cart");
                                }, 1000);
                                cartStore.toggleCart();
                            }}
                            className="font-medium"
                        >
                            Check your order
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
