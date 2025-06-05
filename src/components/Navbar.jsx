import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  // Apply theme class whenever isDark changes
  useEffect(() => {
     console.log("Theme is now:", isDark ? "Dark" : "Light");
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center text-xl font-bold text-purple-700 dark:text-purple-400">
          🍸 <span className="ml-1">CocktailApp</span>
        </Link>

        {/* Desktop Links + Toggle */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Home</Link>
          <Link to="/search" className="text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Search</Link>
          <Link to="/substitutes" className="text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Substitutes</Link>
          <Link to="/details" className="text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Details</Link>
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-gray-700 dark:text-gray-200 hover:text-purple-500 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsDark(!isDark)} className="text-gray-700 dark:text-gray-200">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 dark:text-gray-200">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white/80 dark:bg-gray-900/80 transition-all">
          <Link to="/" className="block text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Home</Link>
          <Link to="/search" className="block text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Search</Link>
          <Link to="/substitutes" className="block text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Substitutes</Link>
          <Link to="/details" className="block text-gray-700 dark:text-gray-200 hover:text-purple-500 transition">Details</Link>
        </div>
      )}
    </nav>
  );
}
