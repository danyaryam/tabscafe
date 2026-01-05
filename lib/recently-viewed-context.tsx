"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface RecentlyViewedProduct {
  id: string
  name: string
  price: number
  image?: string
  viewedAt: number
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedProduct[]
  addToRecentlyViewed: (product: RecentlyViewedProduct) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cafe-tabs-recently-viewed")
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to load recently viewed products:", error)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cafe-tabs-recently-viewed", JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed, mounted])

  const addToRecentlyViewed = (product: RecentlyViewedProduct) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((p) => p.id !== product.id)
      // Add to beginning
      const updated = [product, ...filtered]
      // Keep only 8 most recent
      return updated.slice(0, 8)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider")
  }
  return context
}
