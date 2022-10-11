/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai"
import {BiHeart} from 'react-icons/bi'

import { client, urlFor } from "../../lib/client"
import { useStateContext } from "../../context/StateContext"

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product
  const { onAdd } = useStateContext()
  return (
    <div className="grid px-5 pt-7">
      <div className="max-w-lg lg:max-w-7xl mx-auto flex flex-col lg:flex-row gap-2 lg:gap-20 mt-8 w-full">
        <div className=" bg-white rounded-2xl">
          <img
            src={urlFor(image[0])}
            alt=""
            className="md:max-w-lg rounded-2xl"
          />
        </div>
        <div className="p-5 rounded-2xl bg-neutral-200 grid sm:grid-cols-2 sm:gap-4 w-full">
          <div>
            <h2 className="text-sm dark:text-black lg:text-lg opacity-50">
              {details}
            </h2>
            <h1 className="text-lg mb-4 lg:text-2xl font-bold dark:text-black">
              {name}
            </h1>
            <h3 className="font-medium lg:text-xl text-neutral-500">
              ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h3>
            <button
              className="bg-black text-white dark:bg-white dark:text-black  rounded-full px-4 py-2 font-medium mt-8"
              onClick={() => onAdd(product, 1)}
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-8 sm:mt-0 flex flex-col justify-between">
            <p className="text-neutral-700">
              Why should you be forced to choose between aerodynamics and weight,
              between ride quality and speed? It’s simple, you shouldn’t. Enter
              the new {name}—climb on the lightest bike the UCI allows, then
              descend on the fastest.{" "}
            </p>
            <div className="flex justify-between">
              <div className="flex items-center gap-1 text-neutral-700">
                <BiHeart size={30} />
                <p>Wishlist</p>
              </div>
              <div className="flex items-center gap-1 text-neutral-700">
                <AiFillStar size={30} />
                <p>Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: "blocking",
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

export default ProductDetails
