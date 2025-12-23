"use client"

import { useState } from "react"
import { BannerForm } from "@/components/admin/banner-form"
import { useBanners } from "@/lib/banner-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BannersPage() {
  const { banners, deleteBanner } = useBanners()
  const { toast } = useToast()
  const [previewId, setPreviewId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    deleteBanner(id)
    toast({
      title: "Success",
      description: "Banner deleted successfully",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Banner Management</h1>
        <p className="text-neutral-400">Create and manage promotional banners for your homepage</p>
      </div>

      <BannerForm />

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Active Banners</h2>
        {banners.length === 0 ? (
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
              <p className="text-neutral-400 text-center">No banners created yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {banners.map((banner) => (
              <Card key={banner.id} className="bg-neutral-900 border-neutral-800">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white">{banner.title}</CardTitle>
                      <p className="text-sm text-neutral-400 mt-1">{banner.message}</p>
                    </div>
                    <Badge variant="secondary">{banner.id.slice(0, 8)}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {banner.image && (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden bg-neutral-800">
                      <img
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-400">Auto Hide</p>
                      <p className="text-white">{banner.autoHideAfter ? `${banner.autoHideAfter}s` : "Never"}</p>
                    </div>
                    {banner.eventDate && (
                      <div>
                        <p className="text-neutral-400">Event Date</p>
                        <p className="text-white">{new Date(banner.eventDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPreviewId(previewId === banner.id ? null : banner.id)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(banner.id)} className="flex-1">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
