"use server";
import { z } from "zod";
import { categorySchema, TcategorySchema } from '@/lib/types';
import { category } from '@/db/schema';
import { db } from '@/db'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from "drizzle-orm";


export async function onSubmitNewCategory( formData: FormData) {
 
  console.log("----------- category server action -------")
console.log(formData.get("name"))
console.log(formData.get("desc"))
console.log(formData.get("slug"))

const recievedData = {
  name:formData.get("name"),
  desc:formData.get("desc"),
  slug: formData.get("slug"),
}

const result = categorySchema.safeParse(recievedData)

let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }



try {
  const result = await db.insert(category).values({
  name:formData.get("name"),
  desc:formData.get("desc"),
  slug: formData.get("slug")
  }).returning({id:category.id});
 
if(result?.[0].id){
  revalidatePath('/admin/category')
  return {
    message: {sucess:"Category Created"}
  }
}
 
} catch (error) {
  console.log(error);
  return JSON.stringify({
    message: {error}
  }) 
}

}


export async function editCategoryAction(formData: FormData){
 
  const id = formData.get("id");
    
  const recievedData = {
    name:formData.get("name"),
    desc:formData.get("desc"),
    slug: formData.get("slug"),
  }
  
 
  const result = categorySchema.safeParse(recievedData)
  
  let zodErrors = {};
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
      });
  
      return Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { success: true };
    }
  
  
  
  try {
  
   const result = await db
   .update(category)
   //.values({ name:formData.get("name"), desc:formData.get("desc"), slug: formData.get("slug") })
   .set(
    recievedData,
   ).where(eq(category.id, id));


   revalidatePath('/admin/categories')

   // console.log(result)
  if(result?.rowCount===1){
    revalidatePath('/','layout')
    return {
      message: {sucess:"Updated Created"}
    }
  }
   
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      message: {error}
    }) 
  }

}