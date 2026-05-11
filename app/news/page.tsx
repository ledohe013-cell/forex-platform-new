import { getNews } from "../../lib/getNews";

export default async function News() {
  const headlines = await getNews();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Market News</h1>
      <p className="text-lg text-gray-700 mb-6">
        Stay updated with the latest financial headlines and market-moving events.
      </p>

      <ul className="space-y-4">
        {headlines.map((news: any, index: number) => (
          <li key={index} className="border-b pb-2">
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold text-blue-700 hover:underline"
            >
              {news.title}
            </a>
            <p className="text-sm text-gray-500">{news.publishedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
