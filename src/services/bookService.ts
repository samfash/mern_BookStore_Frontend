import apiClient from "../utils/apiClient.ts";


interface Book {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  ISBN: string;
  price: number;
  coverImage: string;
}

interface BooksResponse {
  success: boolean;
  totalBooks: number;
  totalPages: number;
  currentPage: number;
  data: Book;
}

export const getBooks = async (queryParams: any): Promise<BooksResponse> => {
  const token = localStorage.getItem('token');
  const { data } = await apiClient.get<BooksResponse>(`/books?${queryParams} `, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getBookById = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.get(`/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getSignedUrl = async (key: string) => {
  const { data } = await apiClient.get(`/get-signed-url/${key}`);
  return data.url;
}

export const createBook = async (bookData: FormData) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.post(`/books`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a book
export const updateBook = async (bookId: string, bookData: FormData) => {
  console.log(bookData)
  const token = localStorage.getItem("token");
  const response = await apiClient.patch(`/books/${bookId}`, bookData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a book
export const deleteBook = async (bookId: string) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.delete(`/books/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};