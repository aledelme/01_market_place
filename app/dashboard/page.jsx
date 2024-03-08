'use client'

import { MainButton } from "@/components/MainButton"
import { WalletContext, CONNECT_WALLET, NO_WALLET } from "@/components/WalletProvider"
import { useContext, useEffect, useState } from "react"
import { fetchCompanyData, fetchLastInvoices, uploadProduct } from "../lib/data"
import { ethers } from "ethers"
import { ProductCard } from "@/components/ProductCard"
import { InvoiceCard } from "@/components/dashboard/InvoiceCard"

export default function Page(){
    const { account, connectWallet } = useContext(WalletContext)
    const [ company, setCompany ] = useState(null)
    const [ invoices, setInvoices ] = useState(null)
    
    useEffect(() => {
        if (!ethers.isAddress(account)) return
        fetchCompanyData(account)
            .then(c => setCompany(c))
        fetchLastInvoices(account)
            .then(i => setInvoices(i))
    }, [account])
    

    //WALLET NO CONNECTED
    if (account == CONNECT_WALLET){
        return (
            <div className="text-center">
                <span className="text-4xl m-3">Please, connect your wallet</span>
                <p className="m-2">Please connect your wallet for start selling</p>
                <MainButton to={""} onClick={connectWallet}>Connect Wallet</MainButton>
            </div>
        )
    }

    //WALLET NOT FOUND
    if (account == NO_WALLET){

    }

    if (!company){
        return (
            <div className="text-center">
                <span className="text-4xl m-5">Sign up your company first</span>
                <p className="m-5">Enter your company name</p>
                <MainButton to={""} onClick={connectWallet}>Sing up company</MainButton>
            </div>
        )
    }

    function formHandler(formData) {
        uploadProduct(account, formData.get("name"), formData.get("price"))
            .then(() => {
                location.reload()
            })
    }

    return (
        <div className="p-5 px-7 h-full w-full flex flex-col gap-3">
            <h1 className="text-3xl">{company.name}</h1>
            <form className="flex gap-3" action={formHandler}>
                <input name="name" className={InputStyle} type="text" placeholder="Product name" required/>
                <input name="price" className={InputStyle} type="number" placeholder="Price" required/>
                <input className={InputStyle + "hover:cursor-pointer hover:bg-cyan-950"} type="submit" value={"Upload product"}/>
            </form>
            {/* <div className="flex flex-row gap-3 justify-between"> */}
            <div className="grid grid-cols-10 gap-x-3">
                <h3 className="col-span-7 text-2xl">Your showcase</h3>
                <h3 className="col-span-3 text-2xl">Last invoices</h3>
                <div className="col-span-7 border p-3 gap-y-5 grid justify-items-center grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {company.products.map((p, index) => <ProductCard
                        key={index}
                        name={p.name} 
                        price={p.price}>
                    </ProductCard>)}
                </div>
                <div className="col-span-3 border p-3 flex flex-col gap-3">
                    {invoices && invoices.map((i, index) => <InvoiceCard
                        key={index}
                        date={i.date}
                        customer={i.customer}
                        product={i.product}
                        quantity={i.quantity}
                        total={i.total}>    
                    </InvoiceCard>)}
                </div>
            </div>
        </div>
    )
}


const InputStyle = "border border-2 bg-cyan-900 rounded-xl p-2 "