import React , {useContext} from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext' 
import Breadcrum from '../components/Breadcrums/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Product = () => {
  const {products}=useContext(ShopContext);
  const {productId}=useParams();
  const product = products.find((e)=>e.id===Number(productId));
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Product
