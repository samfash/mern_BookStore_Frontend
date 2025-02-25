import React from "react"

import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-beige-100 text-chocolate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-chocolate-700">BookShop</h3>
            <p className="text-sm">
              Discover your next favorite book in our carefully curated collection.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/books"
                  className="text-sm hover:text-chocolate-600 transition-colors"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-sm hover:text-chocolate-600 transition-colors"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm hover:text-chocolate-600 transition-colors"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about#contact"
                  className="text-sm hover:text-chocolate-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm hover:text-chocolate-600 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm hover:text-chocolate-600 transition-colors"
                >
                  Shipping/deliveries
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-sm">support@bookshop.com</li>
              <li className="text-sm">+1 (555) 123-4567</li>
              <li className="text-sm">
                123 Book Street
                <br />
                Reading, RG1 1DB
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-brown-200">
          <p className="text-center text-sm">
            © 2024 FashCorp BookShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer