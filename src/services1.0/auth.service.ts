import client from "../api/client";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  department: string;
  is_active: boolean;
}

class AuthService {
  async login(
    credentials: LoginRequest
  ): Promise<LoginResponse> {
    const body = new URLSearchParams();

    body.append("username", credentials.username);
    body.append("password", credentials.password);

    const response = await client.post<LoginResponse>(
      "/auth/login",
      body,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem(
      "access_token",
      response.data.access_token
    );

    return response.data;
  }

  async register(
    data: RegisterRequest
  ) {
    const response = await client.post(
      "/auth/register",
      data
    );

    return response.data;
  }

  async me(): Promise<User> {
    const response = await client.get<User>(
      "/auth/me"
    );

    return response.data;
  }

  logout() {
    localStorage.removeItem(
      "access_token"
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(
      "access_token"
    );
  }

  getToken(): string | null {
    return localStorage.getItem(
      "access_token"
    );
  }
}

export default new AuthService();