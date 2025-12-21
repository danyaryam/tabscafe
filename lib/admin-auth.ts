export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  const session = localStorage.getItem("adminSession")
  return !!session
}

export function getAdminSession() {
  if (typeof window === "undefined") return null
  const session = localStorage.getItem("adminSession")
  return session ? JSON.parse(session) : null
}

export function adminLogout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminSession")
}
