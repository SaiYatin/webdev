import React, { useState } from 'react';
import api from '../api';
import "./CSS/loginsignup.css";

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await api.signup(formData);
        alert(`Signup successful! Welcome, ${formData.name}`);
        setFormData({ name: '', email: '', password: '' });
      } else {
        const result = await api.login({
          email: formData.email,
          password: formData.password,
        });
        alert('Login successful!');
        localStorage.setItem('token', result.token);
        setFormData({ name: '', email: '', password: '' });
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isSignup ? 'Create Account' : 'Login'}</h1>
        <form className="loginsignup-fields" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <div className="loginsignup-login">
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <span
                onClick={() => setIsSignup(false)}
                style={{ cursor: 'pointer', color: '#ff4141', fontWeight: '600' }}
              >
                Login
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span
                onClick={() => setIsSignup(true)}
                style={{ cursor: 'pointer', color: '#ff4141', fontWeight: '600' }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
        {isSignup && (
          <div className="loginsignup-agree">
            <input type="checkbox" required />
            <span>I agree to the terms and conditions</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
