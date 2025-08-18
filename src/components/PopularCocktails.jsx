// src/components/PopularCocktails.jsx
import { useEffect, useState } from "react";
import { useTheme } from '../context/ThemeContext';

const API_BASE = "/api/cocktailRecipe-search";
const POPULAR_IDS = ["ID_000058", "ID_000089", "ID_000145"];

{/*}
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

  // ✅ Change 1: Filter valid votes
  const validVotes = voteList.filter(
    item => item.Cocktail_ID && typeof item.Votes === "number"
  );

    // ✅ Change 2: Find the maximum vote count
  const maxVotes = Math.max(...validVotes.map(item => item.Votes));

  // ✅ Change 3: Get only cocktails with the highest vote count
  const topVotedSameMax = validVotes.filter(item => item.Votes === maxVotes);*/}
{/*
  // Step 2: Sort by highest votes
  const topVoted = voteList
    .filter(item => item.Cocktail_ID && typeof item.Votes === "number")
    .sort((a, b) => b.Votes - a.Votes)
    .slice(0, 3);

  // Step 3: Fetch cocktail details for top 3 cocktails
  const topCocktails = await Promise.all(
    topVoted.map(item =>
      fetch(`${API_BASE}/CocktailId/${item.Cocktail_ID}`)
        .then(res => res.json())
        .then(data => data.payload?.[0])
    )
  );
  */}
  {/*}
  // ✅ Change 4: Shuffle the array randomly and take first 3
  const randomTop = topVotedSameMax
    .sort(() => Math.random() - 0.5) // shuffle
    .slice(0, 3); // take only 3

  // Step 3: Fetch cocktail details for the 3 chosen cocktails
  const topCocktails = await Promise.all(
    randomTop.map(item =>
      fetch(`${API_BASE}/CocktailId/${item.Cocktail_ID}`)
        .then(res => res.json())
        .then(data => data.payload?.[0])
    )
  );

  console.log("Top voted items:", randomTop);

  console.log("🍸 topCocktails:", topCocktails); // Add this
  return topCocktails;
}*/}

async function fetchTop3ByVotes() {
  const res = await fetch(`${API_BASE}/votes?threshold=0`);
  const data = await res.json();
  console.log("🔍 Raw /votes response:", data);

  const voteList = data.payload || [];
  if (!voteList.length) {
    console.warn("⚠️ No votes found in payload");
    return [];
  }

  const validVotes = voteList.filter(
    item => item.Cocktail_ID && typeof item.Votes === "number"
  );

  // Sort unique vote counts in descending order
  const uniqueVoteCounts = [...new Set(validVotes.map(item => item.Votes))].sort((a, b) => b - a);

  let selected = [];

  // Go through vote groups from highest to lowest
  for (const voteCount of uniqueVoteCounts) {
    // Get all cocktails with this vote count
    const group = validVotes.filter(item => item.Votes === voteCount);

    // Shuffle this group so results vary each time
    group.sort(() => Math.random() - 0.5);

    // Add from this group until we hit 3 total
    for (const cocktail of group) {
      if (selected.length < 3) {
        selected.push(cocktail);
      }
    }

    if (selected.length >= 3) break;
  }
// Get top 4 just for logging purposes
const top4ForLog = [...validVotes]
  .sort((a, b) => b.Votes - a.Votes) // sort by votes descending
  .slice(0, 4); // top 4

console.log(
  "🏅 Top 4 cocktails & votes:",
  top4ForLog.map(item => ({
    id: item.Cocktail_ID,
    votes: item.Votes
  }))
);


  // Fetch details for the selected cocktails
  const topCocktails = await Promise.all(
    selected.map(item =>
      fetch(`${API_BASE}/CocktailId/${item.Cocktail_ID}`)
        .then(res => res.json())
        .then(data => data.payload?.[0])
    )
  );

  console.log("🍸 Selected cocktails (randomised):", selected);
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
    return <p className="text-center text-red-900 text-lg mb-10">Loading popular cocktails…</p>;
  }

  return (
    <div className="mb-15 grid gap-10 sm:grid-cols-2 md:grid-cols-3 w-full px-8">
      {cocktails.map((cocktail, idx) => (
        <div
          key={idx}
          className={` ${isDark ? "bg-[#360401] text-white shadow-lg rounded-lg p-6" : "bg-[#ffbdbd] text-black shadow-lg rounded-lg p-6"}transition-colors duration-500  transition-transform transform hover:-translate-y-2 hover:shadow-2xl`}>
          <div className={` ${isDark ? "items-center justify-center mb-4 bg-red-200 text-black":"items-center justify-center mb-4 bg-white text-black"}`}>
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
