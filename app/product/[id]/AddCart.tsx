"use client";

import { useCartStore } from "@/Store";
import { AddCartType } from "@/types/AddCartType";
import { useState } from "react";

export default function AddCart({
    name,
    id,
    image,
    unit_amount,
    quantity,
}: AddCartType) {
    const [added, setAdded] = useState(false);
    const cartStore = useCartStore();

    const handleAddToCart = () => {
        cartStore.addProduct({
            name,
            id,
            image,
            unit_amount,
            quantity,
        });
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
        }, 500);
    };

    return (
        <>
            <button
                onClick={handleAddToCart}
                disabled={added}
                className="my-4 btn btn-primary w-full"
            >
                {!added ? "Add to cart" : "Adding to cart"}
            </button>
        </>
    );
}
