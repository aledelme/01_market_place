'use client'

import { ethers } from "ethers"
import { useEffect, useState } from "react";

export function Wallet(){
    const [provider, setProvider] = useState(null)
    const [account, setAccount] = useState(["Connect Wallet", false])

    useEffect(() => {
        if (window.ethereum == null) {
            setAccount(["No wallet installed", false])
        } else {
            setAccount(["Connect Wallet", true])
        }
    },[])

    function clickHandler() {
        console.log("Wallet")
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
            disabled:hover:bg-opacity-70" disabled={!account[1]}
            onClick={clickHandler}>
            {account[0]}
        </button>
    )
}