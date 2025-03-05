import axios from "axios";
import { logout } from "../services/authService.ts";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: " https://definite-unduly-cicada.ngrok-free.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
