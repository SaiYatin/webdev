import React, { useContext } from 'react'
import './CSS/category.css' 
import dropdown_icon from '../components/Assests/dropdown_icon.png'
import {ShopContext} from '../context/ShopContext'
import Item from '../components/items/Item'
const Category = (props) => {
  const {products} = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <img src={props.banner} alt="" className='shop-category-banner' />
      <div className='shopcategory-indexSort'>
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className='shopcategory-products'>
        {products.map((item)=>{
            if(props.category===item.category){
              return <Item key={Math.random()} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{
              return null;
            }
        })}
      </div>
      <div className='shopcategory-loadmore'>
          Explore More
      </div>
    </div>
  )
}

export default Category
