import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1";

export const getBooks = async (queryParams: any) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/books?${queryParams} `, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getBookById = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createBook = async (bookData: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/books`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a book
export const updateBook = async (bookId: string, bookData: FormData) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(`${API_URL}/books/${bookId}`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a book
export const deleteBook = async (bookId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${API_URL}/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};