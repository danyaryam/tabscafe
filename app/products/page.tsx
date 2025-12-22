"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee, Utensils, Package, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

const allProducts = [
  {
    id: "eth-yirga",
    name: "Ethiopia Yirgacheffe",
    origin: "Ethiopia",
    notes: "Floral, Citrus, Tea-like",
    roast: "Light",
    price: 89000,
    image: "/ethiopian-coffee-beans-in-bag.jpg",
    badge: "Bestseller",
    description: "A delicate and complex coffee with vibrant floral and citrus notes. Perfect for pour-over brewing.",
    category: "beans",
  },
  {
    id: "col-supr",
    name: "Colombia Supremo",
    origin: "Colombia",
    notes: "Chocolate, Caramel, Nuts",
    roast: "Medium",
    price: 79000,
    image: "/colombian-coffee-beans-premium.jpg",
    description: "Smooth and well-balanced with rich chocolate undertones. Great for espresso or drip coffee.",
    category: "beans",
  },
  {
    id: "bra-sant",
    name: "Brazil Santos",
    origin: "Brazil",
    notes: "Sweet, Smooth, Low Acid",
    roast: "Medium",
    price: 75000,
    image: "/brazilian-coffee-beans-roasted.jpg",
    badge: "New",
    description: "A crowd-pleaser with low acidity and natural sweetness. Ideal for everyday drinking.",
    category: "beans",
  },
  {
    id: "gua-anti",
    name: "Guatemala Antigua",
    origin: "Guatemala",
    notes: "Cocoa, Spice, Balanced",
    roast: "Medium-Dark",
    price: 85000,
    image: "/guatemalan-coffee-beans-volcanic.jpg",
    description: "Grown in volcanic soil, this coffee offers deep cocoa flavors with a hint of spice.",
    category: "beans",
  },
  {
    id: "ken-aa",
    name: "Kenya AA",
    origin: "Kenya",
    notes: "Blackcurrant, Wine-like, Bright",
    roast: "Light-Medium",
    price: 95000,
    image: "/kenyan-coffee-beans.png",
    badge: "Premium",
    description: "Bold and fruity with wine-like acidity. A favorite among coffee enthusiasts.",
    category: "beans",
  },
  {
    id: "sum-mand",
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    notes: "Earthy, Herbal, Full-bodied",
    roast: "Dark",
    price: 82000,
    image: "/sumatra-coffee-beans.png",
    description: "Rich and complex with earthy notes. Perfect for French press brewing.",
    category: "beans",
  },
  {
    id: "cos-tara",
    name: "Costa Rica Tarrazu",
    origin: "Costa Rica",
    notes: "Honey, Citrus, Clean",
    roast: "Medium",
    price: 87000,
    image: "/costa-rican-coffee-beans.png",
    description: "Crisp and clean with honey sweetness and bright citrus notes.",
    category: "beans",
  },
  {
    id: "per-org",
    name: "Peru Organic",
    origin: "Peru",
    notes: "Nutty, Caramel, Mild",
    roast: "Medium",
    price: 78000,
    image: "/peruvian-organic-coffee.jpg",
    badge: "Organic",
    description: "Certified organic with smooth, mild flavors. Great for any brewing method.",
    category: "beans",
  },
  {
    id: "latte-hot",
    name: "Caffe Latte",
    origin: "Italy",
    notes: "Creamy, Smooth, Balanced",
    roast: "Medium",
    price: 35000,
    image: "/caffe-latte-in-white-cup.jpg",
    description: "Classic Italian coffee drink with espresso and steamed milk.",
    category: "drinks",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    origin: "Italy",
    notes: "Rich, Foamy, Bold",
    roast: "Medium",
    price: 38000,
    image: "/cappuccino-with-foam-art.jpg",
    badge: "Popular",
    description: "Equal parts espresso, steamed milk, and foam. A coffee classic.",
    category: "drinks",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    origin: "Modern",
    notes: "Smooth, Sweet, Less Acidic",
    roast: "Medium",
    price: 42000,
    image: "/cold-brew-coffee-with-ice.jpg",
    description: "Slowly steeped for 12+ hours. Refreshingly smooth and naturally sweet.",
    category: "drinks",
  },
  {
    id: "affogato",
    name: "Affogato",
    origin: "Italy",
    notes: "Sweet, Creamy, Dessert-like",
    roast: "Dark",
    price: 45000,
    image: "/affogato-espresso-with-vanilla-ice-cream.jpg",
    badge: "Signature",
    description: "Hot espresso poured over vanilla ice cream. A delicious dessert treat.",
    category: "drinks",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    origin: "France",
    notes: "Buttery, Flaky, Golden",
    roast: "",
    price: 25000,
    image: "/golden-butter-croissant-pastry.jpg",
    description: "Classic French pastry with layers of buttery goodness. Perfect with coffee.",
    category: "food",
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    origin: "Italy",
    notes: "Coffee-soaked, Creamy, Rich",
    roast: "",
    price: 48000,
    image: "/tiramisu-dessert-slice.jpg",
    badge: "Bestseller",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone.",
    category: "food",
  },
  {
    id: "brownie",
    name: "Chocolate Brownie",
    origin: "America",
    notes: "Fudgy, Rich, Decadent",
    roast: "",
    price: 32000,
    image: "/fudgy-chocolate-brownie-square.jpg",
    description: "Dense and fudgy chocolate brownie. A perfect sweet treat.",
    category: "food",
  },
  {
    id: "sandwich",
    name: "Chicken Pesto Sandwich",
    origin: "Modern",
    notes: "Savory, Fresh, Herby",
    roast: "",
    price: 52000,
    image: "/chicken-pesto-sandwich-on-ciabatta.jpg",
    description: "Grilled chicken with basil pesto, mozzarella, and tomatoes on ciabatta bread.",
    category: "food",
  },
]

