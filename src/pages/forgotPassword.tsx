import React, { useState } from "react";
import axios from "axios";

const REACT_APP_BACKEND_URL="http://localhost:5000/api/v1"

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/users/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to send reset link.");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Enter your email" required />
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
