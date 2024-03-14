'use client'

import { buyProduct } from '@/app/lib/data';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useContext, useState } from 'react';
import { WalletContext, CONNECT_WALLET, NO_WALLET } from './WalletProvider';
import Link from 'next/link';
import { Contract, ethers } from 'ethers';
import { abi, contractAddress } from '@/app/lib/MarketCoin';

export function ProductCard({id, name, price, buyable, company}){
    const { account, connectWallet, checkBalance } = useContext(WalletContext)
    const [openModal, setOpenModal] = useState(false);
    const [units, setUnits] = useState(1);
    const [validUnits, setValidUnits] = useState(true)

    const [bought, setBought] = useState(false)
  
    function onCloseModal() {
      setOpenModal(false);
    }

    function onOpenModal(){
        setOpenModal(true)
        setBought(false)
        setUnits(1);
        setValidUnits(true)
    }

    async function formHandler(){
        if (units > 0){
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner();
            const marketCoin = new Contract(contractAddress, abi, signer)
            try {
                const airDrop = await marketCoin.transfer(company, ethers.parseEther(String(units*price)))
                await airDrop.wait()
                await buyProduct(account, id, units, units*price)
                setBought(true)
                setTimeout(() => setOpenModal(false), 2000)
                checkBalance()
            } catch(e){} //User denied transaction signature
        } else {
            setValidUnits(false)
        }
    }

    return (
        <>
        <div className={`border p-2 bg-cyan-900 h-min w-min transition duration-300 ease-in-out hover:scale-110
            ${buyable && 'hover:cursor-pointer'}`} 
            onClick={buyable && onOpenModal}>
            <div className="border relative aspect-square h-40 bg-cyan-950">
                <p className="absolute inset-0 flex items-center justify-center transform -rotate-45 text-base">
                    {name}
                </p>
            </div>
            <div>{price} CMP</div>
        </div>
        
        <Modal show={openModal} size="md" onClose={onCloseModal} popup dismissible>
            <Modal.Header className='bg-cyan-900'/>
            <Modal.Body className='bg-cyan-900'>
            <div>
                <h3 className="text-2xl font-medium text-white">{name}</h3>
                <h4 className="text-lg font-extralight text-white">{price} CMP</h4>
                <div className='my-5'>
                    <div className="mb-2 block">
                        <Label htmlFor="units" value="Units:" color={!validUnits && 'failure'} />
                    </div>
                    <TextInput
                        type='number'
                        id="units"
                        min={1}
                        step={1}
                        value={units}
                        onChange={(event) => {
                            if (event.target.value < 0){
                                setUnits(1)
                                setValidUnits(true)
                            } else if (/^\d*$/.test(event.target.value)) {
                                setUnits(event.target.value)
                                setValidUnits(true)
                            }
                        }}
                        color={!validUnits && 'failure'}
                        className='text-black'
                        helperText={
                            !validUnits &&
                             <span className="font-medium">No valid number. Min 1</span>
                          }
                    />
                </div>
                <div className="w-full flex flex-row justify-between items-center">
                    <div><span className='underline'>Total:</span> {price * units} CMP</div>
                    {account === NO_WALLET && <Button className='p-1' disabled={true}>Buy</Button>}
                    {account !== NO_WALLET && 
                        <Button className='p-1' onClick={account === CONNECT_WALLET ? connectWallet : formHandler}>
                            {account === CONNECT_WALLET ? CONNECT_WALLET : 'Buy'}
                        </Button>
                    }
                </div>
                {bought && <span className='bg-cyan-950 p-1 rounded-lg'>Bought! Thanks for purchasing!</span>}
                {account === NO_WALLET && <span className='bg-cyan-950 p-1 rounded-lg text-red-600'><Link href={'/dashboard'}>You need a EVM Wallet for purchasing</Link></span>}
            </div>
            </Modal.Body>
        </Modal>
        </>
    )
}



