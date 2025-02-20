import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../services/bookService.ts";
import { useCart } from "../context/cartContext.tsx";
import SignedImage from "../components/s3SignedUrl.tsx"; // Component for displaying signed images
import BookInfo from "../components/bookInfo.tsx";



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

  const { addToCart } = useCart();

  if (isLoading) return <p>Loading book details...</p>;
  if (isError) return <p>Failed to load book details.</p>;

  const book = data;

  const handleAddToCart = () => {
    addToCart(book);
    alert("Book added to cart!");
    navigate("/carts");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <SignedImage s3Url={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
        <BookInfo book={book} showOrderButton showAddToCartButton handleAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default BookDetails;
