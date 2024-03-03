import { Footer } from "@/components/Footer"
import { MainButton } from "@/components/MainButton"

export default function Home(){
    return (
        <div className="bg-gradient-radial from-cyan-900 to-black
            flex flex-col h-screen">
            <div className="flex flex-col justify-center h-full">
                <h1 className="m-5 text-center text-5xl">Crypto Market Place</h1>
                <div className="m-5 gap-10 flex justify-center">
                    <MainButton to={"/home"}>Start Buying</MainButton>
                    <MainButton to={"/dashboard"}>Start Selling</MainButton>
                </div>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}