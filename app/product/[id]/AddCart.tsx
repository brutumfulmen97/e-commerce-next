"use client";

import { useCartStore } from "@/Store";
import { AddCartType } from "@/types/AddCartType";

export default function AddCart({
    name,
    id,
    image,
    unit_amount,
    quantity,
}: AddCartType) {
    const cartStore = useCartStore();
    return (
        <>
            <button
                onClick={() =>
                    cartStore.addProduct({
                        name,
                        id,
                        image,
                        unit_amount,
                        quantity,
                    })
                }
                className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
            >
                Add to cart
            </button>
        </>
    );
}
