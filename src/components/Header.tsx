import React, {useState, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import {Moon, Sun, ShoppingCart, X, Menu } from "lucide-react";
import { useCart } from "../context/cartContext.tsx";
import {motion} from "framer-motion";
import Logout from "./logout.tsx";
import Logo from "../assets/bookLogo.webp";
import { logout } from '../services/authService.ts';


const Header: React.FC = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [scrolled, setScrolled] = useState(false);
    const { cart } = useCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Count total quantity
    const [isMenuOpen, setIsMenuOpen] = useState(false);



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
      logout();
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
          <Link to="/" className="text-2xl font-bold text-chocolate-600 hover:text-chocolate-900 transition-colors">
            <motion.h1
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}>
              <img
                  src={Logo}
                  className="inline-block align-center h-10 w-10 mr-2"
                  alt="safas Bookshoop logo"
                  loading="lazy"/>
              Safas Bookstore 
            </motion.h1>
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
          <div className="hidden md:flex space-x-8">
            <Logout token={token} handleLogout={handleLogout} />
          </div>

           {/* Mobile menu button */}
           <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <div>Menu<Menu className="w-8 h-6 inline-block" /></div>}
            </button>
        </div>
        </div>
         {/* Mobile menu */}
         {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-beige-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 nav-link">Home</a>
              <a href="/books" className="block px-3 py-2 nav-link">Books</a>
              <a href="/about" className="block px-3 py-2 nav-link">About</a>
              <a href="/orders" className="block px-3 py-2 nav-link">Orders</a>
              <Logout token={token} handleLogout={handleLogout}  />

            </div>
          </motion.div>
        )}
      </header>
    );

};
  
export default Header