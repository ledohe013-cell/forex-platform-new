import MarketChart from "../../components/MarketChart";

export default function Analysis() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Analysis</h1>
      <p className="text-lg text-gray-700 mb-6">
        This is the Analysis page. Below is a sample chart showing EUR/USD trends.
      </p>
      <MarketChart />
    </div>
  );
}
