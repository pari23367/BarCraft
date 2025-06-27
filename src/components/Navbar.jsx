import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { isDark, setIsDark } = useTheme(); 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
<nav className="sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-500
  bg-white/80 dark:bg-[#111]/80 
  text-black dark:text-white 
  border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <a href="#home" className="text-xl font-extrabold text-red-700 dark:text-[#d76060] flex items-center" style={{ fontFamily: 'HeadingFont' }}>
          BarCraft
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <a href="#home" className="hover:text-red-300 transition text-gray-700 dark:text-gray-200">Home</a>
          <a href="#aboutus" className="hover:text-red-300 transition text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#popular" className="hover:text-red-300 transition text-gray-700 dark:text-gray-200">Popular Cocktails</a>
          <a href="#subs" className="hover:text-red-300 transition text-gray-700 dark:text-gray-200">Substitutes</a>
          <a href="#section5" className="hover:text-red-300 transition text-gray-700 dark:text-gray-200">Contact</a>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden flex gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-gray-700 dark:text-gray-200"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 dark:text-gray-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white/80 dark:bg-gray-900/90 transition-all">
          <a href="#home" className="block text-gray-700 dark:text-gray-200">Home</a>
          <a href="#aboutus" className="block text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#popular" className="block text-gray-700 dark:text-gray-200">Popular Cocktails</a>
          <a href="#subs" className="block text-gray-700 dark:text-gray-200">Substitutes</a>
          <a href="#section5" className="block text-gray-700 dark:text-gray-200">Contact</a>
        </div>
      )}
    </nav>
  );
}
