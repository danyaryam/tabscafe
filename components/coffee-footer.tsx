"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function CoffeeFooter() {
  const { toast } = useToast()

  const handleSocialClick = (platform: string) => {
    toast({
      title: `Follow us on ${platform}`,
      description: `Our ${platform} profile will open soon!`,
    })
  }

  const handleLinkClick = (linkName: string) => {
    toast({
      title: "Coming Soon",
      description: `${linkName} page is under construction.`,
    })
  }

  return (
    <footer id="contact" className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground text-sm">
                CT
              </div>
              <span className="text-xl font-serif font-semibold">Cafe Tabs</span>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Your neighborhood cafe bringing quality beverages and treats since 2020.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => handleSocialClick("Instagram")}
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleSocialClick("Facebook")}
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleSocialClick("Twitter")}
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-accent hover:text-accent-foreground hover:border-accent bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => handleLinkClick("All Coffee")}
                  className="hover:text-foreground transition-colors"
                >
                  All Coffee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("Subscriptions")}
                  className="hover:text-foreground transition-colors"
                >
                  Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("Equipment")}
                  className="hover:text-foreground transition-colors"
                >
                  Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("Gift Cards")}
                  className="hover:text-foreground transition-colors"
                >
                  Gift Cards
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => handleLinkClick("Brewing Guides")}
                  className="hover:text-foreground transition-colors"
                >
                  Brewing Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("About Our Coffee")}
                  className="hover:text-foreground transition-colors"
                >
                  About Our Coffee
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("Sustainability")}
                  className="hover:text-foreground transition-colors"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("Our Story")}
                  className="hover:text-foreground transition-colors"
                >
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => handleLinkClick("Contact Us")}
                  className="hover:text-foreground transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick("Shipping Info")}
                  className="hover:text-foreground transition-colors"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("Returns")} className="hover:text-foreground transition-colors">
                  Returns
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("FAQ")} className="hover:text-foreground transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Cafe Tabs. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <button
              onClick={() => handleLinkClick("Privacy Policy")}
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleLinkClick("Terms of Service")}
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
