import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

// Initiate payment
export const initiatePayment = async (orderId: string, paymentMethod: string, totalPrice: number) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/payments/initiate`,
    { orderId, paymentMethod, totalPrice },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  console.log(response.data);
  return response.data; // { paymentUrl }
};

// Verify payment
export const verifyPayment = async (payload: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/payments/verify`,payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.success; // true or false
};
