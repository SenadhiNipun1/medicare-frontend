export interface AuthenticateRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  user: unknown | null;
  access_token: string;
  refresh_token: string;
}

export interface AuthenticateResponse {
  success: boolean;
  status: string;
  message: string;
  data: AuthTokens;
}



// What Is an Interface in TypeScript?

// An interface defines the shape (structure) of an object.

// It tells TypeScript:

// "An object must look like this."

// It is used for:

// Type safety

// Autocomplete

// Preventing mistakes

// Clear API contracts