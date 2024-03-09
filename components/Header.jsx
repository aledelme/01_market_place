import Link from "next/link";
import { HomeLogo } from "./HomeLogo";
import { WalletButton } from "./WalletButton";

export function Header(){
    return (
        <div className="bg-slate-900 bg-opacity-70 flex flex-row justify-between items-center px-5 py-2 h-fit">
            <ul className="flex flex-row gap-10 items-center">
                <li><Link href={"/"}><HomeLogo></HomeLogo></Link></li>
                <li className="underline-animation"><Link href={"/shop"}>Shopping Center</Link></li>
                <li className="underline-animation"><Link href={"/dashboard"}>Selling Dashboard</Link></li>
                <li className="underline-animation"><Link href={"/about"}>About</Link></li>
            </ul>
            <WalletButton></WalletButton>
        </div>
    )
}