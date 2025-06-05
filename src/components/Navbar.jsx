import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold text-purple-700 dark:text-purple-400">
            🍸 CocktailApp
          </Link>
          <div className="hidden md:flex space-x-4 text-sm">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-600">Home</Link>
            <Link to="/search" className="text-gray-700 dark:text-gray-200 hover:text-purple-600">Search</Link>
            <Link to="/substitutes" className="text-gray-700 dark:text-gray-200 hover:text-purple-600">Substitutes</Link>
            <Link to="/details" className="text-gray-700 dark:text-gray-200 hover:text-purple-600">Details</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsDark(!isDark)} className="text-gray-700 dark:text-gray-200">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 dark:text-gray-200">Home</Link>
          <Link to="/search" className="block text-gray-700 dark:text-gray-200">Search</Link>
          <Link to="/substitutes" className="block text-gray-700 dark:text-gray-200">Substitutes</Link>
          <Link to="/details" className="block text-gray-700 dark:text-gray-200">Details</Link>
        </div>
      )}
    </nav>
  );
}
