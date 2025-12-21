import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CoffeeHeader } from "@/components/coffee-header"
import { CoffeeFooter } from "@/components/coffee-footer"
import { useMemo } from "react"
import { PromotionalBanner } from "@/components/promotional-banner"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cafe Tabs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const eventDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  }, [])

  return (
    <html lang="en" >
      <body className={`${geist.className} antialiased`}>
        <PromotionalBanner
          message="Grand Opening Week! Get 25% off on all orders over Rp 100,000"
          eventDate={eventDate}
          autoHideAfter={300}
          backgroundColor="bg-accent"
        />

        <Providers>
          <CoffeeHeader />
          {children}
          <CoffeeFooter />
        </Providers>

        <ScrollToTop />
        <Analytics />

      </body>
    </html>
  )
}
