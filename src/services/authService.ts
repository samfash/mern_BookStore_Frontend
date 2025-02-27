import apiClient from "../utils/apiClient.ts";


interface MailData {
  name: string;
  email: string;
  password: string;
}

interface LogData {
  email: string;
  password: string;
}

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/users/profiles", { headers: { Authorization: `Bearer ${token}` } });
};

export const register = async (formData:MailData ) => {
  const responce = await apiClient.post(`/users/register`, formData);
  return responce.data
};

export const login = async (formData:LogData) => {
  const response = await apiClient.post(`/users/login`, formData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
