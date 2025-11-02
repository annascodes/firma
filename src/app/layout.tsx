import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { checkUser } from "../../lib/checkUser";
import Navbar from "../../components/Navbar";
import { Outfit } from 'next/font/google';
// import Providers from "@/lib/redux/Providers"; 
import Providers from "../../lib/redux/Providers";
import ToasterProvider from "components/ToasterProvider";


// Configure the font
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
});



export const metadata: Metadata = {
  title: "Firma",
  description: "Firm, where you can manage your companies and businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const user = checkUser()
  return (
    <ClerkProvider>
      <html data-theme="light" lang="en">
        <body className={outfit.className}>
          <Providers>
            <Navbar />
            <div className="p-2 mt-16  ">
              {children}
            </div>
            <ToasterProvider/>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
