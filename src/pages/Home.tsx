import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { choiceData } from "../components/choicwData.tsx";
import Testimonials from "../components/testimonial.tsx";
import client from "../utils/contentfulclient.ts";

interface NewPost {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  ratings: number;
}

const Home = () => {
  const [posts, setPosts] = useState<NewPost[]>([]);

  useEffect(() => {
    client.getEntries({ content_type: "newBooks" }).then((response) => {
      const books = response.items.map((item) => ({
        id: item.sys.id,
        title: String(item.fields.title),
        author: String(item.fields.author),
        coverImage: String(item.fields.coverImage),
        ratings: Number(item.fields.ratings),
      }));
      setPosts(books);
    })
  }, []);
  return (
    <>
      <Helmet>
        <title>Online Bookshop - Home</title>
        <meta name="description" content="Discover and purchase amazing books online." />
      </Helmet>
      <div>
        <motion.section 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.6 }}
         className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center">
          <span className="text-brown-600 font-medium mb-4 block">Welcome to BookShop</span>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-500 mb-4"
            >
              Discover Your Next Adventure
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-chocolate-400 mb-8"
            >
              Explore our curated collection of timeless classics and contemporary gems
            </motion.p>
            <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-x-4 pb-10" >
            <Link 
              className="btn-primary"
              to="/books"
            >
              Browse Collection
            </Link>
            <Link 
              className="btn-secondary"
              to="/about"
            >
              Learn More
            </Link>
            </motion.div>
            <div
              className="mt-10 lg:mt-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000" 
                alt="Library interior"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-beige-50 to-transparent" />
        </motion.section>

         {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-chocolate-500">Why Choose Us</h3>
              <p className="text-chocolate-400 mt-2">Experience the difference with our premium book service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {choiceData.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-lg bg-beige-50"
                >
                  <feature.icon className="w-12 h-12 mx-auto text-chocolate-500 mb-4" />
                  <h4 className="text-xl font-serif font-bold text-chocolate-500 mb-2">{feature.title}</h4>
                  <p className="text-chocolate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* new Arrival Books */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-brown-900 mb-4">New Arrivals</h2>
            <p className="text-brown-600 max-w-2xl mx-auto">
              Explore our latest additions, featuring compelling stories and groundbreaking works
              from renowned authors and exciting new voices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {posts.map((book, index) => (
              <div key={book.title}    
               className=" group">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg book-card">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Link
                    to={`/books/${book.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="px-6 py-3 bg-white text-chocolate-900 rounded-lg">View Details</span>
                  </Link>
                </motion.div>
                <h3 className="text-lg font-semibold text-chocolate-900">{book.title}</h3>
                <p className="text-chocolate-600">{book.author}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-beige-400 fill-current" />
                  <span className="ml-1 text-chocolate-600">{book.ratings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Testimonials */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-chocolate-500">What Our Readers Say</h3>
              <p className="text-chocolate-400 mt-2">Join our community of book lovers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-beige-50 p-6 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-chocolate-500">{testimonial.name}</h4>
                      <p className="text-chocolate-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-chocolate-500">{testimonial.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
       {/* Newsletter Section */}
       <section className="py-24 bg-chocolate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Stay Updated with New Releases
          </h2>
          <p className="text-beige-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new books,
            author interviews, and special promotions.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg bg-chocolate-800 text-white placeholder-beige-100/50 border border-chocolate-700 focus:outline-none focus:border-beige-200"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-beige-200 text-chocolate-900 rounded-lg hover:bg-beige-300 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      </div>
    </>
  );
};


export default Home;
