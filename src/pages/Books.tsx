import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooks} from "../services/bookService.ts"; // Axios instance
import SignedImage from "../components/s3SignedUrl.tsx"; // Component for displaying signed images
import { useCart } from "../context/cartContext.tsx";

// Types for Book
type Book = {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  ISBN: string;
  price: number;
  coverImage: string; // URL for book cover image
};


// Main Books Component
const Books: React.FC = () => {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sort, setSort] = useState("title:asc");
  const [page, setPage] = useState(1);
  const limit = 5; // Number of books per page
  const [message, setMessage] = useState("");


  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(searchQuery && { title: searchQuery }),
    ...(author && { author }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(sort && { sort }),
  }).toString();


  // Fetch books from the API
  const { data, isLoading, isError, refetch } = useQuery({queryKey:["books", page, searchQuery, author, startDate, endDate, sort], queryFn: async () => {
    const response = await getBooks(queryParams);
    return response
  }});

  const { addToCart } = useCart();

  const handleAddToCart = (book) => {
    addToCart(book);
    setMessage(`${book.title} added to cart`);
    setTimeout(() => setMessage(""), 3000);
  }


  // Event Handlers
  const handleSearch = () => {
    setPage(1); // Reset to the first page for new searches
    refetch(); // Refetch the data
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1); // Reset to the first page for new sorting
    refetch(); // Refetch the data
  };

  const books = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data?.totalPages || 1;


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full md:w-1/4  placeholder-chocolate-300/100"
        />
        <input
          type="text"
          placeholder="Filter by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input input-bordered w-full md:w-1/4 placeholder-chocolate-300/100"
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered w-full md:w-1/6 text-chocolate-600"
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered w-full md:w-1/6 text-chocolate-600"
        />
        <select
          value={sort}
          onChange={handleSortChange}
          className="select select-bordered w-full md:w-1/6 text-chocolate-600"
        >
          <option value="title:asc">Title (A-Z)</option>
          <option value="title:desc">Title (Z-A)</option>
          <option value="author:asc">Author (A-Z)</option>
          <option value="author:desc">Author (Z-A)</option>
        </select>
        <button
          onClick={handleSearch}
          className="btn btn-primary"
        >
          Search
        </button>
      </div>

      {/* Book Cards */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch books. Please try again.</p>}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book._id} className="card shadow-lg">
              
                <Link
                  to={`/books/${book._id}`}
                >
                  <SignedImage s3Url={book.coverImage} alt={book.title} className="w-full h-48 object-cover" />
                  <div className="card-body">
                  <h3 className="card-title font-bold">{book.title}</h3>
                  <p className="card-author text-sm text-gray-500">
                    {book.author}
                  </p>
                  <p className="card-date text-xs text-gray-400">
                    Published: {new Date(book.publishedDate).toLocaleDateString()}
                  </p>
                  <p className="card-price text-lg font-semibold">
                    ${book.price? book.price.toFixed(2) : "N/A"}
                  </p>
                  </div>
                </Link>
                <div className="card-footer flex justify-end">
                <button onClick={()=>handleAddToCart(book)} className="btn btn-primary  mt-4">
                  Add to Cart
                </button>
                </div>
              </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="btn btn-secondary"
        >
          Previous
        </button>
        <p>
          Page <span className="font-bold">{page}</span>
        </p>
        <button
          onClick={() => setPage((prev) => prev + 1) } disabled={page >= totalPages}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Books;
