// app/(public)/layout.tsx
import { CoffeeFooter } from "@/components/coffee-footer"
import { CoffeeHeader } from "@/components/coffee-header"
import { PromotionalBanner } from "@/components/promotional-banner"
import type { ReactNode } from "react"
import { useMemo } from "react"

export default function PublicLayout({
    children,
}: {
    children: ReactNode
}) {
    const eventDate = useMemo(() => {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        return date
    }, [])

    return (
        <>
            <PromotionalBanner
                message="Grand Opening Week! Get 25% off on all orders over Rp 100,000"
                eventDate={eventDate}
                autoHideAfter={300}
                backgroundColor="bg-accent"
            />
            <CoffeeHeader />
            <main>
                {children}
            </main>
            <CoffeeFooter />
        </ >
    )
}
