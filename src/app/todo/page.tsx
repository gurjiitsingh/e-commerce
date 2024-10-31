'use server'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "@/components/ui/table";

  import cat from '@/app/admin/categories/components/Cat';
import { db } from '@/db'
import { category } from '@/db/schema'
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// export async function fetchCategories(){

//     const result = await db.select().from(category)
//     return result;
// }

const page = async () => {

    const categories = await db.select().from(category)
    console.log("result ", categories)

  return (
    <div className="mt-10 p-2">
    <h3 className="text-2xl mb-4 font-semibold">
      {/* {title ? title : "items"} */}
    </h3>
    <Form />
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
  </div>
  )
}

export default page



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
  
const addTodo =async (formData: FormData) =>{
"use server"

console.log(formData.get("name"))
    
const result = await db.insert(category).values({
    name:formData.get("name"),
    desc:formData.get("desc"),
    slug: formData.get("slug")
    }).returning({id:category.id});
revalidatePath("/todo")
}
 
  
  const Form = () => {
    return (
        <>
        <div className="flex flex-col  md:flex-row gap-4">
          <div className="w-full md:w-[40%] rounded-xl bg-white p-5">
            <form action={addTodo}>
              <div className="flex w-full flex-col gap-2  my-15 ">
                {/* register your input into the hook by invoking the "register" function */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="label-style">Name<span className="text-red-500">*</span>{" "}</label>
                  <input name="name" className="input-style" />
                 
                </div>
  
                <div className="flex flex-col gap-1">
                  <label className="label-style">Description<span className="text-red-500">*</span>{" "}</label>
                  <input name="desc"  className="input-style" />
                
                </div>
  
                <div className="flex flex-col gap-1">
                  <label className="label-style">Slug</label>
                  <input name="slug" className="input-style" />
                 
                </div>
  
               
  
                <Button className="bg-slate-100 "  type="submit">Add </Button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-[60%] rounded-xl bg-white p-3">
  
           
          </div>
        </div>
      </>
    )
  }
  
