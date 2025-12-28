"use client"

import { useState, useEffect } from "react"
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
import type { CartItem } from "@/lib/midtrans"
import { PaymentButton, type PaymentMethod, type ChargeResult } from "@/components/payment-button"
import { PaymentResultDialog } from "@/components/payment-result-dialog"
import { toast } from "@/hooks/use-toast"

type VABank = "bca" | "bni" | "bri" | "permata" | "cimb" | "mandiri"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onPaymentSuccess?: () => void
}

export function CheckoutDialog({ open, onOpenChange, items, onPaymentSuccess }: CheckoutDialogProps) {
  const [customerDetails, setCustomerDetails] = useState({
    first_name: "",
    phone: "",
    email: "",
    address: "",
  })

  useEffect(() => {
    if (!open) return

    const fetchCustomer = async () => {
      try {
        const res = await fetch("/api/profile")
        if (!res.ok) return

        const data = await res.json()

        const fullName = data.name ?? ""
        const [first_name = "", ...rest] = fullName.split(" ")
        const last_name = rest.join(" ")

        setCustomerDetails({
          first_name,
          phone: last_name,
          email: data.email ?? "",
          address: data.address ?? "",
        })
      } catch (error) {
        console.error("Failed to load customer data")
      }
    }

    fetchCustomer()
  }, [open])

  // pilih metode
  const [payType, setPayType] = useState<"va" | "qris">("va")
  const [vaBank, setVaBank] = useState<VABank>("bca")

  // dialog hasil pembayaran (terpisah)
  const [resultOpen, setResultOpen] = useState(false)
  const [chargeResult, setChargeResult] = useState<ChargeResult | null>(null)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const isFormValid = customerDetails.first_name && customerDetails.email && customerDetails.phone

  const paymentMethod: PaymentMethod =
    payType === "qris" ? { type: "qris", acquirer: "gopay" } : { type: "va", bank: vaBank }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>Enter your details to complete the purchase</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Summary */}
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

            {/* Payment method */}
            <div className="space-y-2">
              <h3 className="font-semibold">Payment Method</h3>

              <div className="grid gap-3">
                <div className="space-y-1">
                  <Label>Type</Label>
                  <select
                    className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                    value={payType}
                    onChange={(e) => setPayType(e.target.value as "va" | "qris")}
                  >
                    <option value="va">Virtual Account (Transfer Bank)</option>
                    <option value="qris">QRIS</option>
                  </select>
                </div>

                {payType === "va" ? (
                  <div className="space-y-1">
                    <Label>Bank</Label>
                    <select
                      className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                      value={vaBank}
                      onChange={(e) => setVaBank(e.target.value as VABank)}
                    >
                      <option value="bca">BCA</option>
                      <option value="bni">BNI</option>
                      <option value="bri">BRI</option>
                      <option value="permata">Permata</option>
                      <option value="cimb">CIMB</option>
                      <option value="mandiri">Mandiri (Bill Payment)</option>
                    </select>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Customer Details */}
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                      placeholder="+62 1234-5678-9101"
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

                
              </div>
            </div>
          </div>

          <DialogFooter>
            <PaymentButton
              items={items}
              customerDetails={customerDetails}
              paymentMethod={paymentMethod}
              disabled={!isFormValid}
              className="w-full"
              onCreated={(res) => {
                // tutup checkout dialog, buka dialog hasil
                setChargeResult(res)
                onOpenChange(false)
                setResultOpen(true)
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog hasil bayar (terpisah) */}
      <PaymentResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        initialResult={chargeResult}
        onPaid={() => {
          setResultOpen(false)
          onPaymentSuccess?.()
          toast({ title: "Payment successful!" })
        }}
      />
    </>
  )
}
