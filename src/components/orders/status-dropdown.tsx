"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { updateSalesOrderStatus } from "@/services/order.service";

type Props = {
  orderId: string;
  currentStatus: string;
  onStatusChange?: () => void;
};

export function StatusDropdown({
  orderId,
  onStatusChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleChange(status: string) {
    try {
      setLoading(true);

      await updateSalesOrderStatus(orderId, status);

      // notify parent to refresh list
      onStatusChange?.();
    } catch (error) {
      //console.error("Status update failed", error);
    alert("Failed to update status",error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" disabled={loading}>
          {loading ? "Updating..." : "Change Status"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange("PENDING")}>
          Submitted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("PENDING")}>
          Pending
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChange("APPROVED")}>
          Approved
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleChange("REJECTED")}>
          Rejected
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}