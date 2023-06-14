import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
    name: string;
    id: string;
    unit_amount: number;
    images?: string[];
    description: string;
    quantity: number;
};

type CartState = {
    isOpen: boolean;
    cart: CartItem[];
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
        }),
        {
            name: "cart-store",
        }
    )
);
