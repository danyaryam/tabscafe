"use client"

import { useProductDetailContext } from "@/lib/product-detail-context"

export function useProductDetail() {
  return useProductDetailContext()
}
