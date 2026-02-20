import { AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const alerts = [
  {
    id: 1,
    title: "Low Stock",
    description: "Paracetamol (12 units left)",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Expiring Soon",
    description: "Insulin Batch #4582",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Pending Purchase",
    description: "Supplier ABC Pharma",
    time: "1 day ago",
  },
];

export default function RecentAlerts() {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-gray-900">
          Recent Alerts
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={alert.id}>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-900">
                    {alert.title}
                  </p>
                  <span className="text-xs text-gray-400">
                    {alert.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {alert.description}
                </p>
              </div>
            </div>

            {index !== alerts.length - 1 && (
              <div className="border-b border-gray-100 mt-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
