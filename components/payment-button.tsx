"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { CartItem, CustomerDetails } from "@/lib/midtrans"
import { Loader2 } from "lucide-react"

type VABank = "bca" | "bni" | "bri" | "permata" | "cimb" | "mandiri"

export type PaymentMethod =
  | { type: "va"; bank: VABank }
  | { type: "qris"; acquirer?: "gopay" | "airpay_shopee" }

export type ChargeResult = {
  order_id: string
  payment_type: string
  transaction_status: string
  va?: { bank: string; va_number: string }
  mandiri?: { biller_code: string; bill_key: string }
  qr?: { url: string }
}

interface PaymentButtonProps {
  items: CartItem[]
  customerDetails: CustomerDetails
  paymentMethod: PaymentMethod
  onCreated?: (result: ChargeResult) => void // <— NEW: supaya parent yang buka dialog hasil
  onError?: (error: any) => void
  disabled?: boolean
  className?: string
}

export function PaymentButton({
  items,
  customerDetails,
  paymentMethod,
  onCreated,
  onError,
  disabled,
  className,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePayment = async () => {
    try {
      setIsLoading(true)

      const amount = items.reduce((total, item) => total + item.price * item.quantity, 0)
      const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          paymentMethod,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Failed to create payment")

      onCreated?.(data as ChargeResult)
    } catch (err) {
      console.error("[core] Payment error:", err)
      onError?.(err)
      alert(err instanceof Error ? err.message : "Payment failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading || items.length === 0}
      className={className}
    >
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
