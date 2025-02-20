import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const REACT_APP_BACKEND_URL="http://localhost:5000/api/v1"

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/api/auth/reset-password/${token}`, { password });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Enter new password" required />
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
};

export default ResetPassword;
