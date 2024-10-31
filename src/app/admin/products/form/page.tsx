"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import Description from "./componets/Description";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPorductSchema, TnewProductSchema } from "@/lib/types";
import { Images } from "lucide-react";
import { fetchCategories } from "@/app/action/category/dbOperations";
import { fetchbrands } from "@/app/action/brads/dbOperations";
import { addNewProduct } from "@/app/action/products/dbOperation";

type Terror = {
      
  name: string | null;
  price: string | null;
  featured: string | null;
  company: string | null;
  productCat: string | null;
  productDesc: string | null;
  image: string | null;
};
const page = () => {
  const [categories, setCategory] = useState([]);
  const [brands, setBrand] = useState([]);

  useEffect(() => {
    async function prefetch() {
      console.log("inside cat fethc");
      const catData = await fetchCategories();
      const brandData = await fetchbrands();
      setCategory(catData);
      setBrand(brandData);
    }
    prefetch();
  }, []);

  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    setError,
  } = useForm<TnewProductSchema>({
    resolver: zodResolver(newPorductSchema),
  });

  async function onsubmit(data: TnewProductSchema) {
   
    //typeof(data.featured)
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("featured",data.featured);
    formData.append("brand", data.brand);
    formData.append("weight",data.weight);
    formData.append("dimensions",data.dimensions);
    formData.append("productCat", data.productCat);
    formData.append("productDesc", data.productDesc);
    formData.append("image", data.image[0]);

    const result = await addNewProduct(formData);

    if(!result?.errors){
     // router.push('/admin/products')
    
     setValue('name', "");
     setValue('productDesc', "");
     setValue('price', "");
     setValue('productCat',"Select Category")
     setValue('brand',"Select Brand")
     setValue('weight',"")
     setValue('dimensions',"")
     setValue('isFeatured',false)
    }else{
      alert("Some thing went wrong")
    }

    if (result.errors) {
      // not network error but data validation error
      const errors:Terror = result.errors;
       
      if (errors.name) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      } else if (errors.price) {
        setError("price", {
          type: "server",
          message: errors.price,
        });
      } else if (errors.productCat) {
        setError("productCat", {
          type: "server",
          message: errors.productCat,
        });
      }
      if (errors.productDesc) {
        setError("productDesc", {
          type: "server",
          message: errors.productDesc,
        });
      }
      if (errors.image) {
        setError("image", {
          type: "server",
          message: errors.image,
        });
      }
      if (errors.company) {
        setError("company", {
          type: "server",
          message: errors.company,
        });
      }
       else {
      //  alert("Something went wrong");
      }
    }

    console.log(result);

  }

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flexflex flex-col gap-4 p-5">
          <h1>Create Product</h1>

          <div className="flex flex-col lg:flex-row gap-5 ">
            {/* left box */}
            <div className="flex-1 flex flex-col gap-y-5">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Product</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Product Name<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("name")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.name?.message && (
                        <span>{errors.name?.message}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Category<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("productCat")} className="input-style">
                      <option key="wer" value="Mobile">
                        Select Product Category
                      </option>
                      {categories.map(
                        (category: { name: string }, i: number) => {
                          return (
                            <option key={i} value={category.name}>
                              {category.name}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.productCat?.message && (
                        <p>{errors.productCat?.message}</p>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Brand<span className="text-red-500">*</span>{" "}
                    </label>
                    <select {...register("brand")} className="input-style">
                      <option key="wer" value="Mobile">
                        Select Product Brand
                      </option>
                      {brands.map((brand: { name: string }, i: number) => {
                        return (
                          <option key={i} value={brand.name}>
                            {brand.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.brand?.message && (
                        <span>{errors.brand?.message}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Price Details</h1>
                <div className="flex w-full flex-col gap-2  my-15 ">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Price<span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      {...register("price")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.price?.message && (
                        <span>{errors.price?.message}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Weight
                      {/* <span className="text-red-500">*</span>{" "} */}
                    </label>
                    <input
                      {...register("weight")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.weight?.message && (
                        <span>{errors.weight?.message}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <label className="label-style" htmlFor="product-title">
                      Deminsions
                      {/* <span className="text-red-500">*</span>{" "} */}
                    </label>
                    <input
                      {...register("dimensions")}
                      className="input-style"
                      placeholder="Enter Title"
                    />
                    <span className="text-[0.8rem] font-medium text-destructive">
                      {errors.dimensions?.message && (
                        <span>{errors.dimensions?.message}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* End of left box */}

            <div className="flex-1 flex flex-col gap-5 h-full">
              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">Pictures</h1>
                <div className="flex flex-col gap-1">
                  <label className="label-style">Product Image</label>
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    className="input-image-style"
                  />

                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.image && <span>Select product image</span>}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
                <h1 className="font-semibold">General Detail</h1>

                <div className="flex flex-col gap-1">
                  <label className="label-style">Product description</label>

                  <textarea
                    {...register("productDesc", {
                      validate: {
                        pattern: (value: string) => !/[!]/.test(value),
                      },
                    })}
                    className="textarea-style"
                  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.productDesc && (
                      <span>Product description is required</span>
                    )}
                  </p>
                </div>

                {/* <div className="flex  items-center gap-4 ">
                  <label className="label-style">Normal Product</label>
                  <input {...register("featured")} type="radio" value="false" />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.featured?.message && (
                      <p>{errors.featured?.message}</p>
                    )}
                  </p>
                </div> */}

                <div className="flex    items-center gap-4">
                  <label className="label-style">Featured Product</label>
                  <input {...register("featured")} type="checkbox"  />
                  <p className="text-[0.8rem] font-medium text-destructive">
                    {errors.featured?.message && (
                      <p>{errors.featured?.message}</p>
                    )}
                  </p>
                </div>

                <Button type="submit">Add Product </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default page;