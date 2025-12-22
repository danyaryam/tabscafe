"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [message, setMessage] = useState("Verifying...")

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.")
      return
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`)
        if (res.ok) {
          setMessage("Your email has been successfully verified!")
        } else {
          const data = await res.json()
          setMessage(data.message || "Verification failed.")
        }
      } catch {
        setMessage("Server error. Please try again later.")
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">{message}</h1>
      {message === "Your email has been successfully verified!" && (
        <Button
          onClick={() => router.push("/login")}
          className="bg-[#8B4513] hover:bg-[#A0522D] text-[#FFF8DC]"
        >
          Go to Login
        </Button>
      )}
    </div>
  )
}
