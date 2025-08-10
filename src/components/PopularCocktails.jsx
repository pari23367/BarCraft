// src/components/PopularCocktails.jsx
import { useEffect, useState } from "react";
import { useTheme } from '../context/ThemeContext';

const API_BASE = "/api/cocktailRecipe-search";
const POPULAR_IDS = ["ID_000058", "ID_000089", "ID_000145"];

async function fetchTop3ByVotes() {
  // Step 1: Get all votes above 0
  const res = await fetch(`${API_BASE}/votes?threshold=0`);
  const data = await res.json();
  console.log("🔍 Raw /votes response:", data);

  const voteList = data.payload || [];
    if (!voteList.length) {
      console.warn("⚠️ No votes found in payload");
      return [];
    }

  // Step 2: Sort by highest votes
  const topVoted = voteList
    .filter(item => item.Cocktail_ID && typeof item.Votes === "number")
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3);

  // Step 3: Fetch cocktail details for top 3 cocktails
  const topCocktails = await Promise.all(
    topVoted.map(item =>
      fetch(`${API_BASE}/CocktailId/${item.Cocktail_ID}`)
        .then(res => res.json())
        .then(data => data.payload?.[0])
    )
  );
  console.log("Top voted items:", topVoted);

  console.log("🍸 topCocktails:", topCocktails); // Add this
  return topCocktails;
}


export default function PopularCocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState("");
  const {isDark} = useTheme();

  useEffect(() => {
    const fetchPopular = async () => {
    try {
      const results = await fetchTop3ByVotes();
console.log("🔍 Raw results from fetchTop3ByVotes():", results);

const filtered = results?.filter(Boolean) || [];
console.log("✅ After filtering invalid cocktails:", filtered);

setCocktails(filtered);

{/*}
      const results = await fetchTop3ByVotes();
      setCocktails(results.filter(Boolean));*/}
    } catch (err) {
      setError("Network error.");
      console.error("❌ Popular cocktail fetch failed:", err);
    }
  };

    {/*
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
    */}

    fetchPopular();
  }, []);

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  if (!cocktails.length) {
    return <p className="text-center text-red-600 text-lg">Loading popular cocktails…</p>;
  }

  return (
    <div className="mb-15 grid gap-10 sm:grid-cols-2 md:grid-cols-3 w-full px-8">
      {cocktails.map((cocktail, idx) => (
        <div
          key={idx}
          className={` ${isDark ? "bg-[#360401] text-white shadow-lg rounded-lg p-6" : "bg-[#ffbdbd] text-black shadow-lg rounded-lg p-6"}transition-colors duration-500`}>
          <div className="items-center justify-center mb-4 bg-white text-black">
          <h3 className="text-3xl m-7">{cocktail.Name}</h3>
          </div>
          <p className="text-xl"><strong>Method:</strong> {cocktail.Method || "Unknown"}</p>
          <p className="text-xl"><strong>Prep Time:</strong> {cocktail["Prep_Time"] || "N/A"}</p>
          {cocktail.Link && (
            <a
              href={cocktail.Link}
              target="_blank"
              rel="noreferrer"
              className={` ${isDark ? "text-[#ffbdbd] hover:underline text-lg m-5 block" : "text-[#540a06] hover:underline text-lg m-5 block"}transition-colors duration-500`}
            >
              View Recipe →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
