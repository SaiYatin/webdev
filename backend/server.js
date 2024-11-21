const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pc_shop';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));


const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: function() { 
      return this.isSignup; 
    }
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  cart: [{
    productId: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String 
    },
    quantity: { 
      type: Number, 
      required: true 
    },
    new_price: { 
      type: Number, 
      required: true 
    }
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});


UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ 
      name, 
      email, 
      password,
      cart: [] 
    });
    await user.save();
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        cart: user.cart
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.post('/api/cart/update', authMiddleware, async (req, res) => {
  try {
    const { cart } = req.body;
    
    // Find user and update cart
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = cart;
    await user.save();

    res.json({ 
      message: 'Cart updated successfully', 
      cart: user.cart 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating cart' });
  }
});

app.get('/api/cart', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving cart' });
  }
});

app.post('/api/checkout', authMiddleware, async (req, res) => {
  try {
    const { cart } = req.body;
    
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = cart;
    await user.save();

    res.json({ 
      message: 'Checkout successful', 
      cart: user.cart 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing checkout' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));