"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee, Utensils, Package, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useMemo } from "react"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  image: string | null
  category_slug: string
  category_name: string
  roast: string | null
  notes: string | null
  origin: string | null
  description: string | null
}



const iconMap: Record<string, any> = {
  "coffe-beans": Package,
  "coffee": Coffee,
  "milk-based": Coffee,
  "soda-based": Coffee,
  "cocktail": Coffee,
  "dessert": Utensils,
  "snack": Utensils,
  "main-course": Utensils,
}

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
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories", error)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Failed to fetch products")
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products", error)
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) => {
    const roastMatch = selectedRoast === "All" || product.roast === selectedRoast
    const categoryMatch =
      selectedCategory === "all" || product.category_slug === selectedCategory

    const searchMatch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.origin ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.notes ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description ?? "").toLowerCase().includes(searchQuery.toLowerCase())

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

  const roastLevels = useMemo(() => {
    const dynamicRoasts = Array.from(
      new Set(
        products
          .map((p) => p.roast)
          .filter((roast): roast is string => Boolean(roast))
      )
    )

    return ["All", ...dynamicRoasts]
  }, [products])


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
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Category
            </h3>

            <div className="flex flex-wrap gap-3">
              {/* ALL */}
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                All Products
              </Button>

              {!loadingCategories &&
                categories.map((category) => {
                  const Icon = iconMap[category.slug] ?? Package

                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.slug ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {category.name}
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
            {(selectedCategory === "all" || selectedCategory === "beans") &&
              roastLevels.length > 1 && (
                <div className="mb-12">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    Roast Level
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {roastLevels.map((roast) => (
                      <Button
                        key={roast}
                        variant={selectedRoast === roast ? "default" : "outline"}
                        onClick={() => {
                          setSelectedRoast(roast)
                          setCurrentPage(1)
                        }}
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
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                product{filteredProducts.length !== 1 ? "s" : ""}
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
                        src={product.image ?? "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Roast badge */}
                      {product.roast && (
                        <Badge className="absolute bottom-3 left-3 bg-background/80 text-foreground">
                          {product.roast}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="px-3 space-y-1">
                    <div>
                      <h3 className="font-serif font-semibold text-lg">
                        {product.name}
                      </h3>

                      {product.origin && (
                        <p className="text-sm text-muted-foreground">
                          &quot;{product.origin}&quot;
                        </p>
                      )}
                    </div>

                    {product.notes && (
                      <p className="text-sm text-foreground/70">
                        {product.notes}
                      </p>
                    )}

                    {product.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </CardContent>

                  <CardFooter className="px-3 py-1 h-16 relative">
                    <span className="absolute left-3 top-0 text-xl font-bold text-accent">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </span>

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
