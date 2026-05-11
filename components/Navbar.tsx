"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
      {/* Logo / Site Name */}
      <h1 className="text-2xl font-bold">Lucky Forex</h1>

      {/* Navigation */}
      <nav className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/markets">Markets</Link>
        <Link href="/analysis">Analysis</Link>
        <Link href="/news">News</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/payment">Payment</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}

