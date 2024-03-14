'use client'
import { useContext } from "react"
import { WalletContext } from "./WalletProvider"
import { ethers } from "ethers"


export function BalanceCMP(){
    const { balance } = useContext(WalletContext) 
    return  <div className="bg-slate-950 text-slate-300 p-2 px-4 rounded-full">
            Cash: {ethers.formatEther(balance)} CMP
        </div>
}