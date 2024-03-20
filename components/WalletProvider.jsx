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
    const [ chainId, setChainId ] = useState(null)

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
        if (chainId !== process.env.NEXT_PUBLIC_SEPOLIA_ID) return
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const marketCoin = new Contract(contractAddress, abi, signer)

        const amount = await marketCoin.balanceOf(account)
        setBalance(amount)
    }

    const switchToSepolia = async () => {
        try {
            await window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: process.env.NEXT_PUBLIC_SEPOLIA_ID }],
                });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: process.env.NEXT_PUBLIC_SEPOLIA_ID,
                                    chainName: "Sepolia",
                                    rpcUrls: ["https://sepolia.infura.io/v3/"],
                                    blockExplorerUrls: ["https://sepolia.etherscan.io"],
                                    nativeCurrency: {
                                        name: "SepoliaETH",
                                        symbol: "ETH",
                                        decimals: 18
                                      },
                                },
                            ],
                        });
                } catch (addError) {
                    // Handle "add" error.
                }
            } 
            // Handle other "switch" errors.
        }
    }

    useEffect(() => {
        if (window.ethereum == null) {
            setAccount(NO_WALLET)
        } else {
            window.ethereum.on("accountsChanged", accounts => setAccounts(accounts))
            window.ethereum.on("chainChanged", chainId => setChainId(chainId))
            window.ethereum.request({method: "eth_accounts"})
                .then(accounts => setAccounts(accounts))
            window.ethereum.request({method: "eth_chainId"})
                .then(chainId => setChainId(chainId))
        }
    }, [])

    useEffect(() => {
        if (ethers.isAddress(account))
            checkBalance()
    }, [account, chainId])

    return (
        <WalletContext.Provider value={{
            account, connectWallet, 
            balance, checkBalance, 
            chainId, switchToSepolia
        }}>
            {children}
        </WalletContext.Provider>
    )
}