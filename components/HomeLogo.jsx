import Image from 'next/image' 
export function HomeLogo(){
    return (
        <div className='flex gap-2 p-1 border-2 border-gray-400 rounded-full'>
            <Image src="/logo.png"
                width={25}
                height={25}
                alt="CMP Logo"/>
            Crypto Market Place
        </div>
    )
}