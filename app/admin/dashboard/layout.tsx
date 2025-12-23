"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { isAdminLoggedIn, adminLogout } from "@/lib/admin-auth"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  Coffee,
} from "lucide-react"
import Link from "next/link"
import { BannerProvider } from "@/lib/banner-context"

const navigation = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/admin/dashboard/products", icon: Package },
  { name: "Orders", href: "/admin/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/admin/dashboard/analytics", icon: BarChart3 },
  { name: "Promotions", href: "/admin/dashboard/promotion", icon: Megaphone },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAdminLoggedIn()) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    adminLogout()
    router.push("/")
  }

  if (!mounted) {
    return null
  }

  if (!isAdminLoggedIn()) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Sidebar for desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col border-r border-neutral-800 bg-neutral-900">
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex items-center gap-2 h-16 px-6 border-b border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-white">Cafe Tabs Admin</span>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-neutral-800">
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-neutral-400">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed inset-y-0 left-0 w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
            <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold text-white">Cafe Tabs</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="p-4 border-t border-neutral-800">
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-neutral-400">
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur px-4 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-white" />
          </Button>
          <h1 className="text-lg font-semibold text-white">Dashboard</h1>
        </div>
        <BannerProvider>

          <main className="p-4 lg:p-8">{children}</main>
        </BannerProvider>
      </div>
    </div>
  )
}
