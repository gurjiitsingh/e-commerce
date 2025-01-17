"use client";
import Link from "next/link";
import Slider from "react-slick";
import { db } from "@/db";
import { product } from "@/db/schema";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/app/action/products/dbOperation";
import { fetchCategories } from "@/app/action/category/dbOperations";
import Image from "next/image";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchcategoryData() {
      const categoryData = await fetchCategories();
      setCategories(categoryData);
    }
    fetchcategoryData();
  }, []);

  return (
    <div className="m-[30px] h-[150xp] px-24 gap-4 bg-violet-200">
      <Slider {...settings}>
        {categories?.map((category, i) => {
          return (
            <div key={i} className="px-2">
              <div className="flex flex-col md:flex-row gap-4 border">
                <div className="h-[250px] w-fit rounded-md  p-2">
                  <img className="h-[200px] rounded-md" src={category.imgUrl} />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-md font-semibold"> {category.name}</h3>
                  <div> These are best quality products</div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
