import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import axios from 'axios';
import ProductCard from './ProductCard';
import Head from 'next/head';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async (limit = 5, page = 1) => {
    try {
      const response = await axios.get(`${API_URL}?limit=${limit}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const loadMoreProducts = async () => {
    try {
      const newProducts = await fetchProducts(20, page);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setLoading(true);
      loadMoreProducts();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Head>
        <title>E Store Web</title>
      </Head>
      {products.map((product) => (
        <ProductCard
            product={product}
        />
      ))}
      {loading && <p className="col-span-full text-center">Loading more products...</p>}
    </div>
  );
};

export default ProductList;
