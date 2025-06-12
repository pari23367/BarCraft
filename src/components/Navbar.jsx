import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const init = stored === 'dark' || (!stored && prefersDark);
    setIsDark(init);
    document.documentElement.classList.toggle('dark', init);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    
         
 
<nav className="sticky top-0 z-50 w-full bg-white dark:bg-black text-black dark:text-white backdrop-blur-lg shadow border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <Link to="/" className="text-xl font-extrabold text-purple-700 dark:text-purple-400 flex items-center">
          🍸 CocktailApp
        </Link>
        <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
          <a href="#home" className="hover:text-purple-500 transition text-gray-700 dark:text-gray-200">Home</a>
          <a href="#aboutus" className="hover:text-purple-500 transition text-gray-700 dark:text-gray-200">About Us</a>
          <a href="#popular" className="hover:text-purple-500 transition text-gray-700 dark:text-gray-200">Popular Cocktails</a>
          <a href="#subs" className="hover:text-purple-500 transition text-gray-700 dark:text-gray-200">Substitutes</a>
          <a href="#section5" className="hover:text-purple-500 transition text-gray-700 dark:text-gray-200">Contact</a>
          <button onClick={() => setIsDark(!isDark)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile */}
<div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-black transition-all">
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
