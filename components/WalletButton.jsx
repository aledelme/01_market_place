'use client'

import { ethers } from "ethers"
import { useContext } from "react";
import { WalletContext, NO_WALLET } from "./WalletProvider";


export function WalletButton(){
    const { account, setAccount } = useContext(WalletContext)

    const connectWallet = () => {
        window.ethereum.request({method: "eth_requestAccounts"})
            .then(accounts => {
                setAccount(accounts[0])
        })
    }

    return (
        <button className="py-1 px-3
            rounded-2xl
            bg-cyan-900
            hover:bg-cyan-950
            text-cyan-400
            bg-opacity-70
            font-semibold 
            disabled:cursor-not-allowed 
            disabled:hover:bg-cyan-900 
            disabled:hover:bg-opacity-70" disabled={account == NO_WALLET}
            onClick={connectWallet}>
            {ethers.isAddress(account) ? `${account.substring(0, 6)} ... ${account.substring(account.length -4)}` : account}
        </button>
    )
}