// src/components/PopularCocktails.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://192.168.1.92:7777/cocktailRecipe-search";
const POPULAR_IDS = ["ID_000058", "ID_000089", "ID_000145"];

export default function PopularCocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const results = await Promise.all(
          POPULAR_IDS.map((id) =>
            fetch(`${API_BASE}/CocktailId/${id}`)
              .then((res) => res.json())
              .then((data) => data.payload?.[0])
          )
        );
        setCocktails(results.filter(Boolean));
      } catch (err) {
        setError("Network error.");
        console.error("❌ Popular cocktail fetch failed:", err);
      }
    };

    fetchPopular();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  if (!cocktails.length) {
    return <p className="text-center text-red-600 text-lg">Loading popular cocktails…</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full px-8">
      {cocktails.map((cocktail, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-2">{cocktail.Name}</h2>
          <p><strong>Method:</strong> {cocktail.Method || "Unknown"}</p>
          <p><strong>Prep Time:</strong> {cocktail["Prep_Time"] || "N/A"}</p>
          {cocktail.Link && (
            <a
              href={cocktail.Link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline text-sm mt-2 block"
            >
              View Recipe →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
