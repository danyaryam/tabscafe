"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function CoffeeHero() {
  const scrollToShop = () => {
    const element = document.getElementById("shop")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToStory = () => {
    const element = document.getElementById("story")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
              Freshly Roasted Daily
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-balance">
              Your favorite cafe, now online
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-xl">
              Order premium coffee and treats from Cafe Tabs. Enjoy our specialty beverages, fresh pastries, and artisan
              blends delivered to your doorstep or ready for pickup.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToShop}
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base"
              >
                Explore Our Coffee
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={scrollToStory} size="lg" variant="outline" className="text-base bg-transparent">
                Learn Our Process
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Fresh Daily</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-sm text-muted-foreground">Menu Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">15k+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] lg:h-[600px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-muted">
              <img
                src="/artisan-coffee-beans-being-poured.jpg"
                alt="Coffee beans"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
