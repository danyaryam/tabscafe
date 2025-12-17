export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface CustomerDetails {
  first_name: string
  last_name?: string
  email: string
  phone: string
}

export function generateOrderId(): string {
  return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function formatItemsForMidtrans(items: CartItem[]) {
  return items.map((item) => ({
    id: item.id,
    price: item.price,
    quantity: item.quantity,
    name: item.name,
  }))
}

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: any) => void
          onPending?: (result: any) => void
          onError?: (result: any) => void
          onClose?: () => void
        },
      ) => void
    }
  }
}

export function loadMidtransScript(
  clientKey: string,
  environment: "sandbox" | "production" = "sandbox",
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src =
      environment === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", clientKey)
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Midtrans script"))
    document.head.appendChild(script)
  })
}
