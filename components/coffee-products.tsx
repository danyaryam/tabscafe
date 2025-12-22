"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const products = [
  {
    id: "eth-yirga",
    name: "Ethiopia Yirgacheffe",
    origin: "Ethiopia",
    notes: "Floral, Citrus, Tea-like",
    price: 89000,
    image: "/ethiopian-coffee-beans-in-bag.jpg",
    badge: "Bestseller",
  },
  {
    id: "col-supr",
    name: "Colombia Supremo",
    origin: "Colombia",
    notes: "Chocolate, Caramel, Nuts",
    price: 79000,
    image: "/colombian-coffee-beans-premium.jpg",
  },
  {
    id: "bra-sant",
    name: "Brazil Santos",
    origin: "Brazil",
    notes: "Sweet, Smooth, Low Acid",
    price: 75000,
    image: "/brazilian-coffee-beans-roasted.jpg",
    badge: "New",
  },
  {
    id: "gua-anti",
    name: "Guatemala Antigua",
    origin: "Guatemala",
    notes: "Cocoa, Spice, Balanced",
    price: 85000,
    image: "/guatemalan-coffee-beans-volcanic.jpg",
  },
]

export function CoffeeProducts() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof products)[0]) => {
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

  return (
    <section id="shop" className="py-20 sm:py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-balance">
            Discover Our Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Each blend tells a story of origin, craftsmanship, and dedication to quality
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">{product.badge}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.origin}</p>
                </div>
                <p className="text-sm text-foreground/70">{product.notes}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <span className="text-xl font-bold text-accent">Rp {product.price.toLocaleString()}</span>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
