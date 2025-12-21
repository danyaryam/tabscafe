export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Overview</h2>
        <p className="text-neutral-400 mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Placeholder for dashboard content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$12,345", change: "+12.5%" },
          { label: "Orders", value: "856", change: "+8.2%" },
          { label: "Customers", value: "1,234", change: "+3.1%" },
          { label: "Products", value: "42", change: "0%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <p className="text-sm text-neutral-400">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
            <p className="text-sm text-green-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
