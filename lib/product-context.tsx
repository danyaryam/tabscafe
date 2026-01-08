"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { RoastType } from "@/lib/roast-type"
import type { CategorySlug } from "@/lib/category-context"

export interface Product {
  id: number
  category_id: number
  name: string
  slug: CategorySlug
  description: string
  price: number
  image?: string
  is_available: boolean
  notes?: string
  origin?: string
  roast?: RoastType | null
  badge: string
  created_at: string
  updated_at?: string
}

interface ProductContextType {
  products: Product[]
  reload: () => Promise<void>
  addProduct: (data: Omit<Product, "id" | "created_at">) => Promise<void>
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

const ProductContext = createContext<ProductContextType | null>(null)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])

  const reload = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    setProducts(data)
  }

  useEffect(() => {
    reload()
  }, [])

  const addProduct = async (data: any) => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    await reload()
  }

  const updateProduct = async (id: string, data: any) => {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    })
    await reload()
  }

  const deleteProduct = async (id: string) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    await reload()
  }

  return (
    <ProductContext.Provider
      value={{ products, reload, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider")
  return ctx
}
