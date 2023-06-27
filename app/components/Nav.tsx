"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { useCartStore } from "@/Store";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ user }: Session) {
    const cartStore = useCartStore();
    return (
        <nav className="flex justify-between items-center py-12">
            <Link href={"/"}>
                <h1>NAVIGACIJA</h1>
            </Link>
            <ul className="flex items-center gap-12">
                <li
                    onClick={() => cartStore.toggleCart()}
                    className="flex items-center text-3xl relative cursor-pointer"
                >
                    <AiFillShopping />
                    <AnimatePresence>
                        {cartStore.cart.length > 0 && (
                            <motion.span
                                animate={{ scale: 1 }}
                                initial={{ scale: 0 }}
                                exit={{ scale: 0 }}
                                className="bg-primary text-white text-sm rounded-full font-bold w-5 h-5 absolute left-4 bottom-4 flex items-center justify-center"
                            >
                                {cartStore.cart.length}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </li>
                {!user && (
                    <li className="bg-primary text-white py-2 px-4 rounded-md">
                        <button
                            onClick={() => {
                                signIn();
                            }}
                        >
                            Sign in
                        </button>
                    </li>
                )}
                {user && (
                    <li>
                        <div className="dropdown dropdown-end cursor-pointer">
                            <Image
                                src={user?.image as string}
                                alt={user?.name as string}
                                width={36}
                                height={36}
                                className="rounded-full"
                                tabIndex={0}
                            />
                            <ul
                                tabIndex={0}
                                className="p-4 space-y-4 shadow menu z-[1] dropdown-content bg-base-100 rounded-box w-72"
                            >
                                <li>
                                    <Link
                                        href={"/dashboard"}
                                        onClick={() => {
                                            if (
                                                document.activeElement instanceof
                                                HTMLElement
                                            ) {
                                                (
                                                    document.activeElement as HTMLElement
                                                ).blur();
                                            }
                                        }}
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <p
                                        onClick={() => {
                                            if (
                                                document.activeElement instanceof
                                                HTMLElement
                                            ) {
                                                (
                                                    document.activeElement as HTMLElement
                                                ).blur();
                                            }
                                            signOut();
                                        }}
                                    >
                                        Signout
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </li>
                )}
            </ul>
            <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
        </nav>
    );
}
