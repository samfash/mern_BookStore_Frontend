import React, { useState, useEffect } from "react";
import { getCart, removeFromCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (bookId: string) => {
    removeFromCart(bookId);
    setCart(getCart());
  };

  const handleCheckout = () => {
    navigate("/create-order", { state: { cart } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((book) => (
            <div key={book._id} className="flex justify-between border p-2 mb-2">
              <p>{book.title} - ${book.price} x {book.quantity}</p>
              <button onClick={() => handleRemove(book._id)} className="btn btn-danger">
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleCheckout} className="btn btn-primary mt-4">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
