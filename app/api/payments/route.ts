import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

type VABank = "bca" | "bni" | "bri" | "permata" | "cimb" | "mandiri"

type PaymentMethod =
  | { type: "va"; bank: VABank }
  | { type: "qris"; acquirer?: "gopay" | "airpay_shopee" }

export async function POST(request: NextRequest) {
  try {
<<<<<<< HEAD
    const body = await request.json();
    const { orderId, amount, customerDetails, items } = body;

    // Midtrans Server Key from environment
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const isProduction = process.env.MIDTRANS_ENVIRONMENT === "sendbox";

    if (!serverKey) {
      return NextResponse.json(
        { error: "Midtrans server key not configured" },
        { status: 500 }
      );
=======
    const body = await request.json()
    const { orderId, amount, customerDetails, items, paymentMethod } = body as {
      orderId: string
      amount: number
      customerDetails: any
      items: Array<{ id: string; name: string; price: number; quantity: number }>
      paymentMethod: PaymentMethod
>>>>>>> eb381eb5e075665a353b4d71e1610d6f4f4c1bfc
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY
    const isProduction = process.env.MIDTRANS_ENVIRONMENT === "production"
    if (!serverKey) {
      return NextResponse.json({ error: "Midtrans server key not configured" }, { status: 500 })
    }

    // WAJIB: hitung ulang total di server biar tidak dimanipulasi
    const computed = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
    if (computed !== amount) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 })
    }

    const authString = Buffer.from(serverKey + ":").toString("base64")
    const apiHost = isProduction ? "https://api.midtrans.com" : "https://api.sandbox.midtrans.com"

    const basePayload: any = {
      transaction_details: { order_id: orderId, gross_amount: amount },
      customer_details: customerDetails,
      item_details: items,
    }

    let payload: any

    if (paymentMethod.type === "va") {
      if (paymentMethod.bank === "mandiri") {
        payload = {
          ...basePayload,
          payment_type: "echannel",
          echannel: {
            bill_info1: "Payment",
            bill_info2: `Order ${String(orderId).slice(0, 20)}`,
            // bill_key optional 
          },
        }
      } else {
        payload = {
          ...basePayload,
          payment_type: "bank_transfer",
          bank_transfer: { bank: paymentMethod.bank },
        }
      }
    } else if (paymentMethod.type === "qris") {
      payload = {
        ...basePayload,
        payment_type: "qris",
        // acquirer opsional;
        qris: paymentMethod.acquirer ? { acquirer: paymentMethod.acquirer } : undefined,
      }
    } else {
      return NextResponse.json({ error: "Unsupported payment method" }, { status: 400 })
    }

    const res = await fetch(`${apiHost}/v2/charge`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error_messages?.join(", ") || data?.message || "Charge failed", details: data },
        { status: res.status }
      )
    }

    // Normalisasi response buat frontend
    const out: any = {
      order_id: data.order_id,
      payment_type: data.payment_type,
      transaction_status: data.transaction_status,
    }

    // bank transfer VA
    if (Array.isArray(data.va_numbers) && data.va_numbers.length > 0) {
      out.va = { bank: data.va_numbers[0].bank, va_number: data.va_numbers[0].va_number }
    } else if (data.permata_va_number) {
      out.va = { bank: "permata", va_number: data.permata_va_number }
    }

    // mandiri echannel
    if (data.payment_type === "echannel" && data.bill_key && data.biller_code) {
      out.mandiri = { bill_key: data.bill_key, biller_code: data.biller_code }
    }

    // qris -> ambil qr-code url dari actions
    if (Array.isArray(data.actions)) {
      const qr = data.actions.find((a: any) => String(a?.name || "").includes("qr-code"))
      if (qr?.url) out.qr = { url: qr.url }
    }

    return NextResponse.json(out)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
