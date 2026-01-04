"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useProducts } from "@/lib/product-context"
import { ProductForm } from "@/components/admin/product-form"
import { useToast } from "@/hooks/use-toast"
import { useCategories } from "@/lib/category-context"

export default function ProductsPage() {
  const { products, deleteProduct } = useProducts()
  const { toast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { categories } = useCategories()

  const getCategoryName = (id: number) =>
    categories.find(c => c.id === products.category_id)?.name ?? "-"


  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCategoryName(product.category_id)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )


  const handleDelete = (id: string) => {
    deleteProduct(id)
    toast({
      title: "Product deleted",
      description: "The product has been removed from your catalog.",
    })
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Products</h2>
          <p className="text-neutral-400 mt-1">Manage your coffee products and equipment</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {showForm && <ProductForm onClose={handleCloseForm} initialData={editingProduct} />}

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-950 border-neutral-800 text-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-400">No products found. Create your first product to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Rating</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="py-4 px-4 text-white font-medium">{product.name}</td>
                      <td className="py-4 px-4 text-neutral-400"> {getCategoryName(product.category_id)}</td>
                      <td className="py-4 px-4 text-white">Rp {product.price.toLocaleString()}</td>
                      <td className="py-4 px-4 text-neutral-400">
                        <span className="text-yellow-400 font-medium">{product.rating}</span>
                        <span className="text-neutral-500 text-sm"> ({product.reviewCount})</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                            className="hover:text-blue-400"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            className="hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
