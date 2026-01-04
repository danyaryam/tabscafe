"use client"

import { Providers } from "../providers"
import { ThemeProvider } from "@/lib/theme-provider"
import { BannerProvider } from "@/lib/banner-context"
import { CoffeeHeader } from "@/components/coffee-header"
import { CoffeeFooter } from "@/components/coffee-footer"
import { PromotionalBanner } from "@/components/promotional-banner"
import { useMemo } from "react"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const eventDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    return d
  }, [])

  return (
    <ThemeProvider>
      <Providers>
        <BannerProvider>
          <PromotionalBanner
            message="Grand Opening Week! Get 25% off on all orders over Rp 100,000"
            eventDate={eventDate}
            autoHideAfter={1000}
            backgroundColor="bg-accent"
          />

          <CoffeeHeader />
          <main>{children}</main>
          <CoffeeFooter />
        </BannerProvider>
      </Providers>
    </ThemeProvider>
  )
}
