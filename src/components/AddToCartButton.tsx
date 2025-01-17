'use client'
import React from 'react'
import { useCartContext } from '@/store/CartContext';

export default function AddToCartButton({product}) {

 
  const ctx = useCartContext();

  function addItemToCart(product){
    //console.log("ljkklklk", product)
    console.log("00000000000", product)
   // ctx.addProduct(product);
   ctx.addProductToCart(product);
  }

  return (
    <button onClick={()=>addItemToCart(product)} className='border px-3 py-1 rounded-xl'>Add to cart</button>
  )
}
