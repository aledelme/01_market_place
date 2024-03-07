'use client'

import { MainButton } from "@/components/MainButton"
import { WalletContext, CONNECT_WALLET, NO_WALLET } from "@/components/WalletProvider"
import { useContext, useEffect, useState } from "react"
import { fetchCompanyData, uploadProduct } from "../lib/data"
import { ethers } from "ethers"
import { ProductCard } from "@/components/dashboard/ProductCard"

export default function Page(){
    const { account, connectWallet } = useContext(WalletContext)
    const [ company, setCompany ] = useState(null)
    
    useEffect(() => {
        if (!ethers.isAddress(account)) return
        fetchCompanyData(account)
            .then(c => setCompany(c))
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
        <div className="grid grid-cols-3 auto-rows-max gap-3 p-3 h-full">
            <h1 className="col-span-3 text-3xl">{company.name}</h1>
            <form className="col-span-3 flex gap-3" action={formHandler}>
                <input name="name" className={InputStyle} type="text" placeholder="Product name" required/>
                <input name="price" className={InputStyle} type="number" placeholder="Price" required/>
                <input className={InputStyle + "hover:cursor-pointer hover:bg-cyan-950"} type="submit" value={"Upload product"}/>
            </form>
            <div className="border col-span-2 p-3 gap-5 flex flex-wrap flex-row">
                {company.products.map((p, i) => <ProductCard
                    key={i}
                    name={p.name} 
                    price={p.price}>
                </ProductCard>)}
            </div>
            <div className="border">{JSON.stringify(company.invoices, undefined, 4)}</div>
        </div>
    )
}


const InputStyle = "border border-2 bg-cyan-900 rounded-xl p-2 "