const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Auth APIs
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Product APIs
  getProducts: async () => {
    try {
      console.log('Fetching products from:', `${API_BASE_URL}/products`);
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Products received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/products/${category}`);
    return handleResponse(response);
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/product/${id}`);
    return handleResponse(response);
  },

  // Cart APIs
  getCart: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    return handleResponse(response);
  },

  addToCart: async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to add items to cart');
    }
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    return handleResponse(response);
  },

  removeFromCart: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to remove items from cart');
    }
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

export default api;
