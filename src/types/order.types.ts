export type OrderStatus =
  | "Submitted"
  | "Pending"
  | "Approved"
  | "Rejected";

export interface SalesOrder {
  sales_order_id: string;
  order_no: string;
  order_channel: string;
  priority: string;
  notes: string | null;
  created_at: string;
  prescription_id: string | null;
  tenant_id: string;
  patient_ref_id: string;
  order_status: OrderStatus;  // ✅ IMPORTANT
  order_datetime: string;
  created_by_user_id: string;
  updated_at: string;
}

export interface SalesOrderResponse {
  is_error: boolean;
  message: string;
  results: SalesOrder[];
  status_code: number;
}