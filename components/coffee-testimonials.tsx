import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Coffee Enthusiast",
    content:
      "The Ethiopia Yirgacheffe changed my morning routine completely. The floral notes are incredible, and knowing it's ethically sourced makes every cup even better.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Cafe Owner",
    content:
      "We've been serving Roastery beans at our cafe for two years now. Our customers constantly compliment the quality, and the consistency is unmatched.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Home Barista",
    content:
      "Finally found a roaster that understands what coffee lovers want. The subscription service means I never run out of my favorites, and the freshness is always perfect.",
    rating: 5,
  },
]

export function CoffeeTestimonials() {
  return (
    <section className="py-20 sm:py-24 border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-balance">
            Loved by coffee enthusiasts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of satisfied customers who start their day with our coffee
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="p-6 space-y-4 border-border bg-card">
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed">"{testimonial.content}"</p>
              <div className="pt-2">
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
