"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { ChargeResult } from "@/components/payment-button"
import { toast } from "@/hooks/use-toast"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function PaymentResultDialog({
  open,
  onOpenChange,
  initialResult,
  onPaid,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialResult: ChargeResult | null
  onPaid?: () => void
}) {
  const [status, setStatus] = useState<string>("")
  const orderId = initialResult?.order_id

  useEffect(() => {
    if (!open || !orderId) return

    let stopped = false

    const tick = async () => {
      try {
        const res = await fetch(`/api/payments/status?orderId=${encodeURIComponent(orderId)}`)
        const data = await res.json()
        if (!res.ok || stopped) return

        const s = String(data.transaction_status || "").toLowerCase()
        setStatus(s)

        if (["settlement", "capture"].includes(s)) {
          onPaid?.()
          stopped = true
        }
        if (["expire", "cancel", "deny"].includes(s)) {
          stopped = true
        }
      } catch {
        // ignore
      }
    }

    const id = setInterval(tick, 3000)
    tick()

    return () => {
      stopped = true
      clearInterval(id)
    }
  }, [open, orderId, onPaid])

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({ title: "Copied to clipboard" })
    } catch {
      // fallback
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        {/* Accessibility guarantee */}
        <VisuallyHidden>
          <DialogTitle>Payment Instructions</DialogTitle>
        </VisuallyHidden>

        <DialogHeader>
          <DialogTitle>Payment Instructions</DialogTitle>
          <DialogDescription>
            Selesaikan pembayaran sesuai instruksi di bawah. Status akan update otomatis.
          </DialogDescription>
        </DialogHeader>

        {initialResult ? (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Order ID</span>
              <span className="font-mono">{initialResult.order_id}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Status</span>
              <span>{status || initialResult.transaction_status}</span>
            </div>

            {/* VA */}
            {initialResult.va ? (
              <div className="rounded-md border p-3 space-y-2">
                <div className="font-medium">Virtual Account</div>
                <div>Bank: {initialResult.va.bank.toUpperCase()}</div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-base">{initialResult.va.va_number}</span>
                  <Button variant="outline" size="sm" onClick={() => copy(initialResult.va!.va_number)}>
                    Copy
                  </Button>
                </div>
              </div>
            ) : null}

            {/* Mandiri Bill Payment */}
            {initialResult.mandiri ? (
              <div className="rounded-md border p-3 space-y-2">
                <div className="font-medium">Mandiri Bill Payment</div>
                <div className="flex items-center justify-between gap-2">
                  <span>
                    Biller Code: <span className="font-mono">{initialResult.mandiri.biller_code}</span>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copy(initialResult.mandiri!.biller_code)}
                  >
                    Copy
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>
                    Bill Key: <span className="font-mono">{initialResult.mandiri.bill_key}</span>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copy(initialResult.mandiri!.bill_key)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            ) : null}

            {/* QRIS */}
            {initialResult.qr ? (
              <div className="rounded-md border p-3 space-y-2">
                <div className="font-medium">QRIS</div>
                <img
                  className="w-64 rounded border"
                  alt="QRIS"
                  src={`/api/payments/qrcode?url=${encodeURIComponent(initialResult.qr.url)}`}
                />
                <div className="text-xs text-muted-foreground">
                  Scan QR dengan e-wallet / m-banking yang mendukung QRIS.
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">No payment data.</div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
