export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface MeResponse {
  userId: number;
  email: string;
}
