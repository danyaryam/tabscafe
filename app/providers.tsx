"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                {children}
                <Toaster />
            </CartProvider>
        </SessionProvider>
    )
}