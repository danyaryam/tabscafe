"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CoffeeCta() {
  const scrollToStory = () => {
    const element = document.getElementById("story")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-accent p-12 sm:p-16 text-center">
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-accent-foreground text-balance">
              Start your journey to better coffee
            </h2>
            <p className="text-lg text-accent-foreground/90 max-w-2xl mx-auto text-pretty">
              Join our community of coffee lovers and experience the difference that quality makes. Get 15% off your
              first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products">
                <Button size="lg" variant="secondary" className="text-base">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Button
                onClick={scrollToStory}
                size="lg"
                variant="outline"
                className="text-base border-accent-foreground/20 text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
        </div>
      </div>
    </section>
  )
}
