"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 4780 },
  { name: "Fri", sales: 5890 },
  { name: "Sat", sales: 4390 },
  { name: "Sun", sales: 6490 },
];

export default function SalesChart() {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-gray-900">
          Sales Trend
        </CardTitle>
      </CardHeader>

      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563EB"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
