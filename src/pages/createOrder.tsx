import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";

const OrderMake: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bookId, title, price } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  if (!bookId) {
    navigate("/books");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const totalPrice = quantity * price;

    try {
        const { orderId } = await createOrder({
        books: [{ bookId, quantity }],
        paymentMethod,
        totalPrice,
    
      });
      alert("Order created successfully!");
      navigate(`/payment`, { state: { orderId, paymentMethod, totalPrice } });
    } catch (error) {
      console.error(error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold">Book Title</label>
          <p>{title}</p>
        </div>
        <div>
          <label className="block text-sm font-bold">Price per Book</label>
          <p>${price.toFixed(2)}</p>
        </div>
        <div>
          <label className="block text-sm font-bold">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-bold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="stripe">Stripe</option>
            <option value="paystack">Paystack</option>
            <option value="flutterwave">Flutterwave</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold">Total Price</label>
          <p>${(quantity * price).toFixed(2)}</p>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderMake;
