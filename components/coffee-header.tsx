"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart-sheet"
import { useState } from "react"

export function CoffeeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground text-sm">
              CT
            </div>
            <span className="text-xl font-serif font-semibold tracking-tight">Cafe Tabs</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("shop")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection("story")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollToSection("subscription")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Subscribe
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <CartSheet />
          <Button
            onClick={() => scrollToSection("shop")}
            className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Shop Now
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => scrollToSection("shop")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Shop
                </button>
                <button
                  onClick={() => scrollToSection("story")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Our Story
                </button>
                <button
                  onClick={() => scrollToSection("subscription")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Subscribe
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Contact
                </button>
                <Button onClick={() => scrollToSection("shop")} className="mt-4 w-full">
                  Shop Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
