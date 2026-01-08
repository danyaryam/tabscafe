import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SessionProvider } from 'next-auth/react';
import { ProductProvider } from "@/lib/product-context"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cafe Tabs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={`${geist.className} antialiased`}>
        <SessionProvider>
          <ProductProvider>
            {children}
            <ScrollToTop />
            <Analytics />
          </ProductProvider>
        </SessionProvider>
      </body>
    </html>
  )
}