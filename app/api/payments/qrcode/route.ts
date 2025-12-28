import { NextRequest, NextResponse } from "next/server"
export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url")
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 })

  // biar aman, allowlist host midtrans
  const allowed = ["https://api.midtrans.com/", "https://api.sandbox.midtrans.com/"]
  if (!allowed.some((p) => url.startsWith(p))) {
    return NextResponse.json({ error: "URL not allowed" }, { status: 400 })
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY
  if (!serverKey) return NextResponse.json({ error: "Server key missing" }, { status: 500 })

  const authString = Buffer.from(serverKey + ":").toString("base64")

  const res = await fetch(url, { headers: { Authorization: `Basic ${authString}` } })
  const buf = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get("content-type") || "image/png"

  return new NextResponse(buf, { status: res.status, headers: { "Content-Type": contentType } })
}
