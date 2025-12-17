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
  const eventDate = new Date()
  eventDate.setDate(eventDate.getDate() + 7)

  return (
    <div className="min-h-screen bg-background">
      <PromotionalBanner
        message="Grand Opening Sale! Get 25% off on all coffee beans"
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
  