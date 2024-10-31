"use server";
import { newPorductSchema, TnewProductSchema, editPorductSchema, TeditProductSchema } from "@/lib/types";
import { features } from "process";
import { z } from "zod";
import { deleteImage, upload } from "@/lib/cloudinary";
import { db } from "@/db";
import { product } from "@/db/schema";
import { Weight } from "lucide-react";
import { boolean } from "drizzle-orm/mysql-core";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addNewProduct(formData: FormData) {
  let featured_img: boolean = false;
    console.log(formData.get("name"));
    console.log(formData.get("price"));
    console.log(formData.get("brand"));
    console.log(formData.get("weight"));
    console.log(formData.get("dimensions"));
    console.log(formData.get("productCat"));
    console.log(formData.get("productDesc"));
    console.log(formData.get("image"));
    console.log(formData.get("isFeatured"));

  if (formData.get("isFeatured") === "ture") featured_img = true;

  //console.log("isFeatured ", typeof formData.get("isFeatured"));

  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    weight: formData.get("weight"),
    dimensions: formData.get("dimensions"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = newPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  const image = formData.get("image");
  let imageUrl;
  try {
    imageUrl = await upload(image);
    console.log(imageUrl);
  } catch (error) {
    //  throw new Error("error")
    return { errors: "image cannot uploaded" };
  }

  // const name = formData.get("name");
  // const price = formData.get("price");
  // const productCat = formData.get("productCat");
  // const productDesc = formData.get("productDesc");
  // const featured = formData.get("isFeatured");

  try {
    const result = await db
      .insert(product)
      .values({
        name: formData.get("name"),
        price: formData.get("price"),
        brand: formData.get("brand"),
        weight: formData.get("weight"),
        dimensions: formData.get("dimensions"),
        category: formData.get("productCat"),
        Desc: formData.get("productDesc"),
        image: imageUrl,
        isFeatured: featured_img,
      })
      .returning({ id: product.id });
  } catch (error) {
    console.log(error);
      return { errors: "Can not save" };
  }

  return { message: "Product saved" };
}

export async function deleteProduct(id:string, oldImgageUrl:string) {
  const ida="kjljl"
  const result = await db.delete(product).where(eq(product.id, id));

  console.log("errrrrrrr", result)
  if (result?.rowCount === 1) {

    const imageUrlArray = oldImgageUrl.split("/");
    console.log(imageUrlArray[imageUrlArray.length - 1]);
    const imageName =
      imageUrlArray[imageUrlArray.length - 2] +
      "/" +
      imageUrlArray[imageUrlArray.length - 1];
  
    const image_public_id = imageName.split(".")[0];
    console.log(image_public_id);
    try {
      let deleteResult = await deleteImage(image_public_id);
      console.log("image delete data", deleteResult);
    } catch (error) {
     // console.log(error);
      return {errors:"Somthing went wrong, can not delete product picture"}
    }

       return {
      message: { sucess: "Deleted product" },
    };
  }else{
    return {errors:"Somthing went wrong, can not delete product"}
  }

 
}

export async function editProduct(formData:FormData){
  const id = formData.get("id");
  const image = formData.get("image");
  const oldImgageUrl = formData.get("oldImgageUrl");



  let featured_img: boolean = false;
    // console.log(formData.get("name"));
    // console.log(formData.get("price"));
    // console.log(formData.get("brand"));
    // console.log(formData.get("weight"));
    // console.log(formData.get("dimensions"));
    // console.log(formData.get("productCat"));
    // console.log(formData.get("productDesc"));
    // console.log(formData.get("image"));
    // console.log(formData.get("isFeatured"));

    const isF = formData.get("isFeatured");

    
  if (formData.get("isFeatured").toString() === "true") {
    featured_img = true;
  }
  
  const receivedData = {
    name: formData.get("name"),
    price: formData.get("price"),
    brand: formData.get("brand"),
    weight: formData.get("weight"),
    dimensions: formData.get("dimensions"),
    productCat: formData.get("productCat"),
    productDesc: formData.get("productDesc"),
    image: formData.get("image"),
    isFeatured: featured_img,
  };

  const result = editPorductSchema.safeParse(receivedData);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true };
  }

  let imageUrl;
  if (image === "undefined") {
  
    imageUrl = oldImgageUrl;
  
  } else {
   

    try {
      imageUrl = await upload(image);
    } catch (error) {
      //  throw new Error("error")
      return { errors: "image cannot uploaded" };
    }

    const imageUrlArray = oldImgageUrl.split('/');
    console.log("image public id", imageUrlArray[imageUrlArray.length-1])
    const imageName = imageUrlArray[imageUrlArray.length-2]+"/"+imageUrlArray[imageUrlArray.length-1]
 
    const image_public_id = imageName.split('.')[0] 

    try {
      let deleteResult = await deleteImage(image_public_id);
    
   } catch (error) {
    console.log(error)
   }

  }

   // update database
   try {

     const result = await db.update(product).set({
      name: formData.get("name"),
      price: formData.get("price"),
      brand: formData.get("brand"),
      weight: formData.get("weight"),
      dimensions: formData.get("dimensions"),
      category: formData.get("productCat"),
      Desc: formData.get("productDesc"),
      image: imageUrl,
      isFeatured: featured_img,
    }).where(eq(product.id, id));

    //console.log(result)
    if (result?.rowCount === 1) {
      //revalidatePath("/admin/product/editform");
      return {
        message: { sucess: "Updated " },
      };
    }
    
   } catch (error) {
    console.log("error", error);
  
      return { errors: "Cannot update" };
   
   }


}

export async function fetchProducts(){

  const result = await db.select().from(product);
  return result;
}

export async function fetchProductById(id:string){

  const result = await db.select().from(product).where(eq(product.id,id));
  return result[0];
}