import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";

const OrderMake: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCart = location.state?.cart || [];


  const [cart, setCart] = useState(initialCart);
  const [paymentMethod, setPaymentMethod] = useState("stripe");


  const totalPrice = cart.reduce((sum: number, book: any) => sum + book.price * book.quantity, 0);

  const handleQuantityChange = (bookId: string, quantity: number) => {
    const updatedCart = cart.map((book: any) =>
      book._id === bookId ? { ...book, quantity: Math.max(1, quantity) } : book
    );
    setCart(updatedCart);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const { orderId } = await createOrder({
        books: cart.map((book: any) => ({ bookId: book._id, quantity: book.quantity })),
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
        {cart.map((book) => (
        <div key={book._id} className="flex justify-between border p-4 mb-2 rounded shadow-md">
          <div>
            <p className="font-semibold">{book.title}</p>
            <p>${book.price.toFixed(2)} per book</p>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              value={book.quantity}
              onChange={(e) => handleQuantityChange(book._id, Number(e.target.value))}
              className="input input-bordered w-16"
            />
          </div>
        </div>
          ))}
        <div>
          <label className="block text-sm font-bold">Total Price</label>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
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
        
        <button type="submit" className="btn btn-primary w-full">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderMake;
