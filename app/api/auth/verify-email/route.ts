import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    if (!token) return NextResponse.json({ message: "Invalid Token" }, { status: 400 })

    const result = await pool.query(
      `UPDATE users
       SET email_verified = true,
           email_verify_token = NULL,
           email_verify_expires = NULL
       WHERE email_verify_token = $1
         AND email_verify_expires > NOW()
       RETURNING id`,
      [token]
    )


    if (result.rowCount === 0) {
        return NextResponse.json({ message: "Token expired or invalid" }, { status: 400 })
    }
    return NextResponse.json({ message: "Email verified successfully" })
}
