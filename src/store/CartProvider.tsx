"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import { ProductType } from "@/utils/types";
interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {


  const [cartData, setCartData] = useState<ProductType[]>([]);
  const [counter, setCounter] = useState(0);
  const [productTotalCost, setProductTotalCost] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
   // localStorage.setItem("cart_product_data", JSON.stringify(cartData));
   if (isUpdated) {
    localStorage.setItem("cart_product_data", JSON.stringify(cartData));
  } else {
    const cart_data_localstorage: any =
      localStorage.getItem("cart_product_data");

    const data = JSON.parse(cart_data_localstorage);
    setCartData([]);
    if(data){
    data.map((item: ProductType) => {
      setCartData((prevState) => {
        return [...prevState, { ...item }];
      });
    });
  }}
  setIsUpdated(false);
  cartTotal();
  console.log("useEffe 0", cartData)
  }, [cartData]);

  useEffect(() => {
    // const cartItems = localStorage.getItem("cartItems");
    // if (cartItems) {
    // setCartData(JSON.parse(cartData));
    // }
    const cart_data_localstorage: any =
    localStorage.getItem("cart_product_data");

  const data = JSON.parse(cart_data_localstorage);
  setCartData([]);
 
  if(data){
  data.map((item: ProductType) => {
    setCartData((prevState) => {
      return [...prevState, { ...item }];
    });
  });
}

  setIsUpdated(false);
  cartTotal();
  console.log("useEffe1", cartData)
  }, []);


  function cartTotal() {
    var total = 0;
    if (cartData.length > 0) {
      cartData.forEach((element) => {
        total =
          total +
          parseInt(element.quantity) * parseFloat(element.price).toFixed(2);
      });
    }

    setProductTotalCost(total);
    setIsUpdated(true);
  }

  function addProductToCart(newProduct: ProductType) {

    const isItemInCart = cartData.find((cartItem) => cartItem.id === newProduct.id); // check if the item is already in the cart

    if (isItemInCart) {
      setCartData(
        cartData.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
        cartItem.id === newProduct.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem // otherwise, return the cart item
        )
    );
    } else {
      setCartData([...cartData, { ...newProduct, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }

   
   // setIsUpdated(true);
  }

  function decCartProduct(decProduct: ProductType) {
    setCartData(
      cartData.map((item: ProductType) => {
        return item.productId === decProduct.productId
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
          : item;
      })
    );
    setIsUpdated(true);
  }

  function removeCartProduct(item: ProductType) {

    const isItemInCart = cartData.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
      setCartData(cartData.filter((cartItem) => cartItem.id !== item.id)); // if the quantity of the item is 1, remove the item from the cart
    } else {
      setCartData(
        cartData.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
            : cartItem
        )
      );
    }

    // setCartData(
    //   cartData.filter((item: ProductType) => {
    //     return item.productId !== remProduct.productId;
    //   })
    // );

    setIsUpdated(true);
  }

  function emptyCart() {
    setCartData([]);

    setIsUpdated(true);
  }
  function addProduct(newProduct){
    console.log("new add product", newProduct)
    // const product = {
    //   id:"kljljl",
    //   name:"test"
    // }
    //     setCartData((prev)=>{
    //       console.log(prev, product)
    //       return [...prev, product]
    //     })


    const isItemInCart = cartData.find((cartItem) => cartItem.id === newProduct.id); // check if the item is already in the cart

    if (isItemInCart) {
      setCartData(
        cartData.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
        cartItem.id === newProduct.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem // otherwise, return the cart item
        )
    );
    } else {
      setCartData([...cartData, { ...newProduct, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }




  }
  const getCartTotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0); // calculate the total price of the items in the cart
  };
  return (
    <CartContext.Provider
      value={{
        cartData,
        addProduct,
        counter,
        productTotalCost,
        addProductToCart,
        decCartProduct,
        removeCartProduct,
        emptyCart,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};
