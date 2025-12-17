export function CoffeeStory() {
  return (
    <section id="story" className="py-20 sm:py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] lg:h-[500px] order-2 lg:order-1">
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-muted">
              <img src="/coffee-roasting-process-artisan.jpg" alt="Coffee roasting" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              Our Story
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-balance">
              Roasted with passion, served with purpose
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2015, Roastery began with a simple mission: to bring exceptional coffee directly from farmers
                to your cup. We travel the world to source the finest beans, building lasting relationships with growers
                who share our commitment to quality and sustainability.
              </p>
              <p>
                Every batch is carefully roasted in-house by our master roasters, who have spent decades perfecting
                their craft. We believe that great coffee is an art form, and we pour our passion into every roast.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">Direct Trade</div>
                <p className="text-sm text-muted-foreground">Supporting farmers with fair prices</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">Small Batch</div>
                <p className="text-sm text-muted-foreground">Ensuring peak freshness</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
