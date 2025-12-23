"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Banner {
  id: string
  title: string
  message: string
  image?: string
  eventDate?: string
  autoHideAfter?: number
  backgroundColor?: string
  createdAt: string
}

interface BannerContextType {
  banners: Banner[]
  addBanner: (banner: Omit<Banner, "id" | "createdAt">) => void
  updateBanner: (id: string, banner: Partial<Banner>) => void
  deleteBanner: (id: string) => void
}

const BannerContext = createContext<BannerContextType | undefined>(undefined)

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [banners, setBanners] = useState<Banner[]>([])
  const [mounted, setMounted] = useState(false)

  // Load banners from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cafe-tabs-banners")
    if (stored) {
      try {
        setBanners(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to load banners:", error)
      }
    }
    setMounted(true)
  }, [])

  // Save banners to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cafe-tabs-banners", JSON.stringify(banners))
    }
  }, [banners, mounted])

  const addBanner = (banner: Omit<Banner, "id" | "createdAt">) => {
    const newBanner: Banner = {
      ...banner,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setBanners([newBanner, ...banners])
  }

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    setBanners(banners.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }

  const deleteBanner = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id))
  }

  return (
    <BannerContext.Provider value={{ banners, addBanner, updateBanner, deleteBanner }}>
      {children}
    </BannerContext.Provider>
  )
}

export function useBanners() {
  const context = useContext(BannerContext)
  if (!context) {
    throw new Error("useBanners must be used within BannerProvider")
  }
  return context
}
