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
        <body className="`px-4 lg:px-48" data-theme={themeStore.mode}>
            {isHydrated ? <>{children}</> : <div>Loading...</div>}
        </body>
    );
}
