'use client'

import { CoffeeHero } from "@/components/coffee-hero"
import { CoffeeProducts } from "@/components/coffee-products"
import { CoffeeStory } from "@/components/coffee-story"
import { CoffeeTestimonials } from "@/components/coffee-testimonials"
import { CoffeeSubscription } from "@/components/coffee-subscription"
import { CoffeeCta } from "@/components/coffee-cta"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">

      <main>
        <CoffeeHero />
        <CoffeeProducts />
        <CoffeeStory />
        <CoffeeTestimonials />
        <CoffeeSubscription />
        <CoffeeCta />
      </main>

    </div>
  )
}
