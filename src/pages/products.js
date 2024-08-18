import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products?limit=5`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [page]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
              <h2 className="text-lg font-bold">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={page === 1} className="bg-gray-300 px-4 py-2">
          Previous
        </button>
        <button onClick={nextPage} className="bg-gray-300 px-4 py-2">
          Next
        </button>
      </div>
    </div>
  );
}
