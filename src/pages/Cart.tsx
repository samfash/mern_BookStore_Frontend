import React from "react";
// import { getCart, updateCartItem, removeFromCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.tsx";


const CartPage = () => {
  const navigate = useNavigate();

  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();


  const handleQuantityChange = (bookId: string, title: string, quantity: number) => {
    updateCartItem(bookId, title, quantity);
  };

  const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0);

  const handleRemove = (bookId: string) => {
    removeFromCart(bookId);
  };

  const handleCheckout = () => {
    navigate("/orders/create", { state: { cart } });
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
              <div>
                <p className="font-semibold">{book.title}</p>
                <p>${book.price.toFixed(2)}</p>
              </div>
              <input
                type="number"
                min="1"
                value={book.quantity}
                onChange={(e) => handleQuantityChange(book._id,book.title, Number(e.target.value))}
                className="input input-bordered w-16 text-chocolate-900"
              />
              <button onClick={() => handleRemove(book._id)} className="btn btn-danger">
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total Price: ${totalPrice.toFixed(2)}</h2>
          <div className="flex justify-between mt-6">
            <button onClick={handleCheckout} className="btn btn-primary mt-4">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="btn btn-danger">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
