import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Lotus } from "./components/Lotus"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "4Q Self-Reflection",
  description: "A Buddhist-inspired self-reflection quiz",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <div className="min-h-screen">
          <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <Lotus className="h-8 w-8 text-amber-600" />
                  <span className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                    4Q Self-Reflection
                  </span>
                </Link>
                <div className="flex items-center space-x-8">
                  <Link
                    href="/about"
                    className="text-stone-600 hover:text-amber-600 transition-colors text-sm font-medium"
                  >
                    About
                  </Link>
                  <Link
                    href="/quiz"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg"
                  >
                    Start Quiz
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="h-screen bg-[url('/bg4q.svg')] bg-fixed bg-cover bg-center bg-no-repeat">
            <main className="pt-16">{children}</main></div>
        </div>
      </body>
    </html>
  )
}

