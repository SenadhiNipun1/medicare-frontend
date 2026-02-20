import type { SalesOrderResponse } from "@/types/order.types";
import { axiosInstance } from "./axios-instance";

export async function getSalesOrders(): Promise<SalesOrderResponse> {
  const response = await axiosInstance.get<SalesOrderResponse>(
    "/v1/api/sales_order"
  );

  return response.data;
}