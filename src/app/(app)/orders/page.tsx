"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "@/components/orders/OrderCard";
import { getSalesOrders } from "@/services/order.service";
import type { SalesOrder, OrderStatus } from "@/types/order.types";

type TabValue = "all" | OrderStatus;

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [orders, setOrders] = useState<Array<SalesOrder>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredOrders = useMemo(() => activeTab === "all"
      ? orders
       
      : orders.filter((order) => order.order_status === activeTab), [orders, activeTab]);

  const getCount = useCallback((status: TabValue) =>
    status === "all"
      ? orders.length
      : orders.filter((order) => order.order_status === status).length, [orders]);

  // 🔹 Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getSalesOrders();
        setOrders(response.results);
        console.log("ORDERS:", response.results);
      } catch (err: any) {
        setError(err.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage and review customer orders
        </p>
      </div>

      {/* Status Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
      >
        <TabsList className="bg-muted p-1 rounded-lg">
          <TabsTrigger value="all">
            All Orders ({getCount("all")})
          </TabsTrigger>
          <TabsTrigger value="Submitted">
            Submitted ({getCount("Submitted")})
          </TabsTrigger>
          <TabsTrigger value="Pending">
            Pending AMO ({getCount("Pending")})
          </TabsTrigger>
          <TabsTrigger value="Approved">
            Approved ({getCount("Approved")})
          </TabsTrigger>
          <TabsTrigger value="Rejected">
            Rejected ({getCount("Rejected")})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content Section */}
      <div className="space-y-4">
        {loading && (
          <div className="bg-white rounded-2xl p-6 text-center text-gray-500 shadow-sm border">
            Loading orders...
          </div>
        )}

        {error && (
          <div className="bg-white rounded-2xl p-6 text-center text-red-500 shadow-sm border">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredOrders.map((order) => (
            <OrderCard
              key={order.sales_order_id}
              orderId={order.order_no}
              status={order.order_status}
              date={new Date(order.order_datetime).toLocaleDateString()}
              priority={order.priority}
              channel={order.order_channel}       
            />
          ))}

        {!loading && !error && filteredOrders.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500">
            No orders found for this status.
          </div>
        )}
      </div>
    </div>
  );
}