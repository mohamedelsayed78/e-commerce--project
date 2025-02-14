import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { WishContext } from '../../Context/WishlistContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  async function addproducttowish(id)
  {
  let flag=  await addProductToWish(id);
  console.log(flag);
  if(flag)
  {
   toast("product added successfully to wishlist",{position:"top-center"})
 
  }else{
   toast.error("Error",{position:"top-center"})
 
  }
  
  }
  let{addProductToWish}= useContext(WishContext)
  let {addtoCart}= useContext(cartContext)


async function addproducttoCart(id)
 {
 let flag=  await addtoCart(id);
 console.log(flag);
 if(flag)
 {
  toast.success("product added successfully to cart",{position:"top-center"})

 }else{
  toast.error("Error",{position:"top-center"})

 }
 
 }

  function getAllProducts() {
    setLoading(true);
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
        setProducts(res.data.data);
        setFilteredProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  function handleSort(option) {
    let sortedProducts = [...products];
    if (option === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === 'on-sale') {
      sortedProducts = sortedProducts.filter(
        (product) => product.priceAfterDiscount
      );
    } else if (option === 'highest-rating') {
      sortedProducts.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
    }
    setFilteredProducts(sortedProducts);
  }

  function handleSearch(query) {
    setSearchQuery(query);
    const searchResults = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(searchResults);
  }

  useEffect(() => {
    handleSort(sortOption);
  }, [sortOption]);

  if (loading) {
    return (
      <div className="flex justify-center mt-52 md:px-20">
        <BallTriangle height={120} width={120} color="#db27" visible={true} />
      </div>
    ); // Show loader while loading
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-xl text-center text-gray-500">
        No products found matching your search or filter criteria.
      </div>
    );
  }

  return (
    <div className="pt-10 m-8">
      <div className="flex flex-col items-center justify-between gap-3 mb-5 md:flex-row">
        <div className="flex items-center gap-3">
          <label htmlFor="search" className="font-bold text-gray-700">
            Search:
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded w-60"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

   
      </div>

      <div className="grid gap-5 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="relative p-3 border rounded shadow-md group"
          >
            <div className="absolute left-0 right-0 flex justify-center gap-4 transition-opacity opacity-0 bottom-32 group-hover:opacity-100">
              <button
              onClick={()=>addproducttoCart(product._id)}
                title="Add to Cart"
                className="p-2 text-white w-1/2 bg-green-500  hover:bg-green-600"
              >
                + Add
              </button>
              
            </div  >

            <div className="absolute right-0">
            <button
              onClick={()=>addproducttowish(product._id)}
                title="Add to Wishlist"
                className="p-2 text-red-500 bg-slate-900 rounded-full"
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>

            <Link to={`/ProductDetails/${product._id}/${product.category.name}`} className="block">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-auto rounded"
              />
              <h3 className="mt-2 text-lg font-semibold line-clamp-1">
                {product.title}
              </h3>
              <p className="text-gray-500 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                {product.priceAfterDiscount ? (
                  <>
                    <p className="text-sm text-emerald-500 line-through">
                      {product.price} EGP
                    </p>
                    <p className="font-bold text-emerald-500">
                      {product.priceAfterDiscount} EGP
                    </p>
                    <span className="absolute px-2 py-1 text-sm font-bold text-white bg-red-600 rounded-full sale-badge top-2 left-2 animate-pulse">
                      Sale
                    </span>
                  </>
                ) : (
                  <p className="font-bold text-emerald-500">{product.price} EGP</p>
                )}

                <div className="flex items-center">
                  <p className="text-gray-500">{product.ratingsAverage}</p>
                  <i className="text-yellow-500 fa-solid fa-star"></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
