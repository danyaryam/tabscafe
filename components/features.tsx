import { Zap, Shield, Globe, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Deployment",
    description:
      "Deploy your applications in seconds with our optimized infrastructure. No waiting, no friction, just instant results.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Your data is protected with industry-leading security standards, compliance certifications, and end-to-end encryption.",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description:
      "Deliver content to your users with minimal latency through our worldwide network of edge servers spanning 300+ locations.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Monitor performance, track user behavior, and gain actionable insights with our comprehensive analytics dashboard.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Everything you need to succeed
          </h2>
          <p className="mb-16 text-pretty text-lg text-muted-foreground">
            Powerful features that help teams ship faster and build better products
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover:border-primary/50 transition-colors">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
