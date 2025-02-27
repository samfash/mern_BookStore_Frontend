import axios from "axios";
import { logout } from "../services/authService.ts";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  // baseURL: "http://ec2-13-247-101-35.af-south-1.compute.amazonaws.com/api/v1",
  baseURL: " https://c675-13-247-101-35.ngrok-free.app/api/v1",
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
