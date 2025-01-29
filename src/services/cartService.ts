export const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};
  
export const addToCart = (book: any) => {
let cart = getCart();
const existingBook = cart.find((item: any) => item._id === book._id);

if (existingBook) {
    existingBook.quantity += 1;
} else {
    cart.push({ ...book, quantity: 1 });
}

localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartItem = (bookId: string, quantity: number) => {
    let cart = getCart();
    cart = cart.map((book: any) => book._id === bookId ? { ...book, quantity } : book);
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (bookId: string) => {
let cart = getCart();
cart = cart.filter((book: any) => book._id !== bookId);
localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
localStorage.removeItem("cart");
};
  