import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../services/paymentService";

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, paymentMethod, reference, paymentIntentId } = location.state || {};

  useEffect(() => {
    if (!orderId || !paymentMethod) {
      alert("Invalid order or payment details");
      navigate("/orders");
      return;
    }

    const verifyTransaction = async () => {
      try {
        const payload = { orderId, paymentMethod };
        if (paymentMethod === "stripe") {
          payload["paymentIntentId"] = paymentIntentId;
        } else if (paymentMethod === "paystack") {
          payload["reference"] = reference;
        } else if (paymentMethod === "flutterwave") {
          payload["tx_ref"] = reference;
        }

        const response = await verifyPayment(payload);
        if (response.success) {
          alert("Payment verified successfully!");
        } else {
          alert("Payment verification failed!");
        }
        navigate("/orders");
      } catch (error) {
        console.error(error);
        alert("Failed to verify payment.");
        navigate("/orders");
      }
    };

    verifyTransaction();
  }, [orderId, paymentMethod, navigate, reference, paymentIntentId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Verifying Payment...</h1>
      <p>Please wait while we verify your payment.</p>
    </div>
  );
};

export default SuccessPage;
