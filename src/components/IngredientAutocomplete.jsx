import { useEffect, useState } from "react";

import { useTheme } from '../context/ThemeContext';
const API_BASE = "/api/cocktailRecipe-search";

const IngredientAutocomplete = ({ onSelect }) => {
  const [ingredients, setIngredients] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const {isDark} = useTheme();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(`${API_BASE}/ingredients`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "" }), // try sending empty input
});

console.log("🔍 Ingredients result:", data);
        const data = await res.json();

        const allIngredients = data.payload.flatMap((cocktail) =>
          Object.keys(cocktail)
            .filter((key) => key.toLowerCase().startsWith("ingredient") && cocktail[key])
            .map((key) => cocktail[key].trim().toLowerCase())
        );

        const uniqueIngredients = [...new Set(allIngredients)];
        setIngredients(uniqueIngredients);
      } catch (err) {
        console.error("❌ Failed to fetch ingredients:", err);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const matches = ingredients.filter((i) => i.includes(query.toLowerCase()));
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query, ingredients]);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search ingredient..."
        className={`p-2 text-base w-[300px] mb-4 border ${isDark ? "border-gray-300 rounded" : "border-black-900 rounded"} transition-colors duration-500`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded bg-white shadow">
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                setQuery(item);
                setSuggestions([]);
                if (onSelect) onSelect(item);
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientAutocomplete;
