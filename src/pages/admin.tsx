import React, { useState, useEffect } from "react";
import { getBooks, deleteBook } from "../services/bookService.ts";
import AdminBookForm from "./AdminBookForm.tsx";

const AdminPage: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  
  const fetchBooks = async () => {
    try {
      const data = await getBooks(null);
      const books = Array.isArray(data?.data) ? data.data : [];
      setBooks(books);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(bookId);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Failed to delete book.");
    }
  };

  const handleEdit = (book: any) => {
    setSelectedBook(book);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedBook(null);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Manage Books</h1>
      <button
        onClick={handleCreate}
        className="btn btn-primary mb-4"
      >
        Add New Book
      </button>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Author</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td className="border border-gray-200 px-4 py-2">{book.title}</td>
              <td className="border border-gray-200 px-4 py-2">{book.author}</td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="btn btn-secondary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && (
        <AdminBookForm
          book={selectedBook}
          onClose={() => {
            setIsFormOpen(false);
            fetchBooks();
          }}
        />
      )}
    </div>
  );
};

export default AdminPage;
