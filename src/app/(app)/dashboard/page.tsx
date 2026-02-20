import StatCard from "@/components/dashboard/StatCard";
import { TrendingUp, Box, AlertTriangle, ShoppingCart } from "lucide-react";
import SalesChart from "@/components/dashboard/SalesChart";
import RecentAlerts from "@/components/dashboard/RecentAlerts";



export default function DashboardPage() {
  return (
    <main className="flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Summarization Of the Sale
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          Last updated: Just now
        </div>
      </div>


      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Today's Sales"
          value="₹21,200"
          description="+12.5% from yesterday"
          icon={<TrendingUp size={20} />}
        />

        <StatCard
          title="Low Stock Items"
          value="23"
          description="+3 from yesterday"
          icon={<Box size={20} />}
        />

        <StatCard
          title="Expiring Soon"
          value="15"
          description="Within 30 days"
          icon={<AlertTriangle size={20} />}
        />

        <StatCard
          title="Pending Purchases"
          value="8"
          description="2 overdue"
          icon={<ShoppingCart size={20} />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>

        <div>
          <RecentAlerts/>
        </div>
      </div>


    </main>
  );
}
