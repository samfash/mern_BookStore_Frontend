import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../services/orderService.ts";

type Order = {
  _id: string;
  books: { bookId: string; title: string; quantity: number }[];
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
};

const Orders: React.FC = () => {
  const { data, isLoading, isError } = useQuery({queryKey: ["userOrders"], queryFn: getUserOrders});

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to fetch orders.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {data.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data.map((order: Order, index) => (
            <div key={order._id} className="card shadow-lg p-4">
              <h2 className="font-bold text-lg mb-2">Order No#{index}</h2>
              <p>
                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Ordered At:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Payment Status:</strong> {order.paymentStatus}
              </p>
              <div className="mt-4">
                <strong>Books:</strong>
                <ul className="list-disc pl-4">
                  {order.books.map((book) => (
                    <li key={book.bookId}>
                      {book.title} - Quantity: {book.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
