

import type {
  SalesOrderResponse,
  SalesOrder,
  SingleSalesOrderResponse
} from "@/types/order.types";

import { axiosInstance } from "./axios-instance";


export async function getSalesOrders(): Promise<SalesOrder[]> {
  const response = await axiosInstance.get<SalesOrderResponse>(
    "/v1/api/sales_order"
  );

  return response.data.results;
}

export async function getSalesOrderById(
  id: string
): Promise<SalesOrder> {
  const response = await axiosInstance.get<SingleSalesOrderResponse>(
    `/v1/api/sales_order/${id}`
  );

  return response.data.results;
}

export async function deleteSalesOrder(
  id: string
): Promise<void> {
  await axiosInstance.delete(
    `/v1/api/sales_order/${id}`
  );
}

export async function updateSalesOrderStatus(
  id: string,
  status: string
): Promise<void> {
  await axiosInstance.patch(
    `/v1/api/sales_order/${id}`,
    {
      order_status: status,
    }
  );
}