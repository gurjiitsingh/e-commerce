'use client'
import CategoryList from './components/CategoryList';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default  function Categories(){
const [categories, setCategories ] = useState([])
const router = useRouter();

    useEffect(()=>{
        console.log("===sdfsfs===========")
      async function categoryList(){
const result = await fetch("http://localhost:3000/api/categories", { next: { tags: ['collection'] } });
const data = await result.json();
setCategories(data.data.category);
console.log(data.data.category)
        }
        categoryList();
       
    },[])


//     useEffect(()=>{

// console.log("working")
// router.refresh();

//     },[categories])

//     console.log(categories)


    return(<>
    {/* <Cat /> */}
    <CategoryList categories={categories} />
 
    </>)
}