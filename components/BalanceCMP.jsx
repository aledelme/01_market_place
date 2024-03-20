'use client'
import { useContext } from "react"
import { WalletContext } from "./WalletProvider"
import { ethers } from "ethers"


export function BalanceCMP(){
    const { balance, chainId, switchToSepolia } = useContext(WalletContext)

    return (
        <div className="bg-slate-950 text-slate-300 p-2 px-4 rounded-full">
            {
                    !chainId || chainId === process.env.NEXT_PUBLIC_SEPOLIA_ID ?
                    <span>Cash: {ethers.formatEther(balance)} CMP</span> :
                    <button className="hover:underline" onClick={switchToSepolia}>Switch to Sepolia</button>
            }      
        </div>
    ) 
}