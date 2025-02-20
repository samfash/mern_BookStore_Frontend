import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import {Moon, Sun, ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext.tsx";



const Header: React.FC = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Count total quantity



    useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
        
    }, [theme]);
    
    const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // Add effect after 50px scroll
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    return (
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled
            ? "backdrop-blur-md bg-white/30 dark:bg-beige-300/30 border-b border-white/10 dark:border-beige-800/30 shadow-lg"
            : "bg-white dark:bg-chocolate-900"
        }`}
       >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brown-900 hover:text-brown-700 transition-colors">
            📚 Safas Bookstore
          </Link>
  
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-beige-300 transition-colors">Home</Link>
            <Link to="/books" className="hover:text-beige-300 transition-colors">Books</Link>
            <Link to="/about" className="hover:text-beige-300 transition-colors">About</Link>
            <Link to="/orders" className="hover:text-beige-300 transition-colors">Orders</Link>
          </nav>

          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="mr-4">
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <Link
            to="/carts"
            className="p-2 text--700 hover:text-chocolate-900 transition-colors relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-chocolate-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
            
    
          {/* Authentication Buttons */}
          <div>
            {token ? (
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">Login</Link>
            )}
          </div>
        </div>
        </div>
      </header>
    );

};
  
export default Header