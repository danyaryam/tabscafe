"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"

const products = [
  { id: 1, name: "Ethiopian Yirgacheffe", category: "Single Origin", price: 18.99, stock: 45, status: "In Stock" },
  { id: 2, name: "Colombian Supremo", category: "Single Origin", price: 16.99, stock: 32, status: "In Stock" },
  { id: 3, name: "House Blend", category: "Blend", price: 14.99, stock: 8, status: "Low Stock" },
  { id: 4, name: "Espresso Roast", category: "Dark Roast", price: 15.99, stock: 0, status: "Out of Stock" },
  { id: 5, name: "French Press", category: "Equipment", price: 29.99, stock: 15, status: "In Stock" },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Products</h2>
          <p className="text-neutral-400 mt-1">Manage your coffee products and equipment</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input placeholder="Search products..." className="pl-10 bg-neutral-950 border-neutral-800 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Stock</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                    <td className="py-4 px-4 text-white font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-neutral-400">{product.category}</td>
                    <td className="py-4 px-4 text-white">${product.price}</td>
                    <td className="py-4 px-4 text-neutral-400">{product.stock}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          product.status === "In Stock"
                            ? "default"
                            : product.status === "Low Stock"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
