'use client'

import { MainButton } from "@/components/MainButton"
import { WalletContext, CONNECT_WALLET, NO_WALLET } from "@/components/WalletProvider"
import { useContext, useEffect, useState } from "react"
import { fetchCompanyData, fetchLastInvoices, registryCompany, uploadProduct } from "../lib/data"
import { ethers } from "ethers"
import { ProductCard } from "@/components/ProductCard"
import { InvoiceCard } from "@/components/dashboard/InvoiceCard"
import Image from 'next/image' 

export default function Page(){
    const { account, connectWallet } = useContext(WalletContext)
    const [ company, setCompany ] = useState(null)
    const [ invoices, setInvoices ] = useState(null)
    
    useEffect(() => {
        if (!ethers.isAddress(account)) return
        fetchCompanyData(account)
            .then(c => {
                setCompany(c)
                c && fetchLastInvoices(account)
                    .then(i => setInvoices(i))
            })
    }, [account])

    //WALLET NO CONNECTED
    if (account == CONNECT_WALLET){
        return (
            <div className="grow flex flex-col justify-center items-center">
                <span className="text-4xl m-3">Please, connect your wallet</span>
                <p className="m-2">Please connect your wallet for start selling</p>
                <MainButton to={""} onClick={connectWallet}>Connect Wallet</MainButton>
            </div>
        )
    }

    //WALLET NOT FOUND
    if (account == NO_WALLET){
        return (
            <div className="grow flex flex-col justify-center items-center">
                <span className="text-4xl m-3">Upss! It's seems you don't have a wallet :(</span>
                <p className="m-2">Try downloading some of the most popular ones for your browser</p>
                <div className="flex flex-row items-center gap-5">
                    <a href="https://metamask.io/" className="rounded-3xl bg-slate-50 p-3 hover:scale-105 transition">
                        <Image
                            src="/MetaMask-Logo.svg"
                            width={200}
                            height={200}
                            alt="MetaMask Icon"
                            priority={true}
                        />
                    </a>
                    <a href="https://rabby.io/" className="rounded-3xl bg-indigo-400 p-3 hover:scale-105 transition">
                        <Image
                            src="/logo-white.svg"
                            width={200}
                            height={200}
                            alt="Rabby Icon"
                            priority={true}
                        />
                    </a>
                </div>
            </div>
        )
    }

    if (!company){
        return (
            <div className="grow flex flex-col items-center justify-center">
                <form className="flex flex-col items-center gap-3 " action={formHandlerRegistryCompany}>
                    <span className="text-4xl">Sign up your company</span>
                    <input name="name" className={InputStyle + " m-3 w-full"} type="text" placeholder="Company name" required/>
                    <input className={InputStyle + "hover:cursor-pointer hover:bg-cyan-950 w-1/2"} type="submit" value={"Sing up"}/>
                </form>
            </div>
        )
    }

    function formHandlerRegistryCompany(formData) {
        registryCompany(account, formData.get("name"))
            .then(() => {
                fetchCompanyData(account)
                .then(c => {
                    setCompany(c)
                    c && fetchLastInvoices(account)
                        .then(i => setInvoices(i))
                })
            })
    }

    function formHandlerUploadProduct(formData) {
        uploadProduct(account, formData.get("name"), formData.get("price"))
            .then(() => {
                document.getElementsByName("name")[0].value = '';
                document.getElementsByName("price")[0].value = '';
                fetchCompanyData(account)
                    .then(c => {
                    setCompany(c)
                    c && fetchLastInvoices(account)
                    .then(i => setInvoices(i))
                })
            })
    }

    return (
        <div className="grow p-5 px-7 w-full flex flex-col gap-3">
            <h1 className="text-3xl">{company.name}</h1>
            <form className="flex gap-3" action={formHandlerUploadProduct}>
                <input name="name" className={InputStyle} type="text" placeholder="Product name" required/>
                <input name="price" className={InputStyle} type="number" placeholder="Price" required/>
                <input className={InputStyle + "hover:cursor-pointer hover:bg-cyan-950"} type="submit" value={"Upload product"}/>
            </form>
            <div className="grid grid-cols-10 gap-x-3">
                <h3 className="col-span-7 text-2xl">Your showcase</h3>
                <h3 className="col-span-3 text-2xl">Last invoices</h3>
                <div className="col-span-7 border p-3 gap-y-5 grid justify-items-center content-start grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
                        units={i.units}
                        total={i.total}>    
                    </InvoiceCard>)}
                </div>
            </div>
        </div>
    )
}


const InputStyle = "border border-2 bg-cyan-900 rounded-xl p-2 "