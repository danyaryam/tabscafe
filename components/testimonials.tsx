import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "StreamLine has completely transformed how we deploy applications. What used to take hours now takes minutes. The performance improvements are remarkable.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow",
    initials: "SC",
  },
  {
    quote:
      "The analytics dashboard gives us insights we never had before. We can make data-driven decisions in real-time and our conversion rates have increased by 40%.",
    author: "Michael Rodriguez",
    role: "VP of Engineering",
    company: "DataVerse",
    initials: "MR",
  },
  {
    quote:
      "Security was our top concern when choosing a platform. StreamLine exceeded our expectations with their compliance certifications and robust security features.",
    author: "Emily Thompson",
    role: "Head of Security",
    company: "SecureNet",
    initials: "ET",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Trusted by leading teams
          </h2>
          <p className="mb-16 text-pretty text-lg text-muted-foreground">
            See what our customers have to say about StreamLine
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-8">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-primary/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="mb-6 text-pretty leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
