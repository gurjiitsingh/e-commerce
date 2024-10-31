"use client";
import React, { useEffect, useState, useTransition } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { deleteCategory } from "@/app/action/category/fetchCategories";
//import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";


type Titem = {
  categoryId: String;
  name: String;
  desc: String;
  slug: String;
};

export default function CategoryList({ categories }: Titem) {
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  return (
    <>
      <div className="mt-10 p-2">
        <h3 className="text-2xl mb-4 font-semibold">
          {/* {title ? title : "items"} */}
        </h3>
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
              return <TableRows item={item} />
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function TableRows({item}) {
  const router = useRouter();
  console.log(item);
  async function handleDelete() {

    // fetch('http://localhost:3000/api/categories',{
    //   method:"DELETE",
    //   body:JSON.stringify({id:item.id})

    // })
    await deleteCategory(JSON.stringify({id:item.id}));
    router.push('/admin/categories')
  }

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
              <CiEdit />
            </Button>
          </Link>

          <Button onClick={handleDelete} className="bg-red-500">
            <MdDeleteForever className="text-white" />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
