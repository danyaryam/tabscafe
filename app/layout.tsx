import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"

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
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <Providers>{children}</Providers>
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
