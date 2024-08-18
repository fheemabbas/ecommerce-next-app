import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { useRouter } from 'next/router';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false); // State to handle animation

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000); // Animation duration
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  const cartItem = cartItems.find((item) => item.id === product.id);
  const productQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div
      key={product.id}
      className={`product-item bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full hover:scale-105 transition-transform duration-300 ease-in-out ${isAdded ? 'animate-add' : ''}`}
    >
      <div>
        <img src={product.image} alt={product.title} className="product-image w-full h-40 object-cover mb-2" />
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-green-500 font-bold">₹{product.price}</p>
      </div>
      {productQuantity > 0 ? (
        <div className="mt-4 flex items-center justify-between">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => handleRemoveFromCart(product)}
          >
            <DeleteOutlineIcon size="small" />
          </button>
          <span className="font-semibold">{productQuantity}</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => handleAddToCart(product)}
          >
            <AddShoppingCartIcon />
          </button>
        </div>
      ) : (
        <button
          className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ${isAdded ? 'bg-green-500' : ''}`}
          onClick={() => handleAddToCart(product)}
        >
          {isAdded ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
