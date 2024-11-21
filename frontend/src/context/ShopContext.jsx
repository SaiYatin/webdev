import React, { createContext } from "react";
import products from "../components/Assests/products.js"


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart ={};
    for(let index=0 ; index < products.length ; index++){
        cart[index]=0;
    }
    return cart;
}
const ShopContextProvider = (props) => {
    const [cartItems,setCartItems] = React.useState(getDefaultCart());
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.new_price;
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            if(cartItems[item] > 0){
                totalCount += cartItems[item];
            }
        }
        return totalCount;
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount,products,cartItems,addToCart,removeFromCart};  

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider