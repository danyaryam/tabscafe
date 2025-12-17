"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaymentButton } from "@/components/payment-button"
import type { CartItem } from "@/lib/midtrans"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onPaymentSuccess?: () => void
}

export function CheckoutDialog({ open, onOpenChange, items, onPaymentSuccess }: CheckoutDialogProps) {
  const [customerDetails, setCustomerDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  })

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSuccess = () => {
    onOpenChange(false)
    onPaymentSuccess?.()
    alert("Payment successful! Thank you for your order.")
  }

  const handlePending = () => {
    alert("Payment is pending. Please complete your payment.")
  }

  const handleError = () => {
    alert("Payment failed. Please try again.")
  }

  const isFormValid = customerDetails.first_name && customerDetails.email && customerDetails.phone

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Enter your details to complete the purchase</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="space-y-1 text-sm">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Customer Details</h3>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={customerDetails.first_name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, first_name: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={customerDetails.last_name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, last_name: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  placeholder="+62812345678"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <PaymentButton
            items={items}
            customerDetails={customerDetails}
            onSuccess={handleSuccess}
            onPending={handlePending}
            onError={handleError}
            disabled={!isFormValid}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
