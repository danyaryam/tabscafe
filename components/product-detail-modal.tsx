"use client"

import { useProductDetailContext } from "@/lib/product-detail-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Star, ShoppingCart } from "lucide-react"
import { useRecentlyViewed } from "@/lib/recently-viewed-context"
import { useState } from "react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

export function ProductDetailModal() {
  const { selectedProduct, isOpen, closeProduct } = useProductDetailContext()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { data: session } = useSession()

  useEffect(() => {
    if (isOpen && selectedProduct) {
      addToRecentlyViewed({
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        viewedAt: Date.now(),
      })
    }
  }, [isOpen, selectedProduct, addToRecentlyViewed])

  useEffect(() => {
    if (selectedProduct && session?.user?.id) {
      fetch("/api/recently-viewed", {
        method: "POST",
        body: JSON.stringify({
          productId: selectedProduct.id
        })
      })
    }
  }, [selectedProduct, session])


  const handleAddToCart = () => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
        })
      }
      toast({
        title: "Added to cart",
        description: `${quantity} x ${selectedProduct.name} has been added to your cart.`,
      })
      setQuantity(1)
      closeProduct()
    }
  }

  if (!selectedProduct) return null

  return (
    <Dialog open={isOpen} onOpenChange={closeProduct}>
      <DialogContent className="!max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden">
            <img
              src={selectedProduct.image || "/placeholder.svg"}
              alt={selectedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-between py-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {selectedProduct.badge && (
                    <Badge className="bg-accent text-accent-foreground">{selectedProduct.badge}</Badge>
                  )}
                  {selectedProduct.roast && <Badge variant="outline">{selectedProduct.roast}</Badge>}
                </div>
                <h2 className="text-3xl font-serif font-bold">{selectedProduct.name}</h2>
                <p className="text-lg text-muted-foreground mt-1">{selectedProduct.origin}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Tasting Notes
                </h3>
                <p className="text-base">{selectedProduct.notes}</p>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-base text-foreground/80 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="py-4 border-t border-border">
                <span className="text-3xl font-bold text-accent">Rp {selectedProduct.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 px-3"
                  >
                    −
                  </Button>
                  <span className="px-4 font-semibold min-w-12 text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 px-3">
                    +
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  Total: Rp {(selectedProduct.price * quantity).toLocaleString()}
                </span>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
