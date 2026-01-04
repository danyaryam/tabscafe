"use client"

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProducts } from "@/lib/product-context"
import type { Product } from "@/lib/product-context"
import { useToast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"

import { ROAST_OPTIONS } from "@/lib/roast-type"
import type { RoastType } from "@/lib/roast-type"

export interface Product {
  id: string
  name: string
  category_slug:
  | "coffe-beans"
  | "dessert"
  | "main-course"
  | "snack"
  | "coffee"
  | "milk-based"
  | "soda-based"
  | "cocktail"
  price: number
  description: string
  image?: string
  roast?: RoastType | null
  origin?: string
  notes?: string
  createdAt: string
}

interface ProductFormProps {
  onClose: () => void
  initialData?: Product | null
}

export function ProductForm({ onClose, initialData }: ProductFormProps) {
  const { addProduct, updateProduct } = useProducts()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [formData, setFormData] = useState<{
    name: string
    category_slug: Product["category_slug"]
    price: number
    description: string
    image?: string
    roast?: RoastType
    origin?: string
    notes?: string
  }>({
    name: "",
    category_slug: "coffee",
    price: 0,
    description: "",
    roast: undefined,
  })

  useEffect(() => {
    if (!initialData) return

    setFormData({
      name: initialData.name,
      category_slug: initialData.category_slug,
      price: initialData.price,
      description: initialData.description,
      image: initialData.image,
      roast: initialData.roast ?? undefined,
      origin: initialData.origin,
      notes: initialData.notes,
    })

    setImagePreview(initialData.image ?? null)
  }, [initialData])

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum image size is 2MB",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setImagePreview(base64)
      setFormData((prev) => ({ ...prev, image: base64 }))
    }
    reader.readAsDataURL(file)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) handleImageFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (initialData) {
        updateProduct(initialData.id, formData)
        toast({ title: "Success", description: "Product updated successfully" })
      } else {
        addProduct(formData)
        toast({ title: "Success", description: "Product created successfully" })
      }
      onClose()
    } catch {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl bg-neutral-900 border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-white">
            {initialData ? "Edit Product" : "Add Product"}
          </CardTitle>
          <button onClick={onClose} aria-label="Close">
            <X className="h-5 w-5 text-neutral-400 hover:text-white" />
          </button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Product Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label className="text-white">Category</Label>
                <select
                  value={formData.category_slug}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      category_slug: e.target.value as Product["category_slug"],
                    }))
                  }
                  className="mt-1 w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-2 text-white"
                >
                  <option value="coffe-beans">Coffee Beans</option>
                  <option value="dessert">Dessert</option>
                  <option value="main-course">Main Course</option>
                  <option value="snack">Snack</option>
                  <option value="coffee">Coffee</option>
                  <option value="milk-based">Milk Based</option>
                  <option value="soda-based">Soda Based</option>
                  <option value="cocktail">Cocktail</option>
                </select>
              </div>
            </div>

            {/* Price & Origin */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Price (Rp)</Label>
                <Input
                  type="number"
                  min={0}
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      price: Number(e.target.value) || 0,
                    }))
                  }
                />
              </div>

              <div>
                <Label className="text-white">Origin</Label>
                <Input
                  value={formData.origin}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, origin: e.target.value }))
                  }
                />
              </div>
            </div>

            {/* Roast */}
            <div>
              <Label htmlFor="roast" className="text-white">
                Roast Level
              </Label>
              <select
                value={formData.roast ?? ""}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    roast: e.target.value ? (e.target.value as RoastType) : null,
                  }))
                }
                className="mt-1 w-full rounded-md bg-neutral-950 border border-neutral-800 px-3 py-2 text-white"
              >
                <option value="">— None —</option>
                {ROAST_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <Label className="text-white">Tasting Notes</Label>
              <Input
                value={formData.notes}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, notes: e.target.value }))
                }
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-white">Description</Label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, description: e.target.value }))
                }
                className="w-full min-h-[100px] rounded-md bg-neutral-950 border border-neutral-800 p-2 text-white"
              />
            </div>

            {/* Image */}
            <div>
              <Label className="text-white">Product Image</Label>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                className={`mt-2 flex items-center gap-4 rounded-lg border-2 border-dashed p-4 transition
      ${isDragging ? "border-primary bg-neutral-800" : "border-neutral-700"}
    `}
              >
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  <div className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700">
                    <Upload className="h-4 w-4" />
                    Choose or Drop Image
                  </div>
                </label>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-16 rounded object-cover"
                  />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? "Saving..." : "Save Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
