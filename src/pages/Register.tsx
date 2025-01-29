import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService.ts';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '',email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await register(formData);
      await register(formData)
      navigate('/login');
    } catch (err) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className='container'>
       <div className="left-section">
            <div className="branding">
                <h1>FashRock Web</h1>
                <p>Redefining the Internet through our Web Apps.</p>
            </div>
        </div>
        <div className="right-section">
          <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label >Name</label>
                <input  
                  id="name"
                  name="name" 
                  type="text"
                  placeholder="Enter your username"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  id="email"
                  name='email'
                  type="email"
                  placeholder="Your email goes here"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  id='password'
                  name='password'
                  type="password"
                  placeholder="*****************"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p>{error}</p>}
              <button type="submit">Register</button>
            </form>
          </div>
    </div>
  );
};

export default Register;
