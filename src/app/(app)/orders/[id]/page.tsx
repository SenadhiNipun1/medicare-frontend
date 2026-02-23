"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getSalesOrderById,
  deleteSalesOrder,
} from "@/services/order.service";
import type { SalesOrder } from "@/types/order.types";
import { Button } from "@/components/ui/button";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<SalesOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // 🔹 Fetch single order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getSalesOrderById(id as string);
        setOrder(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // 🔹 Delete handler
  const handleDelete = async () => {
    if (!order) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteSalesOrder(order.sales_order_id);

      alert("Order deleted successfully");

      router.push("/orders");
    } catch (err: any) {
      alert(err.message || "Failed to delete order");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-gray-500">
        Order not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Order Details
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
        <div>
          <span className="font-semibold">Order No:</span>{" "}
          {order.order_no}
        </div>

        <div>
          <span className="font-semibold">Status:</span>{" "}
          {order.order_status}
        </div>

        <div>
          <span className="font-semibold">Channel:</span>{" "}
          {order.order_channel}
        </div>

        <div>
          <span className="font-semibold">Priority:</span>{" "}
          {order.priority}
        </div>

        <div>
          <span className="font-semibold">Order Date:</span>{" "}
          {new Date(order.order_datetime).toLocaleString()}
        </div>

        <div>
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(order.created_at).toLocaleString()}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/orders")}
        >
          Back
        </Button>

        <Button variant="secondary">
          Edit
        </Button>

        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}