// src/pages/Substitutes.jsx
import { useState } from 'react';

export default function Substitutes() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [result, setResult] = useState(null); // response from backend

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');

      try {
        const response = await fetch('http://localhost:5000/substitute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ingredients: [...items, inputValue] }),
        });

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error calling substitute API:', error);
      }
    }
  };

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-orange-100 dark:bg-[#111] px-4 transition-colors duration-300">
      <h2 className="text-4xl font-bold mt-10 mb-4">Find Substitutions</h2>
      <h5 className="text-lg mb-4">Enter Your Ingredients Below</h5>

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
          <li key={index} className="text-md">{item}</li>
        ))}
      </ul>

      {result && (
        <div className="bg-white shadow-md p-4 rounded-md w-3/4">
          <h3 className="text-xl font-semibold mb-2">Substitutions:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
