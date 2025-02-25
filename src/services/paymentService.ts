import apiClient from "../utils/apiClient.ts";


// Initiate payment
export const initiatePayment = async (orderId: string, paymentMethod: string, totalPrice: number) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.post(
    `/payments/initiate`,
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
  const response = await apiClient.post(
    `/payments/verify`,payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.success; // true or false
};
