import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService.ts';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className='containerLog'>
      <div className='card'>
      <h2 className='log-head'>Log in</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Email</label>
          <input
            id='email'
            name='email'
            type="text"
            placeholder='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
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
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
