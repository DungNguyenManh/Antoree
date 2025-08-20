export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  token?: string;
  timestamp: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: 'user' | 'admin';
}
