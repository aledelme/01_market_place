'use client'

import { createContext, useEffect, useState } from "react";

export const CONNECT_WALLET = "Connect Wallet"
export const NO_WALLET = "No wallet installed"

export const WalletContext = createContext()

export function WalletProvider({children}){
    // const [provider, setProvider] = useState(null)
    const [account, setAccount] = useState(CONNECT_WALLET)

    const setAccounts = (accounts) => {
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

    useEffect(() => {
        if (window.ethereum == null) {
            setAccount(NO_WALLET)
        } else {
            window.ethereum.on("accountsChanged", accounts => setAccounts(accounts))
            window.ethereum.request({method: "eth_accounts"})
                .then(accounts => setAccounts(accounts))
        }
    }, [])

    return (
        <WalletContext.Provider value={{account, connectWallet}}>
            {children}
        </WalletContext.Provider>
    )
}