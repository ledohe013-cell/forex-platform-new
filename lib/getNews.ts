export async function getNews() {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=finance&apiKey=${process.env.NEWS_API_KEY}`,
    { cache: "no-store" } // ensures fresh data each time
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await res.json();
  return data.articles.slice(0, 5); // only take top 5 articles
}
