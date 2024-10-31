
"use client"
import { db } from '@/db'
import { category } from '@/db/schema'
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { onSubmitNewCategory } from '@/app/action/category/categoryFormAction';

     
      
      const Form = () => {



        // const addTodo =async (formData: FormData) =>{
        //   "use server"
          
        //   console.log(formData.get("name"))
              
        //   const result = await db.insert(category).values({
        //       name:formData.get("name"),
        //       desc:formData.get("desc"),
        //       slug: formData.get("slug")
        //       }).returning({id:category.id});
        //   revalidatePath("/todo")
        //   }

        const addTodo =async (formData: FormData) =>{
         
          
          console.log(formData.get("name"))
              
          const result = await onSubmitNewCategory(formData);
        //  revalidatePath("/todo")
          }


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
      
    export default Form