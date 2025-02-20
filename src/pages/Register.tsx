import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService.ts';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, BookOpen, User } from 'lucide-react';
import { motion } from 'framer-motion';


interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '',email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }

    if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (validateForm()) {
        await register(formData)
        console.log('Form submitted:', formData);
      }
      navigate('/login');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
     <div className="min-h-screen bg-beige-100 flex items-center justify-center p-4">
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
           Join Safas Bookstore
         </h1>
         <p className="text-chocolate-400 mt-2">
           Create your account and start your reading journey
         </p>
       </div>

       {/* Form Container */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="bg-white rounded-lg shadow-lg p-8"
       >
         {/* Form */}
         <form onSubmit={handleSubmit} className="space-y-6">
           {/* Name Fields */}
           <div className="grid grid-cols-2 gap-4">
             {/* First Name */}
             <div>
               <label htmlFor="firstName" className="block text-sm font-medium text-chocolate-400 mb-2">
                 Name
               </label>
               <div className="relative">
                 <input
                   type="text"
                   id="name"
                   name="name"
                   value={formData.name}
                   onChange={handleChange}
                   className={`w-full px-4 py-2 pl-10 border ${errors.name ? 'border-red-300' : 'border-beige-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-400 focus:border-transparent`}
                   placeholder="John"
                   required
                 />
                 <User className="w-5 h-5 text-chocolate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
               </div>
               {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
             </div>
             </div>

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
                 className={`w-full px-4 py-2 pl-10 border ${errors.email ? 'border-red-300' : 'border-beige-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-400 focus:border-transparent`}
                 placeholder="your@email.com"
                 required
               />
               <Mail className="w-5 h-5 text-chocolate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
             </div>
             {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
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
                 className={`w-full px-4 py-2 pl-10 pr-10 border ${errors.password ? 'border-red-300' : 'border-beige-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-400 focus:border-transparent`}
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
             {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
           </div>

           {/* Confirm Password Field */}
           <div>
             <label htmlFor="confirmPassword" className="block text-sm font-medium text-chocolate-400 mb-2">
               Confirm Password
             </label>
             <div className="relative">
               <input
                 type={showPassword ? 'text' : 'password'}
                 id="confirmPassword"
                 name="confirmPassword"
                 value={confirmPassword}
                 onChange={handlePasswordChange}
                 className={`w-full px-4 py-2 pl-10 border ${errors.confirmPassword ? 'border-red-300' : 'border-beige-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-400 focus:border-transparent`}
                 placeholder="••••••••"
                 required
               />
               <Lock className="w-5 h-5 text-chocolate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
             </div>
             {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
           </div>

           {/* Submit Button */}
           <button
             type="submit"
             className="w-full btn-primary"
           >
             Create Account
           </button>

           {/* Sign In Link */}
           <p className="text-center text-chocolate-400">
             Already have an account?{' '}
             <a
               href="/login"
               className="text-chocolate-500 hover:text-chocolate-400 font-semibold transition-colors"
             >
               Sign In
             </a>
           </p>
         </form>
       </motion.div>

       {/* Footer */}
       <p className="text-center text-chocolate-400 text-sm mt-8">
         By creating an account, you agree to our{' '}
         <a href="/" className="text-chocolate-500 hover:text-chocolate-400 transition-colors">Terms of Service</a>
         {' '}and{' '}
         <a href="/" className="text-chocolate-500 hover:text-chocolate-400 transition-colors">Privacy Policy</a>
       </p>
     </motion.div>
   </div>
  );
};

export default Register;
