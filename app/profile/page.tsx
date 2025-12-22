"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ArrowLeft,
} from "lucide-react"

import { useToast } from "@/hooks/use-toast"

/* ================= TYPES ================= */

interface Order {
  id: string
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  items: number
}

/* ================= PAGE ================= */

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, status } = useSession()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  /* ===== MOCK / API ORDER DATA (ganti ke API bila perlu) ===== */
  const orders: Order[] = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 125000,
      status: "delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-01-20",
      total: 85000,
      status: "shipped",
      items: 2,
    },
  ]

  /* ===== PROTECT PAGE ===== */
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }

    if (session?.user) {
      setFormData({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        phone: "",
        address: "",
      })
    }
  }, [status, session, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!session?.user) return null

  /* ================= HANDLERS ================= */

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: panggil API update profile
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })

    setIsEditing(false)
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account and view your orders
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* PROFILE SUMMARY */}
          <Card className="py-6">
            <CardHeader>
              <CardTitle>{session.user.name}</CardTitle>
              <CardDescription>{session.user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{orders.length}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {orders.filter((o) => o.status === "delivered").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ACCOUNT + ORDERS */}
          <div className="lg:col-span-2 space-y-6">
            {/* ACCOUNT INFORMATION */}
            <Card className="py-6">
              <CardHeader className="flex-row justify-between items-center">
                <div>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </div>
                <Button size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>
                        <User className="inline h-4 w-4 mr-2" />
                        Full Name
                      </Label>
                      <Input
                        value={formData.name}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>
                        <Mail className="inline h-4 w-4 mr-2" />
                        Email
                      </Label>
                      <Input value={formData.email} disabled />
                    </div>
                  </div>

                  <div>
                    <Label>
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone
                    </Label>
                    <Input
                      value={formData.phone}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Address
                    </Label>
                    <Input
                      value={formData.address}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  {isEditing && (
                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* ORDER HISTORY */}
            <Card className="py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {order.items} items •{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          Rp {order.total.toLocaleString()}
                        </p>
                        <Badge className="capitalize">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
