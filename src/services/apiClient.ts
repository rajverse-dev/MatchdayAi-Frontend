import axios from "axios";

export const apiConfig = {
  useMock: true,
  baseURL: "http://localhost:8080/api",
};

export const mockDelay = <T>(value: T, delay = 300): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });

export const apiClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("matchday_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});