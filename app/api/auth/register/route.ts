import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { pool } from "@/lib/db"

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

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashed]
  )

  return NextResponse.json({ user: result.rows[0] }, { status: 201 })
}