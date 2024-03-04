import Link from "next/link";
import { HomeLogo } from "./HomeLogo";
import { Wallet } from "./Wallet";

export function Header(){
    return (
        <div className="bg-slate-900 bg-opacity-70 flex flex-row justify-between items-center px-5 py-2">
            <ul className="flex flex-row gap-10 items-center">
                <li><Link href={"/"}><HomeLogo></HomeLogo></Link></li>
                <li className="underline-animation"><Link href={"/home"}>Buying Home</Link></li>
                <li className="underline-animation"><Link href={"/dashboard"}>Selling Dashboard</Link></li>
                <li className="underline-animation"><Link href={"/about"}>About Us</Link></li>
            </ul>
            <Wallet></Wallet>
        </div>
    )
}