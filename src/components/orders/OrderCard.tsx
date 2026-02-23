"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { OrderStatus } from "@/types/order.types";
import { useRouter } from "next/navigation";

interface OrderCardProps {
  salesOrderId: string;   // required for routing
  orderNo: string;
  status: OrderStatus;
  date: string;
  priority: string;
  channel: string;
}

export default function OrderCard({
  salesOrderId,
  orderNo,
  status,
  date,
  priority,
  channel,
}: OrderCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between transition hover:shadow-md">
      
      {/* Left Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {orderNo}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Channel: {channel || "N/A"} • Priority: {priority || "N/A"}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <Badge
            className={`px-3 py-1 text-xs font-medium rounded-full ${
              status === "Approved"
                ? "bg-green-100 text-green-700"
                : status === "Submitted"
                ? "bg-blue-100 text-blue-700"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </Badge>

          <p className="text-xs text-gray-500 mt-2">
            {date}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-lg"
          onClick={() => router.push(`/orders/${salesOrderId}`)}
        >
          <Eye size={16} />
          View
        </Button>
      </div>
    </div>
  );
}