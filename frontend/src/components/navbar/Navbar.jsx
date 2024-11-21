import React from 'react'
import { useState } from 'react'
import './Navbar.css'
import logo from '../Assests/logo.png'
import cart_icon from '../Assests/cart_icon.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
const Navbar = () => {
    const[menu,setMenu] = useState("Shop");
    const {getTotalCartItems}= useContext(ShopContext);
  return (
    <div className = 'navbar'>
      <div className='nav_logo'>
        <img src = {logo} alt = ""/>
      </div>
      <ul className = "nav_menu">
        <li onClick={()=>{setMenu("Shop")}}><Link to='/' style={{textDecoration:"none"}}>Shop</Link>{menu==="Shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Processors")}}><Link to='/Processors' style={{textDecoration:"none"}}>Processors</Link>{menu==="Processors"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Motherboards")}}><Link to='/Motherboards' style={{textDecoration:"none"}}>Motherboards</Link>{menu==="Motherboards"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Graphics Cards")}}><Link to='/Graphics Cards' style={{textDecoration:"none"}}>Graphics Cards</Link>{menu==="Graphics Cards"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("RAM")}}><Link to='/RAM' style={{textDecoration:"none"}}>RAM</Link>{menu==="RAM"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Storage")}}><Link to='/Storage' style={{textDecoration:"none"}}>Storage</Link>{menu==="Storage"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Power Supply")}}><Link to='/Power Supply' style={{textDecoration:"none"}}>Power Supply</Link>{menu==="Power Supply"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("Cases")}}><Link to='/Cases' style={{textDecoration:"none"}}>Cases</Link>{menu==="Cases"?<hr/>:<></>}</li>
      </ul>
      <div className = "nav-login-cart">
        <Link to='/login' style={{textDecoration:"none"}}><button>Login</button></Link>
        <Link to='/Cart' style={{textDecoration:"none"}}><img src = {cart_icon} alt = ""/></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
