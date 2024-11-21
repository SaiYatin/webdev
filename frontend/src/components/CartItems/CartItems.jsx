import React, { useContext } from 'react';
import './cartitems.css';
import { ShopContext } from '../../context/ShopContext';
import api from '../../api';
import remove_icon from '../Assests/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, products, cartItems, removeFromCart } = useContext(ShopContext);

  const handleCheckout = async () => {
    try {
      const cartData = products
        .filter(e => cartItems[e.id] > 0)
        .map(e => ({
          productId: e.id,
          name: e.name,
          image: e.image,
          quantity: cartItems[e.id],
          new_price: e.new_price
        }));

      await api.updateCart(cartData);
      
      alert('Checkout successful! Cart saved.');
  
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to save cart. Please try again.');
    }
  };
  return (
    <>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products && products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className="cartitems-quantity">{cartItems[e.id]}</button>
                <p>₹{e.new_price * cartItems[e.id]}</p>
                <img src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" className="cartitems-remove-icon"/>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
          <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1>cart Totals</h1>
                <div>
                  <div className='cartitems-total-item'>
                    <p>Subtotal</p>
                    <p>₹{getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className='cartitems-total-item'>
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr />
                  <div className='cartitems-total-item'>
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3>
                  </div>
                </div>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
            <div className="cartitems-promocode">
              <p>If you have a promocode, Enter it here</p>
              <div className='cartitems-promobox'>
                <input type="text" placeholder='promo Code'/>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </>
  );
}

export default CartItems;
