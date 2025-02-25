import apiClient from "../utils/apiClient.ts";


export const getUserOrders = async () => {
    const token = localStorage.getItem("token");
    const response = await apiClient.get(`/orders`, {
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
  const response = await apiClient.post(
    `/orders`,
    orderData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.data._id;
};
