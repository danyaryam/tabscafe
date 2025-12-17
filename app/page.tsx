'use client'

import { useMemo } from "react"
import { CoffeeHeader } from "@/components/coffee-header"
import { CoffeeHero } from "@/components/coffee-hero"
import { CoffeeProducts } from "@/components/coffee-products"
import { CoffeeStory } from "@/components/coffee-story"
import { CoffeeTestimonials } from "@/components/coffee-testimonials"
import { CoffeeSubscription } from "@/components/coffee-subscription"
import { CoffeeCta } from "@/components/coffee-cta"
import { CoffeeFooter } from "@/components/coffee-footer"
import { PromotionalBanner } from "@/components/promotional-banner"

export default function Home() {
  /**
   * useMemo untuk mencegah hydration mismatch
   * karena Date() bersifat non-deterministic antara server & client
   */
  const eventDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <PromotionalBanner
        message="Grand Opening Week! Get 25% off on all orders over Rp 100,000"
        eventDate={eventDate}
        autoHideAfter={300}
        backgroundColor="bg-accent"
      />

      <CoffeeHeader />

      <main>
        <CoffeeHero />
        <CoffeeProducts />
        <CoffeeStory />
        <CoffeeTestimonials />
        <CoffeeSubscription />
        <CoffeeCta />
      </main>

      <CoffeeFooter />
    </div>
  )
}
