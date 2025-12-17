"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { User } from "./auth"
import { getCurrentUser, isLoggedIn, logout as logoutUtil } from "./auth"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  logout: () => void
  refreshSession: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const refreshSession = useCallback(() => {
    const authenticated = isLoggedIn()
    setUser(authenticated ? getCurrentUser() : null)
    setLoading(false)
  }, [])

  useEffect(() => {
    refreshSession()

    const handleStorageChange = () => {
      refreshSession()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [refreshSession])

  const logout = useCallback(() => {
    logoutUtil()
    setUser(null)
    router.push("/")
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
