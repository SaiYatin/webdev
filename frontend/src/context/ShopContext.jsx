import React, { createContext, useState, useEffect } from "react";
import api from '../api';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Load both products and cart items when component mounts
    useEffect(() => {
        const initializeShop = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Load products
                const productsData = await api.getProducts();
                setProducts(productsData);
                
                // Load existing cart items if user is logged in
                try {
                    const cartData = await api.getCart();
                    setCartItems(cartData);
                } catch (cartError) {
                    // If this fails, it might mean user isn't logged in, which is fine
                    console.log("No existing cart found:", cartError);
                }
            } catch (error) {
                console.error("Failed to initialize shop:", error);
                setError("Failed to load products. Please try refreshing the page.");
            } finally {
                setIsLoading(false);
            }
        };
        
        initializeShop();
    }, []);

    const addToCart = async (itemId) => {
        try {
            await api.addToCart(itemId, 1);
            setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        } catch (error) {
            if (error.message?.includes('unauthorized')) {
                alert('Please login first!');
            } else {
                alert('Failed to add item to cart. Please try again.');
            }
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            await api.removeFromCart(itemId);
            setCartItems((prev) => {
                const newItems = { ...prev };
                if (newItems[itemId] > 0) {
                    newItems[itemId] -= 1;
                }
                return newItems;
            });
        } catch (error) {
            console.error("Failed to remove from cart:", error);
            alert('Failed to remove item from cart. Please try again.');
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.new_price;
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, count) => 
            count > 0 ? total + count : total, 0);
    }

    

    return (
      <ShopContext.Provider value={{
          products,
          cartItems,
          isLoading,
          error,
          addToCart,
          removeFromCart,
          getTotalCartAmount,
          getTotalCartItems
      }}>
          {props.children}
      </ShopContext.Provider>
  );
};

export default ShopContextProvider;
