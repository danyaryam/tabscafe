import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { pool } from "@/lib/db"
import { sendVerifyEmail } from "@/lib/mail"

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    )
  }

  const exist = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  )

  if (exist.rowCount && exist.rowCount > 0) {
    return NextResponse.json(
      { message: "Email already exists" },
      { status: 409 }
    )
  }

  const hashed = await bcrypt.hash(password, 10)
  const token = crypto.randomBytes(32).toString("hex")

  const result = await pool.query(
    `INSERT INTO users (name, email, password, email_verified, email_verify_token, email_verify_expires)
     VALUES ($1, $2, $3, false, $4, NOW() + INTERVAL '1 day')
     RETURNING id, name, email`,
    [name, email, hashed, token]
  )

  await sendVerifyEmail(email, token)

  return NextResponse.json({ user: result.rows[0] }, { status: 201 })
}