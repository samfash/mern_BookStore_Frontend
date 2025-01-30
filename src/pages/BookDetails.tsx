import React, {useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../services/bookService";
// import { addToCart } from "../services/cartService";
import { CartContext } from "../context/cartContext";


const fetchBookDetails = async (id: string) => {
  const response = await getBookById(id);
  return response.data;
};

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  

  const { data, isLoading, isError } = useQuery({queryKey:["book", id], queryFn: () =>
    fetchBookDetails(id!)
  });

  const cartContext = useContext(CartContext);
  if (!cartContext) return null;
  const { addToCart } = cartContext;

  if (isLoading) return <p>Loading book details...</p>;
  if (isError) return <p>Failed to load book details.</p>;

  const book = data;

  const handleAddToCart = () => {
    addToCart(book);
    alert("Book added to cart!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full md:w-1/3 object-cover"
        />
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
            <strong>Price:</strong> ${book.price.toFixed(2)}
          </p>
          <p className="text-lg">
            <strong>Stock:</strong> {book.stock}
          </p>
          <p className="text-lg mt-4">
            <strong>Description:</strong>
          </p>
          <p className="text-gray-700">{book.description}</p>
          <button
            onClick={() =>
              navigate("/orders", {
                state: { bookId: book._id, title: book.title, price: book.price },
              })
            }
            className="btn btn-primary mt-4"
          >
            Order Now
          </button>
          <button
        onClick={handleAddToCart}
        className="btn btn-primary mt-4"
      >
        Add to Cart
      </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
