import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [balances, setBalances] = useState([])
  const [positions, setPositions] = useState([])
  const [trades, setTrades] = useState([])
  const [prices, setPrices] = useState({ EURUSD: null })

  useEffect(() => {
    const fetchData = async () => {
      const { data: balancesData } = await supabase.from('balances').select('*')
      setBalances(balancesData || [])

      const { data: positionsData } = await supabase.from('positions').select('*')
      setPositions(positionsData || [])

      const { data: tradesData } = await supabase.from('trade_history').select('*')
      setTrades(tradesData || [])
    }
    fetchData()

    // WebSocket for live EUR/USD
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/eurusdt@trade')
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      setPrices({ EURUSD: msg.p })
    }

    return () => ws.close()
  }, [])

  // --- Trading Engine Simulation ---
  const placeOrder = async (side) => {
    const quantity = 1
    const price = parseFloat(prices.EURUSD)

    // Update balances (simple: deduct/add $100 per trade)
    if (side === 'buy') {
      await supabase.from('balances').update({ amount: balances[0].amount - 100 }).eq('currency', 'USD')
      await supabase.from('positions').insert([{ symbol: 'EURUSD', side: 'long', quantity, entry_price: price }])
    } else {
      await supabase.from('balances').update({ amount: balances[0].amount + 100 }).eq('currency', 'USD')
      await supabase.from('positions').insert([{ symbol: 'EURUSD', side: 'short', quantity, entry_price: price }])
    }

    // Record trade history
    await supabase.from('trade_history').insert([
      { symbol: 'EURUSD', side, quantity, price, timestamp: new Date().toISOString() }
    ])

    // Refresh data
    const { data: balancesData } = await supabase.from('balances').select('*')
    setBalances(balancesData || [])
    const { data: positionsData } = await supabase.from('positions').select('*')
    setPositions(positionsData || [])
    const { data: tradesData } = await supabase.from('trade_history').select('*')
    setTrades(tradesData || [])
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>My Dashboard</h1>

      <h2>Balances</h2>
      <ul>
        {balances.map((b, i) => (
          <li key={i}>{b.currency}: {b.amount}</li>
        ))}
      </ul>

      <h2>Open Positions</h2>
      <ul>
        {positions.map((p, i) => (
          <li key={i}>
            {p.symbol} — {p.side} {p.quantity} @ {p.entry_price}
          </li>
        ))}
      </ul>

      <h2>Trade History</h2>
      <ul>
        {trades.map((t, i) => (
          <li key={i}>
            {t.timestamp?.slice(0, 10)} — {t.symbol} — {t.side} {t.quantity} @ {t.price}
          </li>
        ))}
      </ul>

      <h2>Live Market Data</h2>
      <p>EUR/USD: {prices.EURUSD || 'Loading...'}</p>

      <h2>Trading Engine</h2>
      <button onClick={() => placeOrder('buy')}>BUY EUR/USD</button>
      <button onClick={() => placeOrder('sell')}>SELL EUR/USD</button>

      <h2>Market Chart</h2>
      <div style={{ marginTop: '20px' }}>
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview-widget&symbol=FX:EURUSD&interval=60&theme=light&style=1&timezone=Etc%2FUTC"
          width="600"
          height="400"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  )
}


