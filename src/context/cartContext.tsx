import React, { createContext, useReducer, useEffect, ReactNode } from "react";

// Define the shape of a cart item
interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

// Define the shape of our context
interface CartContextType {
  cart: CartItem[];
  addToCart: (book: CartItem) => void;
  updateCartItem: (bookId: string, quantity: number) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
}

// Create the context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Define action types
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "UPDATE_CART"; payload: { bookId: string; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" };

// Reducer function for cart state management
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem) {
        return state.map((item) =>
          item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case "UPDATE_CART":
      return state.map((item) =>
        item._id === action.payload.bookId
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );

    case "REMOVE_FROM_CART":
      return state.filter((item) => item._id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Define provider props
interface CartProviderProps {
  children: ReactNode;
}

// Create provider component
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Load cart from localStorage
  const initialCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Persist cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Action functions
  const addToCart = (book: CartItem) => dispatch({ type: "ADD_TO_CART", payload: book });
  const updateCartItem = (bookId: string, quantity: number) =>
    dispatch({ type: "UPDATE_CART", payload: { bookId, quantity } });
  const removeFromCart = (bookId: string) => dispatch({ type: "REMOVE_FROM_CART", payload: bookId });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
