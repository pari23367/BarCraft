// src/pages/Substitutes.jsx
import { useState } from 'react';

export default function Substitutes() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_COCKTAIL_API;

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const updatedItems = [...items, inputValue];
      setItems(updatedItems);
      setInputValue('');
      setLoading(true);

      try {
        const response = await fetch(`${API_BASE}/ingredients`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredients: updatedItems }),
        });

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error calling cocktail API:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-100 dark:bg-[#111] px-4 transition-colors duration-300">
      <h2 className="text-4xl font-bold mt-10 mb-4">Find Substitutions</h2>
      <h5 className="text-lg mb-4 font-semibold">Enter Your Ingredients Below</h5>

      <input
        type="text"
        placeholder="Type and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 border border-gray-300 rounded-md w-72 mb-4"
      />

      <ul className="mb-4">
        {items.map((item, index) => (
          <li key={index} className="text-md text-black dark:text-white">{item}</li>
        ))}
      </ul>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {result && (
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md p-4 rounded-md w-3/4">
          <h3 className="text-xl font-semibold mb-2">Substitutions:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
