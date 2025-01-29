import axios from 'axios';
// 
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

export const register = async (formData:MailData ) => {
  console.log(formData)
  const responce = await axios.post(`${API_URL}/users/register`, formData);
  console.log(responce)
  return responce.data
};

export const login = async (formData:LogData) => {
  console.log(formData)
  const response = await axios.post(`${API_URL}/users/login`, formData);
  console.log(response)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
