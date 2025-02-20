import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";


export const getUserOrders = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
};


export const createOrder = async (orderData: {
    books: { bookId: string; title: string; quantity: number }[];
    paymentMethod: string;
    totalPrice: number;
}) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/orders`,
    orderData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.data._id;
};
