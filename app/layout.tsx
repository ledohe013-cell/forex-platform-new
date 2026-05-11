"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {/* Shared Navbar */}
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-12">
              <h1 className="text-2xl font-bold text-blue-700"> Forex</h1>
              <Link href="/" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Home</Link>
              <Link href="/markets" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Markets</Link>
              <Link href="/analysis" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Analysis</Link>
              <Link href="/news" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">News</Link>
              <Link href="/contact" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Contact</Link>
              <Link href="/dashboard" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Dashboard</Link>
              <Link href="/payment" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">payment</Link>

              {/* New Auth Links */}
              <Link href="/login" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Login</Link>
              
            </div>
          </nav>
          

          {/* Page Content */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

