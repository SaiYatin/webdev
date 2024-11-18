// LoginSignup.jsx
import React, { useState } from "react";
import "./CSS/loginsignup.css";
import api from '../api'; // Import our new api file
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // When user types in any input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // When user clicks signup button
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      const response = await api.signup(formData);
      
      // Save the login token
      localStorage.setItem('token', response.token);
      
      // Go to homepage
      navigate('/');
      
      alert('Signup successful!');
    } catch (error) {
      alert('Signup failed!');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input 
            type="text" 
            placeholder="Your Name"
            name="name"
            onChange={handleChange}
          />
          <input 
            type="email" 
            placeholder="Email Address"
            name="email"
            onChange={handleChange}
          />
          <input 
            type="password" 
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button onClick={handleSignup}>Continue</button>
        </div>
        <p className="loginsignup-login">Already have an account? <span>Login</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;