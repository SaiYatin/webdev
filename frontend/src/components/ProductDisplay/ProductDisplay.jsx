import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assests/star_icon.png'
import star_dull_icon from '../Assests/star_dull_icon.png'
import { ShopContext } from '../../context/ShopContext'



const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img'>
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className='productdisplay-right'>
        <h1>{product.name}</h1>
        <div className='productdisplay-right-stars'>
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" /> 
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(69)</p>
        </div>
        <div className='productdisplay-right-prices'>
            <div className='productdisplay-right-price-old'>₹{product.old_price}</div>
            <div className='productdisplay-right-price-new'>₹{product.new_price}</div>
        </div>
        <div className='productdisplay-right-description'>
            Building a PC is a blend of art and engineering, requiring a thoughtful balance of functionality, aesthetics, 
            and performance. Each component plays a critical role in crafting a machine tailored to specific needs, 
            from gaming to content creation. The process begins with selecting a processor and motherboard that align 
            with your performance goals and budget, followed by choosing compatible RAM, a reliable power supply, and 
            a cooling solution to maintain optimal temperatures. The graphics card determines visual fidelity, especially 
            for gaming or 3D rendering, while storage options balance speed and capacity. Aesthetics come into play with the 
            case, RGB lighting, and cable management, transforming a functional build into a personalized
            masterpiece. The result is a system that not only meets technical requirements but also reflects the builder's 
            vision and creativity.
        </div>
        <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
      </div>
    </div>
  )
}

export default ProductDisplay
