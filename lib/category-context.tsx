"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

/* =======================
   TYPES
   ======================= */
export type CategorySlug = string

export interface Category {
  id: string
  name: string
  slug: CategorySlug
  createdAt: string
  updatedAt: string
}

type CategoryInput = Omit<Category, "id" | "createdAt">

interface CategoryContextType {
  categories: Category[]
  loading: boolean

  selectedCategory: string
  setSelectedCategory: (slug: string) => void

  addCategory: (data: CategoryInput) => Promise<void>
  updateCategory: (id: string, data: CategoryInput) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

/* =======================
   PROVIDER
   ======================= */
export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/categories")
      if (!res.ok) throw new Error("Failed to fetch categories")
      const data = await res.json()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  /* =======================
     CRUD API
     ======================= */
  const addCategory = async (data: CategoryInput) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error("Failed to create category")
    await fetchCategories()
  }

  const updateCategory = async (id: string, data: CategoryInput) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error("Failed to update category")
    await fetchCategories()
  }

  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) throw new Error("Failed to delete category")
    await fetchCategories()
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        selectedCategory,
        setSelectedCategory,
        addCategory,
        updateCategory,
        deleteCategory,
        refresh: fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

/* =======================
   HOOK
   ======================= */
export function useCategories() {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error("useCategories must be used inside <CategoryProvider />")
  }
  return context
}
