import Image from "next/image";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider"
import CategorySlider from "@/components/CategorySlider";
import CategorySlider1 from "@/components/CategorySlider1";
import Collections from "@/components/Collections"
import ProductsGridView from "@/components/Products"
import Products from '@/components/products/Products'
import Brands from '@/components/Brands'
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
  
    <HeroSlider />
    {/* <Products /> */}
    <CategorySlider />
    
    <CategorySlider1 />
    <Collections />
    <ProductsGridView />
    <Brands />
    <Footer />
    </>
  );
}
