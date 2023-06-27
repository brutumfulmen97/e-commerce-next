import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartType } from "./types/AddCartType";

type CartState = {
    isOpen: boolean;
    cart: AddCartType[];
    toggleCart: () => void;
    clearCart: () => void;
    addProduct: (item: AddCartType) => void;
    removeProduct: (item: AddCartType) => void;
    paymentIntent: string;
    setPaymentIntent: (val: string) => void;
    onCheckout: string;
    setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            paymentIntent: "",
            onCheckout: "cart",
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            clearCart: () => set((state) => ({ cart: [] })),
            addProduct: (item) => {
                set((state): any => {
                    const existingItem = state.cart.find(
                        (cartItem) => cartItem.id === item.id
                    );
                    if (existingItem) {
                        const updatedCart = state.cart.map((cartItem) =>
                            cartItem.id === item.id
                                ? {
                                      ...cartItem,
                                      quantity:
                                          cartItem.quantity! &&
                                          cartItem.quantity + 1,
                                  }
                                : cartItem
                        );
                        return { cart: updatedCart };
                    } else {
                        return {
                            cart: [...state.cart, { ...item, quantity: 1 }],
                        };
                    }
                });
            },
            removeProduct: (item) => {
                set((state): any => {
                    const existingItem = state.cart.find(
                        (cartItem) => cartItem.id === item.id
                    );
                    //if item exists and quantity is greater than 1
                    if (existingItem && existingItem.quantity! > 1) {
                        const updatedCart = state.cart.map((cartItem) =>
                            cartItem.id === item.id
                                ? {
                                      ...cartItem,
                                      quantity: cartItem.quantity! - 1,
                                  }
                                : cartItem
                        );
                        return { cart: updatedCart };
                    } else {
                        //remove item
                        const filteredCart = state.cart.filter(
                            (cartItem) => cartItem.id !== item.id
                        );
                        return { cart: filteredCart };
                    }
                });
            },
            setPaymentIntent: (val) =>
                set((state): any => ({ paymentIntent: val })),
            setCheckout: (val) => set((state): any => ({ onCheckout: val })),
        }),
        {
            name: "cart-store",
        }
    )
);
