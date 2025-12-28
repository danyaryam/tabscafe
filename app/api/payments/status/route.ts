import { NextRequest, NextResponse } from "next/server"
export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId")
  if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 })

  const serverKey = process.env.MIDTRANS_SERVER_KEY
  const isProduction = process.env.MIDTRANS_ENVIRONMENT === "production"
  if (!serverKey) return NextResponse.json({ error: "Server key missing" }, { status: 500 })

  const authString = Buffer.from(serverKey + ":").toString("base64")
  const apiHost = isProduction ? "https://api.midtrans.com" : "https://api.sandbox.midtrans.com"

  const res = await fetch(`${apiHost}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: { Accept: "application/json", Authorization: `Basic ${authString}` },
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
