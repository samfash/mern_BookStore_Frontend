import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../services/paymentService.ts";

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<null | string>(null);


  const queryParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const orderId = queryParams.get("orderId");
  const paymentMethod = queryParams.get("paymentMethod");

  useEffect(() => {
    if (!orderId || !paymentMethod) {
      alert("Invalid order or payment details");
      navigate("/orders");
      return;
    }

    const verifyTransaction = async () => {
      try {
        const payload = { orderId, paymentMethod};
        if (paymentMethod === "stripe") {
          payload["reference"] = queryParams.get("paymentIntentId");
        } else if (paymentMethod === "paystack") {
          payload["reference"] = queryParams.get("reference");;
        } else if (paymentMethod === "flutterwave") {
          payload["reference"] = queryParams.get("transaction_id");;
        }

        const response = await verifyPayment(payload);
        if (response) {
          alert("Payment verified successfully!");
          setVerificationStatus("success");
        } else {
          alert("Payment verification failed!");
          setVerificationStatus("failed");
        }
        navigate("/orders");
      } catch (error) {
        console.error(error);
        alert("Failed to verify payment.");
        setVerificationStatus("failed");
        navigate("/orders");
      }
    };

    verifyTransaction();
  }, [orderId, paymentMethod, queryParams, navigate]);

  if (!verificationStatus) {
    return <div>Verifying your payment, please wait...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
    {verificationStatus === "success" ? (
      <div className="text-center text-green-600">
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p>Your order ID is: {orderId}</p>
        <p>Thank you for your purchase!</p>
      </div>
    ) : (
      <div className="text-center text-red-600">
        <h1 className="text-2xl font-bold">Payment Failed</h1>
        <p>Please try again or contact support.</p>
      </div>
    )}
    </div>
  );
};

export default SuccessPage;
