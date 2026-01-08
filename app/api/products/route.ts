import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p.image,
        p.roast,
        p.notes,
        p.badge,
        p.origin,
        p.description,
        c.name AS category_name,
        c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `;

    const values: string[] = [];

    if (category) {
      query += ` WHERE c.slug = $1`;
      values.push(category);
    }

    query += ` ORDER BY p.created_at DESC`;

    const result = await pool.query(query, values);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
