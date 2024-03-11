'use client'
import { useEffect, useState } from "react"
import { fetchAllProducts } from "../lib/data"
import { ProductCard } from "@/components/ProductCard"

export default function Page(){
    const [products, setProducts] = useState(null)
    
    useEffect(() => {
        fetchAllProducts()
            .then((products) => {
                setProducts(products)
            })
    }, [])


    const formHandlerSearchProducts = (formData) => {
        fetchAllProducts(formData.get("default-search"))
            .then((products) => {
                setProducts(products)
            })
    }
    
    return (
        <div className="m-5 p-5 grow flex flex-col gap-5 items-center">
            <form className="m-3 w-2/3" action={formHandlerSearchProducts}>   
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" name="default-search" className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-cyan-500 focus:border-cyan-500" placeholder="What are you looking for?" />
                    <button type="submit" className="text-slate-100 absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-cyan-700 hover:bg-cyan-800 focus:ring-cyan-800">Search</button>
                </div>
            </form>
            <div className="w-full grid justify-items-center gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {
                    products && products.map((p, index) => {
                        return <ProductCard
                            key={index}
                            id={p.product_id}
                            name={p.name}
                            price={p.price}
                            buyable={true}
                        ></ProductCard>
                    })
                }
            </div>
        </div>
    )
}