const roastLevels = ["All", "Light", "Medium", "Medium-Dark", "Dark"]

const categories = [
  { id: "all", label: "All Products", icon: SlidersHorizontal },
  { id: "beans", label: "Coffee Beans", icon: Package },
  { id: "drinks", label: "Drinks", icon: Coffee },
  { id: "food", label: "Food", icon: Utensils },
]

const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under-50k", label: "Under Rp 50,000", min: 0, max: 50000 },
  { id: "50k-80k", label: "Rp 50,000 - 80,000", min: 50000, max: 80000 },
  { id: "above-80k", label: "Above Rp 80,000", min: 80000, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedRoast, setSelectedRoast] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [useCustomPrice, setUseCustomPrice] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12

  const filteredProducts = allProducts.filter((product) => {
    const roastMatch = selectedRoast === "All" || product.roast === selectedRoast
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory

    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.origin.toLowerCase().includes(searchQuery.toLowerCase()) || product.notes.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase())

    let priceMatch = true
    if (useCustomPrice) {
      const min = minPrice ? Number.parseInt(minPrice) : 0
      const max = maxPrice ? Number.parseInt(maxPrice) : Number.POSITIVE_INFINITY
      priceMatch = product.price >= min && product.price <= max
    } else {
      const priceRange = priceRanges.find((r) => r.id === selectedPriceRange)
      priceMatch = priceRange ? product.price >= priceRange.min && product.price < priceRange.max : true
    }

    return roastMatch && categoryMatch && priceMatch && searchMatch
  })

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handlePriceRangeClick = (rangeId: string) => {
    setSelectedPriceRange(rangeId)
    setUseCustomPrice(false)
    setMinPrice("")
    setMaxPrice("")
    setCurrentPage(1)
  }

  const handleCustomPriceChange = () => {
    setUseCustomPrice(true)
    setSelectedPriceRange("")
    setCurrentPage(1)
  }

  const handleAddToCart = (product: (typeof allProducts)[0]) => {
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

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold tracking-tight text-balance">
            Our Coffee Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our carefully curated selection of premium single-origin and specialty blend coffees from around the
            world
          </p>
        </div>

        {/* Category Filter & Search */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-72">
            <Label className="text-sm font-semibold text-muted-foreground mb-2 block">
              Search Product
            </Label>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Price and Roast Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Price Range</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {priceRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={selectedPriceRange === range.id ? "default" : "outline"}
                    onClick={() => handlePriceRangeClick(range.id)}
                    className="w-full justify-start"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>

              <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
                <div className="">
                  <Label htmlFor="min-price" className="text-xs text-muted-foreground">
                    Min Price (Rp)
                  </Label>
                  <input
                    id="min-price"
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value)
                      handleCustomPriceChange()
                    }}
                    className="w-full bg-background mt-1" />
                </div>
                <div className="">
                  <Label htmlFor="max-price" className="text-xs text-muted-foreground">
                    Max Price (Rp)
                  </Label>
                  <input
                    id="max-price"
                    type="number"
                    placeholder="No Limit"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value)
                      handleCustomPriceChange()
                    }}
                    className="w-full bg-background mt-1" />
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setMinPrice("")
                    setMaxPrice("")
                    setUseCustomPrice(true)
                    setSelectedPriceRange("all")
                  }} className="w-full sm:w-auto">
                  Apply
                </Button>
              </div>
            </div>

            {/* Roast Level Filter */}
            {(selectedCategory === "all" || selectedCategory === "beans") && (
              <div className="mb-12">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Roast Level</h3>
                <div className="flex flex-wrap gap-2">
                  {roastLevels.map((roast) => (
                    <Button
                      key={roast}
                      variant={selectedRoast === roast ? "default" : "outline"}
                      onClick={() => setSelectedRoast(roast)}
                      className={selectedRoast === roast ? "bg-primary text-primary-foreground" : ""}
                    >
                      {roast}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/*produk*/}
          <div className="lg:col-span-9">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
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
                      {product.roast && (
                        <Badge className="absolute bottom-3 left-3 bg-background/80 text-foreground">{product.roast}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="px-3 space-y-0.5">
                    <div className="space-y-0.5">
                      <h3 className="font-serif font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">&quot;{product.origin}&quot;</p>
                    </div>
                    <p className="text-sm text-foreground/70">{product.notes}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="px-3 py-1 h-16 relative">
                    <span className="top-0 absolute left-3 text-xl font-bold text-accent">Rp {product.price.toLocaleString()}</span>
                    <Button
                      size="sm"
                      className="absolute right-3 bottom-0 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="h-10 w-10 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const showPage =
                      page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

                    if (!showPage) {
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="flex h-10 w-10 items-center justify-center text-muted-foreground">
                            ...
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => goToPage(page)}
                        className={`h-10 w-10 ${currentPage === page ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSelectedPriceRange("all")
                    setSelectedRoast("All")
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  )
}
