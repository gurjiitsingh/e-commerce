"use client";
import { db } from "@/db";
import { product } from "@/db/schema";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/action/products/dbOperation";
import { fetchCategories } from "@/app/action/category/dbOperations";
import Image from "next/image";

import { Button } from "@nextui-org/react";

import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";

export default function Collections() {

    const [collections, setCategories] = useState([]);

  useEffect(() => {
    async function fetchcategoryData() {
      const categoryData = await fetchCategories();
     
      setCategories(categoryData);
    }
    fetchcategoryData();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (collections.length === 0) {
    return <></>;
  }

  return (
    <div className="overflow-hidden md:p-10 p-5">
      <Slider {...settings}>
        {(collections?.length <= 2
          ? [...collections, ...collections, ...collections]
          : collections
        )?.map((collection, i) => {
          return (
            <div key={i} className="px-2">
              <div className="flex gap-4 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-7 w-full rounded-xl h-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex flex-col gap-4">
                    <h1 className="md:text-lg text-base font-semibold">
                      {collection?.name}
                    </h1>
                    <h1 className="text-gray-600 text-xs md:text-sm max-w-96 line-clamp-2">
                      {collection?.Dsec}
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/collections/${collection?.id}`}>
                      <button className="bg-blue-500 text-white text-xs md:text-sm px-4 py-2 rounded-lg">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full">
                  <img
                    className="h-[4rem] md:h-[9rem]"
                    src={collection?.imgUrl}
                    alt={collection?.name}
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
