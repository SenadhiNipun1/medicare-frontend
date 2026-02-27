"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  getSalesOrderById,
  deleteSalesOrder,
} from "@/services/order.service";
import type { SalesOrder } from "@/types/order.types";
import { StatusDropdown } from "@/components/orders/status-dropdown";

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<SalesOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ✅ Fetch Order (Reusable function)
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

  // Initial load
  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  // ✅ Delete Order
  const handleDelete = async () => {
    if (!order) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteSalesOrder(order.sales_order_id);
      router.push("/orders");
    } catch (err: any) {
      alert(err.message || "Failed to delete order");
    } finally {
      setDeleting(false);
    }
  };

  // ✅ Status Badge Styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading order details...
      </div>
    );
  }

  // Error State
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  // Not Found State
  if (!order) {
    return (
      <div className="p-6 text-muted-foreground">
        Order not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Order Details
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage order information
        </p>
      </div>

      {/* Order Card */}
      <div className="bg-white rounded-xl shadow-sm border p-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Order Number
              </p>
              <p className="text-lg font-semibold">
                {order.order_no}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Channel
              </p>
              <p className="font-medium">
                {order.order_channel}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Priority
              </p>
              <p className="font-medium">
                {order.priority}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
                  order.order_status
                )}`}
              >
                {order.order_status}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Order Date
              </p>
              <p>
                {new Date(
                  order.order_datetime
                ).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Created At
              </p>
              <p>
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={() => router.push("/orders")}
          >
            Back
          </Button>

          <div className="flex gap-3">
            {/* ✅ Status Dropdown */}
            <StatusDropdown
              orderId={order.sales_order_id}
              currentStatus={order.order_status}
              onStatusChange={fetchOrder}
            />
            

            {/* Delete Button */}
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";


// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import {
//   getSalesOrderById,
//   deleteSalesOrder,
// } from "@/services/order.service";
// import type { SalesOrder } from "@/types/order.types";

// import { StatusDropdown } from "@/components/order/status-dropdown";

// export default function OrderDetailPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [order, setOrder] = useState<SalesOrder | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   // 🔹 Fetch Order
//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         setLoading(true);
//         const data = await getSalesOrderById(id as string);
//         setOrder(data);
//       } catch (err: any) {
//         setError(err.message || "Failed to fetch order details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchOrder();
//   }, [id]);

//   // 🔹 Delete Order
//   const handleDelete = async () => {
//     if (!order) return;

//     const confirmed = window.confirm(
//       "Are you sure you want to delete this order?"
//     );
//     if (!confirmed) return;

//     try {
//       setDeleting(true);
//       await deleteSalesOrder(order.sales_order_id);
//       router.push("/orders");
//     } catch (err: any) {
//       alert(err.message || "Failed to delete order");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   // 🔹 Status Badge Styling
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "APPROVED":
//         return "bg-green-100 text-green-700";
//       case "REJECTED":
//         return "bg-red-100 text-red-700";
//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";
//       case "COMPLETED":
//         return "bg-blue-100 text-blue-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-muted-foreground">
//         Loading order details...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   if (!order) {
//     return (
//       <div className="p-6 text-muted-foreground">
//         Order not found.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Page Header */}
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">
//           Order Details
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           View and manage order information
//         </p>
//       </div>

//       {/* Order Card */}
//       <div className="bg-white rounded-xl shadow-sm border p-8 max-w-4xl">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Left Column */}
//           <div className="space-y-5">
//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Order Number
//               </p>
//               <p className="text-lg font-semibold">
//                 {order.order_no}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Channel
//               </p>
//               <p className="font-medium">
//                 {order.order_channel}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Priority
//               </p>
//               <p className="font-medium">
//                 {order.priority}
//               </p>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-5">
//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Status
//               </p>
//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(
//                   order.order_status
//                 )}`}
//               >
//                 {order.order_status}
//               </span>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Order Date
//               </p>
//               <p>
//                 {new Date(
//                   order.order_datetime
//                 ).toLocaleString()}
//               </p>
//             </div>

//             <div>
//               <p className="text-sm text-muted-foreground">
//                 Created At
//               </p>
//               <p>
//                 {new Date(order.created_at).toLocaleString()}
//               </p>
//             </div>
//           </div>
//         </div>

    

//         {/* Actions */}
//         <div className="flex justify-between items-center">
//           <Button
//             variant="outline"
//             onClick={() => router.push("/orders")}
//           >
//             Back
//           </Button>

//           <div className="flex gap-3">
//             <StatusDropdown
//               orderId={order.id}
//               currentStatus={order.order_status}
//               onStatusChange={fetchOrders}
//             />

//             <Button
//               variant="destructive"
//               onClick={handleDelete}
//               disabled={deleting}
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }