import React,{ useContext, useEffect, useState } from 'react';

import axios from 'axios';


export default function AllOrders() {
    const [orders, setOrders] = useState([]);
  
      async function getAllOrders() {
          let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders`);
        console.log(data.data);
        setOrders(data.data)
          
      }
  
      useEffect(() => {
          getAllOrders();
      },[])
  
    return <>
      
      <div className="row py-10">
      <h1 className="text-5xl text-center text-emerald-500 font-semibold pt-10 mb-5">
       All Orders
      </h1>
        {orders.map((order) =>
          <div key={order.user._id} className='w-full'>
            <div className="order border-solid border-e-2 border-s-2 border-yellow-950 shadow hover:border-none hover:shadow-red-800  p-3 m-1">
              <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono
                  font-semibold'>Name :</span> {order.user.name} </h3>
              <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono
                  font-semibold'>Order Id  :</span> {order.id} </h3>
              <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono
                  font-semibold'>Phone :</span> {order.user.phone} </h3>
              <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono 
                font-semibold'>Payment Type :</span> {order.paymentMethodType} </h3>
              <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono
                  font-semibold'>Total Price :</span> $ {order.totalOrderPrice} </h3>
              <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono 
                font-semibold'>Order Count :</span> {order.cartItems.length} </h3>
                <h3 className='text-lg capitalize text-gray-500'>
                <span className='text-black text-xl font-mono 
                font-semibold'>Email :</span> {order.user.email} </h3>
            </div>
          </div>
        )}
      </div>
    </>
    
  }


            
