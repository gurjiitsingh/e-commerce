'use server'
import React, { useEffect, useState } from 'react'
import { db } from '@/db'
import { category } from '@/db/schema'
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "@/components/ui/table";

const ViewList = async () => {
  //const [categories, setCategories ] = useState([])




// useEffect(()=>{
//   console.log("===sdfsfs===========")
// async function categoryList(){
// const result = await fetch("http://localhost:3000/api/categories");
// const data = await result.json();
// setCategories(data.data.category);
// console.log(data.data.category)
//   }
//   categoryList();
 
// },[])

    const categories = await db.select().from(category)
    console.log("result ", categories)



  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:table-cell">Name</TableHead>
          <TableHead className="hidden md:table-cell">
            Description
          </TableHead>
          <TableHead className="hidden md:table-cell">Image</TableHead>
          <TableHead className="hidden md:table-cell">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((item: Titem) => {
          return <TableRows key={item.id} item={item} />
        })}
      </TableBody>
    </Table>
  )
}


function TableRows({item}) {
   
  // console.log(item);
  // async function handleDelete() {

  //   // fetch('http://localhost:3000/api/categories',{
  //   //   method:"DELETE",
  //   //   body:JSON.stringify({id:item.id})

  //   // })
  // //   await deleteCategory(JSON.stringify({id:item.id}));
  // //   router.push('/admin/categories')
  // }

  return (
    <>
      <TableRow key={item.name}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.desc}</TableCell>
        <TableCell>
          {/* <Image src={item.image} width={100} height={100} alt={item.name} /> */}
        </TableCell>

        <TableCell>{/* <FeaturitemUpdate /> */}</TableCell>

        <TableCell>
          <Link
            href={`/dashboard/items/edit?pid=${item.id}&prodcuctName=${item.name}`}
          >
            <Button>
             Edit
            </Button>
          </Link>

          {/* <Button onClick={handleDelete} className="bg-red-500">
          delete
          </Button> */}
        </TableCell>
      </TableRow>
    </>
  );
}

export default ViewList