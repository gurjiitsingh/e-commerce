"use client";

import { useCartContext } from "@/store/CartContext";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
//import DynamicRadioButtons from "@/components/formComponents/DynamicRadioButtons";
import Link from "next/link";
import { useState } from "react";


const options = [
  { label: 'Credit Card', value: 'credit_cart' },
  { label: 'Netbanking', value: 'netbanking' },
  { label: 'UPI', value: 'upi' },
];

const page = () => {
  const { data: session } = useSession();
  const { cartData, productTotalCost } = useCartContext();
  const serchParams = useSearchParams();
  const userId = serchParams.get("userId");
  const addressId = serchParams.get("addressId");
  
  const [userAddress, setUserAddress] = useState([]);
  const [addOption, setAddressOption] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

 
  

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };


  return (
    <div className="my-[7%]">
      <div className="flex flex-col ">
        <h1 className="h3 ">Select Payment option</h1>
        <div className="my-5"> 
          {/* <DynamicRadioButtons options={options} onSelect={handleOptionSelect} /> */}
       
          {/* <p>Selected option: {selectedOption}</p> */}
        </div>
        <Button className="w-fit" ><Link href={{
          pathname: '/makeorder',
         
          query:{
            userId:userId,
            addressId:addressId,

          }         
        }}>Use this payment opiton</Link></Button>
      </div>
    </div>
  );
};
export default page;
