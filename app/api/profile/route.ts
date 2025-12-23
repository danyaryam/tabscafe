import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { pool } from "@/lib/db"

export async function PATCH(req: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.email) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            )
        }

        const { email, name, phone, address} = await req.json()

        if (!phone || !address) return NextResponse.json({ message: "All field required" }, { status: 400 })
        
        const result = await pool.query(
            `UPDATE users
             SET name = $1,
                 phone = $2,
                 address = $3
             WHERE email = $4
             RETURNING id, name, email, phone, address`,
            [name, phone, address, session.user.email]
        )

        const updatedUser = result.rows[0]

        if (!updatedUser) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            message: "Profile updated",
            user: updatedUser,
        })
    } catch (error: any){
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const session = await auth()

    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const result = await pool.query(
        `SELECT name, email, phone, address
         FROM users
         WHERE email = $1`,
        [session.user.email]
    )

    const user = result.rows[0]

    if (!user) {
        return NextResponse.json({ message:"User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
}