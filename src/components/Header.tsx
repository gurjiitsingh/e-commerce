'use client'
import  Navbar  from "@/components/Navbar"
import Login from "./Login"
import { SessionProvider } from "next-auth/react"
import Cart from "./Cart"
import { CartProvider } from "@/store/CartProvider"
import CartLink from "./CartLink"

const Header = () => {
  return (
    <header className='flex items-center justify-between gap-3 py-4 px-14 border-b '>
      <img className="h-4 md:h-5" src="/favicon.ico" alt="Logo" />

<Navbar />
<SessionProvider><Login /></SessionProvider>
<Cart />
{/* <CartLink /> */}
</header>
  )
}

export default Header