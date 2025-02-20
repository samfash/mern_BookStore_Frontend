import React from "react";
import { useNavigate } from "react-router-dom";

interface BookInfoProps {
  book: {
    _id: string;
    title: string;
    author: string;
    ISBN: string;
    publishedDate: string;
    price?: number;
    stock: number;
    description: string;
  };
  showOrderButton?: boolean;
  showAddToCartButton?: boolean;
  handleAddToCart?: () => void;
}

const BookInfo: React.FC<BookInfoProps> = ({
  book,
  showOrderButton = false,
  showAddToCartButton = false,
  handleAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-lg">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-lg">
        <strong>ISBN:</strong> {book.ISBN}
      </p>
      <p className="text-lg">
        <strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString()}
      </p>
      <p className="text-lg">
        <strong>Price:</strong> ${book.price ? book.price.toFixed(2) : "N/A"}
      </p>
      <p className="text-lg">
        <strong>Stock:</strong> {book.stock}
      </p>
      <p className="text-lg mt-4">
        <strong>Description:</strong>
      </p>
      <p className="text-gray-700">{book.description}</p>

      {showOrderButton && (
        <button
          onClick={() =>
            navigate("/orders/create", {
              state: { bookId: book._id, title: book.title, price: book.price },
            })
          }
          className="btn btn-primary mt-4"
        >
          Order Now
        </button>
      )}

      {showAddToCartButton && handleAddToCart && (
        <button onClick={handleAddToCart} className="btn btn-primary mt-4">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default BookInfo;
