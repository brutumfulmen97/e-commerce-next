"use-client";

import Image from "next/image";
import { useCartStore } from "@/Store";

export default function Cart() {
    const cartStore = useCartStore();
    return (
        <div>
            <h1>cart</h1>
        </div>
    );
}
