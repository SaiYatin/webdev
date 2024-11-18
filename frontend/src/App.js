import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Footer from './components/footer/Footer';
import banner_processor from './components/Assests/banner_processor.png';
import banner_motherboard from './components/Assests/banner_motherboard.png';
import graphics_card from './components/Assests/banner_graphicscard.png';
import banner_ram from './components/Assests/banner_ram.png';
import banner_storage from './components/Assests/banner_storage.png';
import banner_powers from './components/Assests/banner_powers.jpg';
import banner_cases from './components/Assests/banner_cases.png';

// Import the ShopContextProvider to wrap your app
import ShopContextProvider from './context/ShopContext';

function App() {
  return (
    <ShopContextProvider> {/* Wrap the whole app with ShopContextProvider */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/Processors" element={<Category banner={banner_processor} category="Processors" />} />
          <Route path="/Motherboards" element={<Category banner={banner_motherboard} category="Motherboards" />} />
          <Route path="/Graphics Cards" element={<Category banner={graphics_card} category="Graphics Cards" />} />
          <Route path="/RAM" element={<Category banner={banner_ram} category="RAM" />} />
          <Route path="/Storage" element={<Category banner={banner_storage} category="Storage" />} />
          <Route path="/Power Supply" element={<Category banner={banner_powers} category="Power Supply" />} />
          <Route path="/Cases" element={<Category banner={banner_cases} category="Cases" />} />
          <Route path="/Product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/Cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ShopContextProvider>
  );
}

export default App;
