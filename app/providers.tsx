"use client"

import { ReactNode } from "react"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"
import { RecentlyViewedProvider } from "@/lib/recently-viewed-context"
import { CategoryProvider } from "@/lib/category-context"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <CategoryProvider>
            <RecentlyViewedProvider>
                <CartProvider>
                    {children}
                    <Toaster />
                </CartProvider>
            </RecentlyViewedProvider>
        </CategoryProvider>
    )
}