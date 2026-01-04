"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCategories, Category } from "@/lib/category-context"
import { useToast } from "@/hooks/use-toast"

interface Props {
  initialData?: Category
  onClose?: () => void
}

export function CategoryForm({ initialData, onClose }: Props) {
  const { addCategory, updateCategory } = useCategories()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")

  useEffect(() => {
    if (!initialData) return
    setName(initialData.name)
    setSlug(initialData.slug)
  }, [initialData])

  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        name,
        slug: slug || generateSlug(name),
      }

      if (initialData) {
        await updateCategory(initialData.id, payload)
        toast({ title: "Success", description: "Category updated" })
      } else {
        await addCategory(payload)
        toast({ title: "Success", description: "Category created" })
      }

      onClose?.()
      setName("")
      setSlug("")
    } catch {
      toast({
        title: "Error",
        description: "Failed to save category",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-white">
          {initialData ? "Edit Category" : "Create Category"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-neutral-300">Name</Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setSlug(generateSlug(e.target.value))
              }}
              required
              className="mt-1 bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <div>
            <Label className="text-neutral-300">Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="mt-1 bg-neutral-950 border-neutral-800 text-white"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
