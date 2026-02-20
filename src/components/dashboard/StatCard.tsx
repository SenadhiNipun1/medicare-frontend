import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm hover:shadow-md transition">
      <CardContent className="p-6 flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900">
            {value}
          </h3>
          <p className="text-xs text-gray-500">
            {description}
          </p>
        </div>

        <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
