import Link from 'next/link'
import React, { useContext } from 'react'
import CartContext, { useCartContext } from '@/store/CartContext'
import { FaCheckCircle } from 'react-icons/fa';

export default function CartLeft() {
    //const { cartData } =  useCartContext();
    const { cartData } = useContext(CartContext);
    //console.log("kljjljlkll", cartData.lenght)
    let total=0; 
    cartData.forEach((item)=>{
        total += parseInt(item.quantity) * parseFloat(item.price);
    });
  return (
   
        
        <div className="flex flex-col gap-4  w-[20%]">
          <div className="flex flex-col bg-white p-3 h-[300px] w-full gap-7">
            <div className="flex gap-2 items-center">
              <FaCheckCircle className="text-red-500" size={40} />
              <span className="text-[.7rem] text-blue-500">
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </span>
            </div>
            <div className='text-[1.1rem]'><span className='text-xl'>Subtotal ({cartData.length} items){" "}</span> :${total}.00</div>
            <div className="flex items-center justify-center">
            <Link
      href={{
        pathname: '/address',
        //  query:{ userId: session?.user?.id}
      }        
      }
     >
              <div className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]">Procces to buy</div>
              </Link>
            </div>


          </div>
          <div className="flex flex-col bg-white p-3 h-[300px] w-full">
            
          <div className="flex items-center justify-center">
              <h3 className="w-full py-1 text-center text-blue-500 rounded-2xl text-xl">Product you watch</h3>
            </div>

          </div>
        </div>


   
  )
}
