"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone } from "lucide-react"

const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", orders: 12, spent: 234.56, status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 8, spent: 156.78, status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", orders: 3, spent: 67.89, status: "New" },
  { id: 4, name: "Alice Williams", email: "alice@example.com", orders: 25, spent: 589.99, status: "VIP" },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Customers</h2>
        <p className="text-neutral-400 mt-1">View and manage your customer base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: "1,234" },
          { label: "New This Month", value: "48" },
          { label: "VIP Customers", value: "23" },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <p className="text-sm text-neutral-400">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Search customers..." className="pl-10 bg-neutral-950 border-neutral-800 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 rounded-lg border border-neutral-800 hover:bg-neutral-800/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-white">{customer.name}</h3>
                    <p className="text-sm text-neutral-400">{customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-neutral-400">Orders</p>
                    <p className="font-medium text-white">{customer.orders}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-400">Total Spent</p>
                    <p className="font-medium text-white">${customer.spent}</p>
                  </div>
                  <Badge variant={customer.status === "VIP" ? "default" : "secondary"}>{customer.status}</Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
