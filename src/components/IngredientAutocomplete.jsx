import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import ingredientData from "../data/ingredients.json"; // Static JSON file

const cleanIngredient = (str) => {
  return str.replace(/^[.'| ]+/, "").trim().toLowerCase();
};

const IngredientAutocomplete = ({ query, onSelect }) => {
  const [ingredients, setIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const cleaned = ingredientData.values.map(cleanIngredient);
    const unique = [...new Set(cleaned)];
    setIngredients(unique);
  }, []);

  useEffect(() => {
    if (query && query.length > 0) {
      const matches = ingredients.filter((i) =>
        i.includes(query.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query, ingredients]);

  if (suggestions.length === 0) return null; // Don't render anything if no matches

  return (
    <ul
      className={`mb-2 border shadow w-[300px] ${
        isDark ? "bg-[#000000] text-white" : "bg-white text-black"
      }`}
    >
      {suggestions.map((item, i) => (
        <li
          key={i}
          onClick={() => onSelect(item)}
          className={`p-2 text-lg cursor-pointer ${
            isDark ? "hover:bg-[#360401]" : "hover:bg-red-100"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default IngredientAutocomplete;
