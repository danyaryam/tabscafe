"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: 3,
    total: 54.97,
    status: "Completed",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    items: 1,
    total: 18.99,
    status: "Processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    items: 2,
    total: 33.98,
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "Alice Williams",
    items: 4,
    total: 79.96,
    status: "Completed",
    date: "2024-01-14",
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Orders</h2>
        <p className="text-neutral-400 mt-1">Track and manage customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: "856", color: "text-blue-500" },
          { label: "Pending", value: "24", color: "text-yellow-500" },
          { label: "Completed", value: "832", color: "text-green-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <p className="text-sm text-neutral-400">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Search orders..." className="pl-10 bg-neutral-950 border-neutral-800 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Date</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                    <td className="py-4 px-4 text-white font-medium">{order.id}</td>
                    <td className="py-4 px-4 text-neutral-400">{order.customer}</td>
                    <td className="py-4 px-4 text-neutral-400">{order.items}</td>
                    <td className="py-4 px-4 text-white">${order.total}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-neutral-400">{order.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
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
