import React from 'react';
import './Hero.css';
import arrow_icon from '../Assests/arrow.png';
import hero_image from '../Assests/hero_image.png';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>  
        <div>
            <h2>ON SALE</h2>
            <div className='hand-icon'>
                <p>Amazing</p>
            </div>
            <p>deals on all</p>
            <p>Graphics Cards</p>
        </div>
        <div className='hero-graphics-btn'>
          <div>Graphics Cards</div>
          <img src={arrow_icon} alt=""/>
        </div>
      </div>
      <div className='hero-right'>
        <img src={hero_image} alt=""/>
      </div>
    </div>
  );
};

export default Hero;
