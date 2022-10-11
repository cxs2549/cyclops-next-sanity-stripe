/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import { client, urlFor } from "../lib/client"
import { useStateContext } from "../context/StateContext"
import getStripe from "../lib/getStripe"
import toast from "react-hot-toast"
import Hero from "../components/Hero"
import Link from "next/link"

const Home = ({ products }) => {
  const { onAdd, totalQuantities, cartItems } = useStateContext()

  return (
    <div>
      <Hero />
      <div>
        <div className="mx-auto max-w-2xl py-16 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="max-w-2xl dark:text-white text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-neutral-700 mb-12">Top sellers</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link href={`/product/${product.slug.current}`} key={product._id}>
                <a key={product.id} href={product.href} className="group ">
                  <div className="aspect-w-1 rounded-2xl aspect-h-1 w-full overflow-hidden   xl:aspect-w-7 xl:aspect-h-8 bg-white h-[200px]">
                    <img
                      src={urlFor(product.image[0])}
                      alt={product.imageAlt}
                      className="h-full w-full object-contain object-center  cursor-pointer rounded-2xl hover:scale-90 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700  dark:text-neutral-100">
                    {product.name}
                  </h3>
                  <span className="mt-4 opacity-60 text-sm text-gray-700 dark:text-neutral-100">
                    {product.details}
                  </span>
                  <p className="mt-1 text-lg font-medium text-gray-900 dark:text-neutral-300">
                    $
                    {product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query)

  return {
    props: { products },
  }
}

export default Home
