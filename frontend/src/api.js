import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
  signup: async (userData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },
  
  updateCart: async (cartData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/cart/update`, 
      { cart: cartData }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  },
  
  getCart: async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default api;