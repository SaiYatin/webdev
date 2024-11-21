import React from 'react'
import './popular.css' 
import data from '../Assests/data'
import Item from '../items/Item'
const Popular = () => {
  return (
    <div className='popular'>
      <h1>POPULAR AMONG GAMERS</h1>
      <hr/>
      <div className='popular-item'>
        {data.map((item)=>{
              return <Item key={Math.random()} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default Popular
