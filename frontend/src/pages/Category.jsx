import React, { useContext } from 'react'
import './CSS/category.css' 
import dropdown_icon from '../components/Assests/dropdown_icon.png'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/items/Item'

const Category = (props) => {
    const { products, isLoading, error } = useContext(ShopContext);
    
    if (isLoading) {
        return <div className="shop-category-loading">Loading products...</div>;
    }
    
    if (error) {
        return <div className="shop-category-error">{error}</div>;
    }
    
    const categoryProducts = products.filter(item => item.category === props.category);

    return (
        <div className='shop-category'>
            <img src={props.banner} alt="" className='shop-category-banner' />
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing 1-{categoryProducts.length}</span> out of {products.length} products
                </p>
                <div className='shopcategory-sort'>
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className='shopcategory-products'>
                {categoryProducts.length > 0 ? (
                    categoryProducts.map((item) => (
                        <Item 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price}
                        />
                    ))
                ) : (
                    <div className="no-products-message">
                        No products found in this category
                    </div>
                )}
            </div>
            {categoryProducts.length > 0 && (
                <div className='shopcategory-loadmore'>
                    Explore More
                </div>
            )}
        </div>
    )
}

export default Category