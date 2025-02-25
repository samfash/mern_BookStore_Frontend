import axios from "axios";
import { logout } from "../services/authService.ts";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
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
