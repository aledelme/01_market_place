import Image from 'next/image' 

export default function Page(){
    return (
        <div className="grow flex flex-row justify-center items-center">
            <div className="bg-gradient-to-tl from-cyan-950 to-black rounded-md p-10 max-w-3xl space-y-3 relative pl-32 shadow-2xl">
                <Image 
                    src='/alejandro-del-medico-blockchain-web3.jpg'
                    width={200}
                    height={200}
                    alt='Photo Alejandro Del Medico'
                    className='shadow-2xl rounded-lg absolute -left-24'
                ></Image>
                <p>
                    Hi! My name is <MiniLink href="https://www.linkedin.com/in/alejandrodelmedico/">Alejandro</MiniLink>. 
                    This website is a student project for <a href="https://codecrypto.academy/" className="underline">CodeCrypto Academy</a>.
                    The aim is to create a decentralized P2P Market Place, using the Blockchain as database. 
                    So, in order to buy and sell, you should use your EVM Wallet such 
                    as <MiniLink href='https://metamask.io/'>MetaMask</MiniLink> or <MiniLink href='https://rabby.io/'>Rabby</MiniLink> for 
                    sign both transactions of posting and purchasing a product.
                </p>
                <div>
                    To achieve this, I am using the following technology stack:
                    <ul className="list-disc list-inside">
                        <li><MiniLink href='https://nextjs.org'>Next.js</MiniLink> as web framework 
                            for <MiniLink href='https://nodejs.org/'>Node.js</MiniLink> and 
                            empowering <MiniLink href='https://es.react.dev/'>React</MiniLink> components.</li>
                        <li><MiniLink href='https://tailwindcss.com'>Tailwind</MiniLink> as style framework.</li>
                        <li><MiniLink href='https://hardhat.org'>Hardhat</MiniLink> as Blockchain development environment.</li>
                        <li><MiniLink href='https://docs.ethers.org'>Ethers.js</MiniLink> as package for Web3 interaction.</li>
                        <li><MiniLink href='https://www.netlify.com/'>Netlify</MiniLink> as hostage.</li>
                    </ul>
                </div>
                <p>
                    You can find the code of this website on this <MiniLink href="https://github.com/aledelme/01_market_place/">GitHub Repository</MiniLink>.
                </p>
            </div>
        </div>
    )
}

function MiniLink({href, children}){
    return <a href={href}  target="_blank" className="underline">{children}</a>
}