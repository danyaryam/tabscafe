import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            New: AI-powered workflow automation
          </div>

          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            The complete platform to <span className="text-muted-foreground">streamline your workflow</span>
          </h1>

          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Empower your team to build, deploy, and scale with cutting-edge tools. Stop configuring and start innovating
            with StreamLine's all-in-one platform.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Start Building Free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-2">
              <div className="text-3xl font-bold">20 days</div>
              <div className="text-sm text-muted-foreground">saved on daily builds</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">faster time to market</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">300%</div>
              <div className="text-sm text-muted-foreground">increase in productivity</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">6x</div>
              <div className="text-sm text-muted-foreground">faster to build + deploy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
