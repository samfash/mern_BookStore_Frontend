import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService.ts';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const token = localStorage.getItem("token");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

      useEffect(() => {
        if (token) {
          navigate('/books');
        }
      }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/books');
    } catch (err) {
      setError('Invalid email or password')
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
      {/* Back to Home */}
      <div className="mb-8">
        <a 
          href="/" 
          className="inline-flex items-center text-chocolate-400 hover:text-chocolate-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </a>
      </div>

      {/* Logo and Title */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4"
        >
          <BookOpen className="w-12 h-12 text-chocolate-500" />
        </motion.div>
        <h1 className="text-3xl font-serif font-bold text-chocolate-500">
          Safas Bookstore
        </h1>
        <p className="text-chocolate-400 mt-2">
          'Welcome back, book lover!'
        </p>
      </div>

      {/* Form Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className=" rounded-lg shadow-lg p-8"
      >
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-chocolate-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-400 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
              <Mail className="w-5 h-5 text-chocolate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-chocolate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 pr-10 border border-beige-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-400 focus:border-transparent text-chocolate-600"
                placeholder="••••••••"
                required
              />
              <Lock className="w-5 h-5 text-chocolate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-chocolate-400 hover:text-chocolate-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>


          {/* Remember Me & Forgot Password */}  
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-beige-200 text-chocolate-500 focus:ring-chocolate-400" />
                <span className="ml-2 text-chocolate-400">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-chocolate-500 hover:text-chocolate-400 transition-colors">
                Forgot password?
              </a>
            </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Login
          </button>

          {/* Toggle Form */}
          <div className="text-center mt-3">
          <span className="text-gray-600 text-sm">Don't have an account?</span>{" "}
            <a href="/register" className="text-blue-500 text-sm hover:underline">
              Register
            </a>
           </div>
        </form>
      </motion.div>

      {/* Footer */}
      <p className="text-center text-chocolate-400 text-sm mt-8">
        By continuing, you agree to our{' '}
        <a href="/" className="text-chocolate-500 hover:text-chocolate-400 transition-colors">Terms of Service</a>
        {' '}and{' '}
        <a href="/" className="text-chocolate-500 hover:text-chocolate-400 transition-colors">Privacy Policy</a>
      </p>
    </motion.div>
  </div>
);
};

export default Login;
