"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    name: "Starter",
    price: "$24",
    description: "Perfect for casual coffee drinkers",
    features: ["1 bag per month (12oz)", "Choose your roast level", "Free shipping", "Cancel anytime"],
  },
  {
    name: "Enthusiast",
    price: "$45",
    description: "For those who can't get enough",
    features: [
      "2 bags per month (12oz each)",
      "Choose your roast level",
      "Free shipping",
      "10% off all purchases",
      "Early access to new beans",
      "Cancel anytime",
    ],
    popular: true,
  },
  {
    name: "Connoisseur",
    price: "$85",
    description: "The ultimate coffee experience",
    features: [
      "4 bags per month (12oz each)",
      "Curated selections",
      "Free priority shipping",
      "15% off all purchases",
      "Exclusive seasonal blends",
      "Brewing consultations",
      "Cancel anytime",
    ],
  },
]

export function CoffeeSubscription() {
  const { toast } = useToast()

  const handleSubscribe = (planName: string) => {
    toast({
      title: "Subscription Started",
      description: `You've subscribed to the ${planName} plan. Check your email for confirmation.`,
    })
  }

  return (
    <section id="subscription" className="py-20 sm:py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-balance">
            Never run out of great coffee
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Subscribe and save with our flexible plans. Pause or cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-border ${plan.popular ? "ring-2 ring-accent shadow-xl scale-105" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-accent">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full ${plan.popular
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                >
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
