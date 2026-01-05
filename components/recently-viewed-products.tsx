"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useRecentlyViewed } from "@/lib/recently-viewed-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || recentlyViewed.length === 0) {
    return null
  }

  const itemsToShow = 4
  const maxIndex = Math.max(0, recentlyViewed.length - itemsToShow)

  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1))
  }

  const handleAddToCart = (product: (typeof recentlyViewed)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const displayedProducts = recentlyViewed.slice(currentIndex, currentIndex + itemsToShow)

  return (
    <section className="py-16 border-b border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Recently Viewed</h2>
            <p className="text-muted-foreground mt-2">Products you've recently browsed</p>
          </div>
          {recentlyViewed.length > itemsToShow && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="h-10 w-10 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className="h-10 w-10 bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <h3 className="font-serif font-semibold text-lg line-clamp-2">{product.name}</h3>
                  <p className="text-xl font-bold text-accent">Rp {product.price.toLocaleString()}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Link href={`/products`} className="flex-1">
                    <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      View
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No recently viewed products yet. Start browsing to see your history here.</p>
          </div>
        )}
      </div>
    </section>
  )
}
