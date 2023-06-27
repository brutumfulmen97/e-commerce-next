"use client";

import { ReactNode, useEffect, useState } from "react";
import { useThemeStore } from "@/Store";

export default function Hydrate({ children }: { children: ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);
    const themeStore = useThemeStore();
    //wait till nextjs rehydration completes
    useEffect(() => {
        setIsHydrated(true);
    }, []);
    return (
        <>
            {isHydrated ? (
                <body className="px-8 lg:px-48" data-theme={themeStore.mode}>
                    {children}
                </body>
            ) : (
                <body className="px-8 lg:px-48">
                    <div className="w-full h-screen flex justify-center items-center">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                </body>
            )}
        </>
    );
}
