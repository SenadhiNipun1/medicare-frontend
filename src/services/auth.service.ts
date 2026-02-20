import { AuthenticateRequest, AuthenticateResponse } from "@/types/auth.types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function authenticate(
  payload: AuthenticateRequest
): Promise<AuthenticateResponse> {
  if (!BASE_URL) {
    throw new Error("API base URL is not defined");
  }

  const response = await fetch(`${BASE_URL}/api/v1/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  const data: AuthenticateResponse = await response.json();

  return data;
}
