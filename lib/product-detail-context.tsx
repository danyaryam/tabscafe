"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  origin: string
  notes: string
  roast?: string
  price: number
  image: string
  badge?: string
  description: string
  category: string
  rating: number
  reviewCount: number
}

interface ProductDetailContextType {
  selectedProduct: Product | null
  isOpen: boolean
  openProduct: (product: Product) => void
  closeProduct: () => void
}

const ProductDetailContext = createContext<ProductDetailContextType | undefined>(undefined)

export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeProduct = () => {
    setIsOpen(false)
    document.body.style.overflow = "unset"
    setTimeout(() => setSelectedProduct(null), 300)
  }

  return (
    <ProductDetailContext.Provider value={{ selectedProduct, isOpen, openProduct, closeProduct }}>
      {children}
    </ProductDetailContext.Provider>
  )
}

export function useProductDetailContext() {
  const context = useContext(ProductDetailContext)
  if (context === undefined) {
    throw new Error("useProductDetailContext must be used within a ProductDetailProvider")
  }
  return context
}
