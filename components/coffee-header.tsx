"use client"

import { Button } from "@/components/ui/button"
import { Menu, LogOut, ShoppingBag, Shield } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart-sheet"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getUserInitials } from "@/lib/auth"
import { isAdminLoggedIn } from "@/lib/admin-auth"
import Link from "next/link"

export function CoffeeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const isAdmin = isAdminLoggedIn()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-bold text-accent-foreground text-sm">
              CT
            </div>
            <span className="text-xl font-serif font-semibold tracking-tight">Cafe Tabs</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("shop")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection("story")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollToSection("subscription")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Subscribe
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <CartSheet />
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => scrollToSection("shop")}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  <span>Shop</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <Link href="/admin/dashboard">
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="md:inline-flex">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register" className="md:inline-flex">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
              </Link>
            </>
          )}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pb-4 border-b">
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full bg-transparent">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => scrollToSection("shop")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Shop
                </button>
                <button
                  onClick={() => scrollToSection("story")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Our Story
                </button>
                <button
                  onClick={() => scrollToSection("subscription")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Subscribe
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors text-left"
                >
                  Contact
                </button>
                {isAdmin && (
                  <Link href="/admin/dashboard" className="w-full">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                {isAuthenticated && (
                  <Button onClick={logout} variant="destructive" className="mt-4 w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
