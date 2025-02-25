import React from 'react';
import { motion } from 'framer-motion';
import { BookX, Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const bookAnimation = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const suggestions = [
    "Check the spelling of the URL",
    "Try using the search bar",
    "Navigate back to our homepage",
    "Browse our featured collections"
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <motion.div
            className="inline-block mb-8"
            {...bookAnimation}
          >
            <BookX className="w-32 h-32 text-chocolate-500" />
          </motion.div>
          
          <motion.h1
            {...fadeIn}
            className="text-9xl font-serif font-bold text-chocolate-500 mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2
            {...fadeIn}
            className="text-3xl font-serif font-medium text-chocolate-400 mb-8"
          >
            Page Not Found
          </motion.h2>
          
          <motion.p
            {...fadeIn}
            className="text-lg text-chocolate-400 mb-12"
          >
            Oops! It seems this page has been misplaced in our library.
            <br />
            Let's help you find what you're looking for.
          </motion.p>

          <motion.div
            {...fadeIn}
            className="space-y-8"
          >
            <div className="flex justify-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-chocolate-500 text-white rounded-full hover:bg-chocolate-400 transition-colors duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Homepage
              </Link>
              <Link
                to="/books"
                className="inline-flex items-center px-6 py-3 border-2 border-chocolate-500 text-chocolate-500 rounded-full hover:bg-chocolate-500 hover:text-white transition-colors duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Search Books
              </Link>
            </div>

            <div className="max-w-lg mx-auto">
              <h3 className="text-xl font-serif font-semibold text-chocolate-500 mb-4">
                Here are some suggestions:
              </h3>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-chocolate-400"
                  >
                    • {suggestion}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;