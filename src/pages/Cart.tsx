import React, {  useContext , useState, useEffect } from "react";
// import { getCart, updateCartItem, removeFromCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";


const CartPage = () => {
  // const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  const cartContext = useContext(CartContext);
  if (!cartContext) return null;

  const { cart, updateCartItem, removeFromCart } = cartContext;

  // useEffect(() => {
  //   setCart(getCart());
  // }, []);

  const handleQuantityChange = (bookId: string, quantity: number) => {
    updateCartItem(bookId, quantity);
    // setCart(getCart());
  };

  const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0);

  const handleRemove = (bookId: string) => {
    removeFromCart(bookId);
    // setCart(getCart());
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
              <div>
                <p className="font-semibold">{book.title}</p>
                <p>${book.price.toFixed(2)}</p>
              </div>
              <input
                type="number"
                min="1"
                value={book.quantity}
                onChange={(e) => handleQuantityChange(book._id, Number(e.target.value))}
                className="input input-bordered w-16"
              />
              <button onClick={() => handleRemove(book._id)} className="btn btn-danger">
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total Price: ${totalPrice.toFixed(2)}</h2>
          <button onClick={handleCheckout} className="btn btn-primary mt-4">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
