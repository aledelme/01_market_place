import { MainButton } from "@/components/MainButton"

export default function Home(){
    return (
        <div className="flex flex-col justify-center h-full">
            <h1 className="m-5 text-center text-5xl">Crypto Market Place</h1>
            <h2 className="mb-5 text-center">P2P free market. Buy and sell with your Web3 Wallet</h2>
            <div className="m-5 gap-10 flex justify-center">
                <MainButton to={"/home"}>Start Buying</MainButton>
                <MainButton to={"/dashboard"}>Start Selling</MainButton>
            </div>
        </div>
    )
}