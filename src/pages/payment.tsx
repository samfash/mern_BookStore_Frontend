import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initiatePayment } from "../services/paymentService";

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, paymentMethod,totalPrice} = location.state || {};
  // const [paymentUrl, setPaymentUrl] = useState("");


  useEffect(() => {
    if (!orderId || !paymentMethod) {
      navigate("/orders");
      return;
    }

    const startPayment = async () => {
      try {
        const { paymentUrl } = await initiatePayment(orderId, paymentMethod, totalPrice);
        window.location.href = paymentUrl; // Redirect to payment gateway
        // setPaymentUrl(paymentUrl);

      } catch (error) {
        console.error(error);
        alert("Failed to initialize payment.");
        navigate("/orders");
      }
    };

    startPayment();
  }, [orderId, paymentMethod, totalPrice, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Redirecting to Payment Gateway...</h1>
    </div>
  );
};

export default PaymentPage;
