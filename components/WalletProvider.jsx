'use client'

import { abi, contractAddress } from "@/app/lib/MarketCoin";
import { ethers, Contract } from "ethers";
import { createContext, useEffect, useState } from "react";

export const CONNECT_WALLET = "Connect Wallet"
export const NO_WALLET = "No wallet installed"

export const WalletContext = createContext()

export function WalletProvider({children}){
    // const [provider, setProvider] = useState(null)
    const [ account, setAccount ] = useState(CONNECT_WALLET)
    const [ balance, setBalance ] = useState(0n)

    const setAccounts = async (accounts) => {
        if (accounts.length){
            setAccount(accounts[0])            
        } else {
            setAccount(CONNECT_WALLET)
        }
    }

    const connectWallet = () => {
        window.ethereum.request({method: "eth_requestAccounts"})
            .then(accounts => {
                setAccount(accounts[0])
        })
    }

    const checkBalance = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const marketCoin = new Contract(contractAddress, abi, signer)

        const amount = await marketCoin.balanceOf(account)
        setBalance(amount)
    }

    useEffect(() => {
        if (window.ethereum == null) {
            setAccount(NO_WALLET)
        } else {
            window.ethereum.on("accountsChanged", accounts => setAccounts(accounts))
            window.ethereum.request({method: "eth_accounts"})
                .then(accounts => setAccounts(accounts))
        }
    }, [])

    useEffect(() => {
        if (ethers.isAddress(account))
            checkBalance()
    }, [account])

    return (
        <WalletContext.Provider value={{account, connectWallet, balance, checkBalance}}>
            {children}
        </WalletContext.Provider>
    )
}