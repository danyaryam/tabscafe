"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBanners } from "@/lib/banner-context"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"

export function BannerForm() {
  const { addBanner } = useBanners()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    image: "",
    eventDate: "",
    autoHideAfter: "300",
    backgroundColor: "bg-primary",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      addBanner({
        title: formData.title,
        message: formData.message,
        image: formData.image,
        eventDate: formData.eventDate || undefined,
        autoHideAfter: formData.autoHideAfter ? Number.parseInt(formData.autoHideAfter) : undefined,
        backgroundColor: formData.backgroundColor,
      })

      toast({
        title: "Success",
        description: "Banner created successfully",
      })

      // Reset form
      setFormData({
        title: "",
        message: "",
        image: "",
        eventDate: "",
        autoHideAfter: "300",
        backgroundColor: "bg-primary",
      })
      setImagePreview("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create banner",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="py-6 bg-neutral-900 border-neutral-800">
      <CardHeader>
        <CardTitle className="text-white">Create New Banner</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-white">Banner Title</Label>
            <Input
              id="title"
              placeholder="e.g., Summer Sale"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="mt-1 text-white"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-white">Banner Message</Label>
            <Input
              id="message"
              placeholder="e.g., Get 30% off all items"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              required
              className="mt-1 text-white"
            />
          </div>

          <div>
            <Label htmlFor="image" className="text-white">Banner Image</Label>
            <div className="mt-1 flex items-center gap-4">
              <label className="relative cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition">
                  <Upload className="w-4 h-4" />
                  Choose Image
                </div>
              </label>
              {imagePreview && <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-12 rounded" />}
            </div>
          </div>

          <div>
            <Label htmlFor="eventDate" className="text-white">Event Date (Optional)</Label>
            <Input
              id="eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, eventDate: e.target.value }))}
              className="mt-1 text-white"
            />
          </div>

          <div>
            <Label htmlFor="autoHide" className="text-white">Auto Hide After (seconds)</Label>
            <Input
              id="autoHide"
              type="number"
              value={formData.autoHideAfter}
              onChange={(e) => setFormData((prev) => ({ ...prev, autoHideAfter: e.target.value }))}
              className="mt-1 text-white"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Banner"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
