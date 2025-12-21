"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white">Analytics</h2>
        <p className="text-neutral-400 mt-1">Track your business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: "$12,345",
            change: "+12.5%",
            trend: "up",
            icon: DollarSign,
          },
          {
            label: "Total Orders",
            value: "856",
            change: "+8.2%",
            trend: "up",
            icon: ShoppingCart,
          },
          {
            label: "Customers",
            value: "1,234",
            change: "+3.1%",
            trend: "up",
            icon: Users,
          },
          {
            label: "Products Sold",
            value: "2,456",
            change: "-2.3%",
            trend: "down",
            icon: Package,
          },
        ].map((stat) => (
          <Card key={stat.label} className="bg-neutral-900 border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-400">{stat.label}</CardTitle>
              <stat.icon className="w-4 h-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p
                className={`text-xs flex items-center gap-1 mt-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Ethiopian Yirgacheffe", sales: 234, revenue: "$4,446.66" },
                { name: "Colombian Supremo", sales: 189, revenue: "$3,211.11" },
                { name: "House Blend", sales: 156, revenue: "$2,338.44" },
                { name: "Espresso Roast", sales: 142, revenue: "$2,270.58" },
              ].map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-sm text-neutral-400">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="font-medium text-white">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New order placed", customer: "John Doe", time: "2 minutes ago" },
                { action: "Product updated", customer: "Admin", time: "15 minutes ago" },
                { action: "New customer registered", customer: "Jane Smith", time: "1 hour ago" },
                { action: "Order completed", customer: "Bob Johnson", time: "2 hours ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-neutral-400">{activity.customer}</p>
                  </div>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
