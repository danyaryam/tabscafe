"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { loadMidtransScript, type CartItem, type CustomerDetails } from "@/lib/midtrans"
import { Loader2 } from "lucide-react"

interface PaymentButtonProps {
  items: CartItem[]
  customerDetails: CustomerDetails
  onSuccess?: (result: any) => void
  onPending?: (result: any) => void
  onError?: (result: any) => void
  disabled?: boolean
  className?: string
}

export function PaymentButton({
  items,
  customerDetails,
  onSuccess,
  onPending,
  onError,
  disabled,
  className,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      // Load Midtrans Snap script
      const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
      const environment = process.env.NEXT_PUBLIC_MIDTRANS_ENVIRONMENT === "production" ? "production" : "sandbox"

      if (!clientKey) {
        throw new Error("Midtrans client key not configured")
      }

      await loadMidtransScript(clientKey, environment)

      // Calculate total amount
      const amount = items.reduce((total, item) => total + item.price * item.quantity, 0)

      // Generate unique order ID
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Request payment token from backend
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          amount,
          customerDetails,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment")
      }

      // Open Midtrans payment page
      window.snap.pay(data.token, {
        onSuccess: (result) => {
          console.log("[v0] Payment success:", result)
          onSuccess?.(result)
        },
        onPending: (result) => {
          console.log("[v0] Payment pending:", result)
          onPending?.(result)
        },
        onError: (result) => {
          console.log("[v0] Payment error:", result)
          onError?.(result)
        },
        onClose: () => {
          console.log("[v0] Payment popup closed")
          setIsLoading(false)
        },
      })
    } catch (error) {
      console.error("[v0] Payment initialization error:", error)
      alert(error instanceof Error ? error.message : "Failed to initialize payment")
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handlePayment} disabled={disabled || isLoading || items.length === 0} className={className}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Proceed to Payment"
      )}
    </Button>
  )
}
