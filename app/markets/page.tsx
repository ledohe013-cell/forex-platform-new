"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

// -------------------- Watchlist Component --------------------
function Watchlist() {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [newPair, setNewPair] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addPair = () => {
    if (newPair && !watchlist.includes(newPair)) {
      setWatchlist([...watchlist, newPair]);
      setNewPair("");
    }
  };

  const removePair = (pair: string) => {
    setWatchlist(watchlist.filter((p) => p !== pair));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Watchlist</h2>
      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          value={newPair}
          onChange={(e) => setNewPair(e.target.value)}
          placeholder="Enter pair (e.g. EUR/USD)"
          className="border border-gray-300 rounded px-4 py-2 w-64"
        />
        <button
          onClick={addPair}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {watchlist.length === 0 ? (
        <p className="text-gray-500">No pairs added yet.</p>
      ) : (
        <ul className="space-y-4">
          {watchlist.map((pair) => (
            <li
              key={pair}
              className="flex justify-between items-center bg-gray-50 rounded px-4 py-2"
            >
              <span className="font-semibold text-gray-800">{pair}</span>
              <button
                onClick={() => removePair(pair)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// -------------------- AccountOverview Component --------------------
function AccountOverview({
  balance,
  openPositions,
}: {
  balance: number;
  openPositions: {
    pair: string;
    amount: number;
    action: string;
    entryRate: number;
  }[];
}) {
  const calculatePnL = () => {
    return openPositions.reduce((total, pos) => {
      const currentRate = pos.entryRate * (pos.action === "BUY" ? 1.01 : 0.99);
      const diff =
        pos.action === "BUY"
          ? currentRate - pos.entryRate
          : pos.entryRate - currentRate;
      return total + diff * pos.amount;
    }, 0);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Account Overview</h2>
      <p className="text-gray-700 text-lg">
        <strong>Balance:</strong> ${balance.toFixed(2)}
      </p>
      <p className="text-gray-700 text-lg">
        <strong>Profit/Loss:</strong> ${calculatePnL().toFixed(2)}
      </p>

      <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">
        Open Positions
      </h3>
      {openPositions.length === 0 ? (
        <p className="text-gray-500">No open positions.</p>
      ) : (
        <ul className="space-y-2">
          {openPositions.map((pos, idx) => (
            <li
              key={idx}
              className="bg-gray-50 rounded px-4 py-2 flex justify-between"
            >
              <span>
                {pos.action} {pos.amount} of {pos.pair} @{" "}
                {pos.entryRate.toFixed(4)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// -------------------- Markets Page --------------------
export default function MarketsPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<{ pair: string; rate: number }[]>([]);
  const [balance, setBalance] = useState(0);
  const [openPositions, setOpenPositions] = useState<
    { pair: string; amount: number; action: string; entryRate: number }[]
  >([]);
  const [chartPair, setChartPair] = useState("FX:EURUSD");

  // Load persisted data
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    const savedPositions = localStorage.getItem("openPositions");
    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedPositions) setOpenPositions(JSON.parse(savedPositions));
  }, []);

  // Save balance and positions
  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("openPositions", JSON.stringify(openPositions));
  }, [openPositions]);

  // Fetch exchange rates
  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const json = await res.json();

        const pairs = [
          { pair: "EUR/USD", rate: json.rates.EUR },
          { pair: "GBP/USD", rate: json.rates.GBP },
          { pair: "JPY/USD", rate: json.rates.JPY },
          { pair: "CAD/USD", rate: json.rates.CAD },
          { pair: "NGN/USD", rate: json.rates.NGN },
        ];

        setData(pairs);
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    }

    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Forex Dashboard</h1>

      {/* Session-based login */}
      <div className="mb-8">
        {session?.user ? (
          <>
            <p>Signed in as {session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Sign in with Google
          </button>
        )}
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800">{item.pair}</h3>
            <p className="text-2xl text-blue-600 font-bold">
              {item.rate.toFixed(4)}
            </p>
          </div>
        ))}
      </div>

      {/* Dynamic TradingView Chart */}
      <div className="bg-white shadow rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Chart</h2>
        <select
          value={chartPair}
          onChange={(e) => setChartPair(e.target.value)}
          className="border rounded px-4 py-2 mb-4"
        >
          <option value="FX:EURUSD">EUR/USD</option>
          <option value="FX:GBPUSD">GBP/USD</option>
          <option value="FX:USDJPY">USD/JPY</option>
          <option value="FX:USDNGN">USD/NGN</option>
        </select>

        <iframe
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=${chartPair}&interval=60&theme=light`}
          width="100%"
          height="500"
          frameBorder="0"
          allowTransparency
          allowFullScreen
        ></iframe>
      </div>

      <Watchlist />
      <AccountOverview balance={balance} openPositions={openPositions} />
    </main>
  );
}
