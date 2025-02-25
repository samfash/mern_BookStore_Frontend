import axios from 'axios';
import apiClient from "../utils/apiClient.ts";


const API_URL = "http://localhost:5000/api/v1";

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
  return apiClient.get("/orders", { headers: { Authorization: `Bearer ${token}` } });
};

export const register = async (formData:MailData ) => {
  const responce = await axios.post(`${API_URL}/users/register`, formData);
  return responce.data
};

export const login = async (formData:LogData) => {
  console.log(formData)
  const response = await axios.post(`${API_URL}/users/login`, formData);
  console.log(response)
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
