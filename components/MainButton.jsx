import Link from "next/link";

export function MainButton({to, children}){
    return (
        <Link href={to}
            className="
                mx-3 py-3 px-5 
                bg-cyan-800 hover:bg-cyan-950 
                border rounded-xl 
                text-lg">
            {children}
        </Link>
    )
}