import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `
      SELECT id, name, slug
      FROM categories
      ORDER BY name ASC
      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
