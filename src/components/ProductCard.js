import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { useRouter } from 'next/router';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  console.log("cartItems :::",cartItems)

  const handleGoToCart = (product) => {
    dispatch(addToCart(product))
    setTimeout(()=>{
        router.push('/cart');
    },1000)
  };
  return (
    <div key={product.id} 
    className="product-item bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      <div>
        <img src={product.image} alt={product.title} className="product-image w-full h-40 object-cover mb-2" />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-green-500 font-bold">${product.price}</p>
      </div>
      {cartItems?.length > 0 && cartItems.filter((i=> i.id === product.id)).length >= 1?
       <button
       className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
       onClick={() => handleGoToCart(product)}
     >
       Go to Cart
     </button>
      : <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>}
    </div>
  );
};

export default ProductCard;
