'use server'
import React from 'react'


  import cat from '@/app/admin/categories/components/Cat';

  import { db } from '@/db'
  import { category } from '@/db/schema'
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ViewList from './components/ViewList';
import Form from './components/Form'



const page = async () => {

  return (
    <div className="mt-10 p-2">
    <h3 className="text-2xl mb-4 font-semibold">
      {/* {title ? title : "items"} */}
    </h3>
    <Form />
    <ViewList />
   
  </div>
  )
}

export default page




  
