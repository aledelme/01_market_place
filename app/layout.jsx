import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WalletProvider } from "@/components/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Market Place",
  description: "Personal project for CodeCrypto Academy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className={"min-h-screen bg-gradient-radial from-cyan-900 to-black flex flex-col justify-between"}>
            <Header></Header>
              <div className="grow flex flex-col">
                {children}
              </div>
            <Footer></Footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
