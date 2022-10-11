/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import React, { useState } from "react"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useStateContext } from "../context/StateContext"
import Cart from './Cart'
const Header = () => {
  const [open, setOpen] = useState(false)

    const {totalQuantities} = useStateContext()
  return (
    <header className="dark:bg-[#1E1E1E]">
      <nav className="flex justify-between p-5 max-w-7xl mx-auto items-center">
        <Link href={`/`}>
            <img
              src="/logo.png"
              className="w-[170px] object-contain dark:invert cursor-pointer"
              alt=""
            />
        </Link>
        <div onClick={() => setOpen(true)} className="relative cursor-pointer z-10">
          <AiOutlineShoppingCart className="cursor-pointer" size={25} />
          <span className="absolute bg-black dark:bg-white dark:text-black -top-2 left-4 text-white rounded-full w-4 h-4 grid place-items-center text-xs font-medium">
            {totalQuantities}
          </span>
        </div>
      </nav>
      <Cart open={open} setOpen={setOpen} />
    </header>
  )
}

export default Header
