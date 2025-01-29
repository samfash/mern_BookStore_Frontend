import React, { useState } from "react";
import { createBook, updateBook } from "../services/bookService";

interface AdminBookFormProps {
  book: any | null;
  onClose: () => void;
}

const AdminBookForm: React.FC<AdminBookFormProps> = ({ book, onClose }) => {
  const [formData, setFormData] = useState({
    title: book?.title || "",
    author: book?.author || "",
    publishedDate: book?.publishedDate || "",
    ISBN: book?.ISBN || "",
    price: book?.price || "",
    stock: book?.stock || "",
    description: book?.description || "",
    coverImage: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key as keyof typeof formData]);
    }

    try {
      if (book) {
        await updateBook(book._id, formDataToSend);
        alert("Book updated successfully!");
      } else {
        await createBook(formDataToSend);
        alert("Book created successfully!");
      }
      onClose();
    } catch (error) {
      console.error("Failed to save book:", error);
      alert("Failed to save book.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{book ? "Edit Book" : "Add New Book"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div>
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="input input-bordered"
            />
          </div>
          <div>
            <label>Published Date</label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered"
            ></textarea>
          </div>
          <div>
            <label>Book Cover</label>
            <input type="file" onChange={handleFileChange} className="input" />
          </div>
          <button type="submit" className="btn btn-primary">
            {book ? "Update Book" : "Create Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminBookForm;
