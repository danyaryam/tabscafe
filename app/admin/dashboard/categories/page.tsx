"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit } from "lucide-react"
import { CategoryForm } from "@/components/admin/category-form"
import { useCategories, Category } from "@/lib/category-context"

export default function CategoriesPage() {
  const { categories, deleteCategory, loading } = useCategories()
  const [editing, setEditing] = useState<Category | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Categories</h2>
        <p className="text-neutral-400 mt-1">Manage product categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORM */}
        <CategoryForm
          initialData={editing ?? undefined}
          onClose={() => setEditing(null)}
        />

        {/* LIST */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">
              Active Categories ({categories.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <p className="text-neutral-400 text-sm">Loading categories...</p>
            ) : categories.length === 0 ? (
              <p className="text-neutral-400 text-sm">No categories yet</p>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-800/50 border border-neutral-700"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {category.name}
                      </p>
                      <p className="text-neutral-400 text-sm truncate">
                        {category.slug}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-white"
                        onClick={() => setEditing(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => {
                          if (confirm("Delete this category?")) {
                            deleteCategory(category.id)
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
