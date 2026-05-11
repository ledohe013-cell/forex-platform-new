export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center space-x-12">
          <h1 className="text-2xl font-bold text-blue-700"> Forex</h1>
          <a href="/home" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Home</a>
          <a href="/markets" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Markets</a>
          <a href="/analysis" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Analysis</a>
          <a href="/news" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">News</a>
          <a href="/contact" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">Contact</a>
          <a href="/payment" className="text-gray-700 text-lg font-medium hover:text-blue-600 transition">payment</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h2 className="text-5xl font-bold mb-4">Trade Smarter with  Forex Platform 🚀</h2>
        <p className="text-xl max-w-2xl mb-8">
          Real-time currency data, advanced analysis tools, and market insights — all in one place.
        </p>
        <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          Start Trading
        </button>
      </section>

      {/* Market Dashboard */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Live Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-2">EUR/USD</h4>
            <p className="text-green-600 font-semibold">+0.45%</p>
            <p className="text-gray-500">1.0932</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-2">GBP/JPY</h4>
            <p className="text-red-600 font-semibold">-0.32%</p>
            <p className="text-gray-500">183.45</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-2">USD/CHF</h4>
            <p className="text-green-600 font-semibold">+0.12%</p>
            <p className="text-gray-500">0.8765</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-gray-600">
          <p>© 2025  Forex. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="privacy" className="hover:text-blue-600">Privacy</a>
            <a href="terms" className="hover:text-blue-600">Terms</a>
            <a href="support" className="hover:text-blue-600">Support</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

