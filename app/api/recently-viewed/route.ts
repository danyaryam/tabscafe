import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();

  // ⛔ jika belum login, STOP
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  await pool.query(
    `
    INSERT INTO recently_viewed_products (user_id, product_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    `,
    [session.user.id, productId]
  );

  return NextResponse.json({ success: true });
}
