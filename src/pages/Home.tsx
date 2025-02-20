import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BookOpen, Clock, Truck, Users } from "lucide-react";
import Testimonials from "../components/testimonial.tsx";

const Home = () => {

  return (
    <>
      <Helmet>
        <title>Online Bookshop - Home</title>
        <meta name="description" content="Discover and purchase amazing books online." />
      </Helmet>
      <div>
        <section  className="py-16 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center">
          <span className="text-brown-600 font-medium mb-4 block">Welcome to BookShop</span>
            <h2 
              className="text-4xl sm:text-5xl font-serif font-bold text-chocolate-500 mb-4"
            >
              Discover Your Next Adventure
            </h2>
            <p 
              className="text-lg text-chocolate-400 mb-8"
            >
              Explore our curated collection of timeless classics and contemporary gems
            </p>
            <div className="space-x-4 pb-10" >
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
            </div>
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
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </section>

         {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold text-chocolate-500">Why Choose Us</h3>
              <p className="text-chocolate-400 mt-2">Experience the difference with our premium book service</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BookOpen, title: "Vast Selection", description: "Over 10,000 titles across all genres" },
                { icon: Truck, title: "Fast Delivery", description: "Free shipping on orders over $35" },
                { icon: Clock, title: "24/7 Support", description: "Always here to help you" },
                { icon: Users, title: "Community", description: "Join our book club discussions" }
              ].map((feature, index) => (
                <div
                  className="text-center p-6 rounded-lg bg-beige-50"
                >
                  <feature.icon className="w-12 h-12 mx-auto text-chocolate-500 mb-4" />
                  <h4 className="text-xl font-serif font-bold text-chocolate-500 mb-2">{feature.title}</h4>
                  <p className="text-chocolate-400">{feature.description}</p>
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
                <div
                  key={testimonial.id}
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
                </div>
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
