"use client";
import Link from "next/link";
import Slider from "react-slick";
import { db } from "@/db";
import { product } from "@/db/schema";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/action/products/dbOperation";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { CartProvider } from "@/store/CartProvider";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function IndexPage() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProductPics() {
      const productPics = await fetchProducts();
   
      setProduct(productPics);
    }
    fetchProductPics();
  }, []);

  return (  
    <div className=" bg-red-400">
      <Slider {...settings}>
   
        {products?.map((product, i) => {
          return (
            <div key={i}>
              <div className="w-full h-[500px] bg-white flex flex-col-reverse md:flex-row p-5 md:px-24 md:py-20 ">
                <div className="flex-1 flex flex-col gap-4 md:gap-10 ">
                <h2 className="text-gray-500 text-xs md:text-base">
                    NEW FASHION
                  </h2>
                  <div className="flex flex-col gap-4">
                    <Link href={`/products/${product?.id}`}>
                      <h1 className="md:text-4xl text-xl font-semibold">
                        {product?.name}
                      </h1>
                    </Link>
                    <h1 className="text-gray-600 md:text-sm text-xs max-w-96 line-clamp-2">
                      {product?.Desc}
                    </h1>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/checkout?type=buynow&productId=${product?.id}`}
                    >
                      <button className="bg-blue-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">
                        BUY NOW
                      </button>
                    </Link>
                   
                    
                    <AddToCartButton product={product} />
                      {/* <FavoriteButton productId={product?.id} /> */}
                  </div>
                  {/* </AuthContextProvider> */}


                </div>

                <div className="flex  flex-col ">
                  <img
                    className="h-[14rem] md:h-[23rem]"
                    src={product?.image}
                    alt=""
                  />
                </div>
              </div>
            </div>
          );
        })}
     
      </Slider>
    </div>
  
  );
}
