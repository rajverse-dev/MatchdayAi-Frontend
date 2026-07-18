import { apiClient } from "./apiClient";
import type { LoginPayload, RegisterPayload } from "../types";

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    email: string;
    role: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export const authService = {

  async login(payload: LoginPayload): Promise<LoginResponse> {

    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      payload
    );

    return response.data;
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {

    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      payload
    );

    return response.data;
  },

  logout() {

    localStorage.removeItem("matchday_token");
    localStorage.removeItem("matchday_user");
    localStorage.removeItem("matchday_role");

  }

};