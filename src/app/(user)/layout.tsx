"use client";
import Sidebar from "@/app/admin/components/Sidebar";
import Header from "@/app/admin/components/Header";
import React, { useEffect, useRef, useState } from "react";
import "../globals.css";
import { Metadata } from "next";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react"
// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const sidebarRef = useRef(null);

  function togelSideBar() {
    setIsOpen((state) => !state);
  }
  useEffect(() => {
    setIsOpen((state) => !state);
  }, [path]);


  useEffect(()=>{
    function handleClickedOutSideSidebar(event){
      alert("works")
      if(sidebarRef.current && !sidebarRef?.current?.contains(event.target)){
        setIsOpen(false);
      }
      document.addEventListener("mousedown", handleClickedOutSideSidebar);
      return () => document.removeEventListener("mousedown", handleClickedOutSideSidebar)
    }


  },[])

  return (
    <html lang="en">
      <body>
        <main className="relative flex">
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div
          ref={sidebarRef}
            className={`fixed md:hidden z-30 bg-white
            ${isOpen ? "translate-x-0 " : "-translate-x-[290px]"}
            `}
          >
            <Sidebar />
          </div>

          <div className="w-full flex flex-col">
            <div className="">
              <Header togelSideBar={togelSideBar} />
            </div>
            <div className="w-full flex flex-col p-5 mt-12 bg-slate-100 h-screen">
            <SessionProvider > {children}</SessionProvider>
             
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
