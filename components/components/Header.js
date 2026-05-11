import Link from 'next/link'

export default function Header() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f0f0f0' }}>
      <Link href="/">Home</Link>
      <Link href="/markets">Markets</Link>
      <Link href="/analysis">Analysis</Link>
      <Link href="/news">News</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  )
}
