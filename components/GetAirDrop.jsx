'use client'

import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { WalletContext } from "./WalletProvider"
import { Contract, ethers } from "ethers"
import { abi, contractAddress } from "@/app/lib/MarketCoin"
export function GetAirDrop(){
    const { account } = useContext(WalletContext)
    const [ hasMinted, setHasMinted] = useState(true)

    useEffect(() => {
        if (!ethers.isAddress(account)) return
        const provider = new ethers.BrowserProvider(window.ethereum)
        provider.getSigner()
            .then((signer) => {
                const marketCoin = new Contract(contractAddress, abi, signer)
                marketCoin.hasMinted()
                    .then((minted) => {
                        setHasMinted(minted)
                    })
            })
    }, [account])

    const getAirDrop = async() => {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner();
        const marketCoin = new Contract(contractAddress, abi, signer)

        try {
            const airDrop = await marketCoin.airDrop()
            await airDrop.wait()
            location.reload()
        } catch(e){} //User denied transaction signature
        
    } 

    return <>
        {   
            !hasMinted &&
            <button onClick={getAirDrop} className={`absolute bottom-3/4 left-3/4 flex flex-row items-center gap-2 p-2
                bg-gradient-to-br from-fuchsia-800 to-fuchsia-500 border-2 border-fuchsia-950 rounded-lg
                hover:bg-gradient-radial hover:from-fuchsia-600 hover:to-fuchsia-700
                hover:scale-110 transition
            `}>
                <Image
                    src={'./gift-icon.svg'}
                    width={25}
                    height={25}
                    alt="gift icon">
                </Image>
                <div>
                    <p>Get Free 1000 CMP</p>
                    <p>Welcome Airdrop!</p>
                </div>
            </button>
        }
    </> 
}