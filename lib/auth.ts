// Authentication utilities for Cafe Tabs
// This is a simple localStorage-based auth system
// Can be easily upgraded to use a real database (Supabase, Neon, etc.)

export interface User {
  id: string
  name: string
  email: string
}

export interface Session {
  user: User
  loggedIn: boolean
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  const session = localStorage.getItem("cafe_tabs_session")
  if (!session) return false
  try {
    const parsed = JSON.parse(session)
    return parsed.loggedIn === true
  } catch {
    return false
  }
}

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const session = localStorage.getItem("cafe_tabs_session")
  if (!session) return null
  try {
    const parsed: Session = JSON.parse(session)
    return parsed.user || null
  } catch {
    return null
  }
}

// Logout user
export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("cafe_tabs_session")
}

// Get user initials for avatar
export function getUserInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
