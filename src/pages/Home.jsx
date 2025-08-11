import lightHero from '../assets/whitehero.png';
import darkHero from '../assets/blackhero.png';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../App.css';
import PopularCocktails from '../components/PopularCocktails';
import IngredientAutocomplete from '../components/IngredientAutocomplete';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [subsData, setSubsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchSubs = async (ingredient) => {
    setSelectedItem(ingredient);
    setSubsData(null);
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`http://192.168.1.92:9207/api/food/by-alias/${ingredient}`);
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setSubsData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch substitutions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* Hero */}
      <section
        id="home"
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${isDark ? darkHero : lightHero})`,
          color: 'white'
        }}
      >
        <h1 className="text-3xl font-bold text-red-800 ml-10 mt-110 sm:mt-110 md:mt-60 text-left">
          Welcome to
        </h1>
        <h1
          className="text-8xl font-bold text-red-800"
          style={{ textAlign: 'left', marginLeft: '40px', textShadow: '3px 3px 1px black' }}
        >
          BarCraft
        </h1>
      </section>

      {/* About Us */}
      <section
        id="aboutus"
        className={`section ${isDark ? 'bg-[#360401] text-white' : 'bg-[#ffbdbd] text-red-900'} transition-colors duration-500`}
      >
        <p className="text-5xl mt-15 mb-10" style={{ fontFamily: 'HeadingFont' }}>
          About Us
        </p>
        <p className="text-lg px-[4rem]">
          BarCraft is your behind-the-bar assistant, built to help bartenders find smart substitutions for cocktail ingredients in seconds. Whether you're working with a limited stock or crafting a new twist on a classic recipe, BarCraft helps you make every drink possible—with creativity, flexibility, and confidence.
          <br />
          <br />
          Born out of a passion for mixology and the real challenges bartenders face, BarCraft makes experimenting and improvising easier than ever. It’s not just about replacements—it’s about unlocking possibilities, reducing waste, and keeping the bar flowing smoothly.
        </p>
        <div className="bg-[#ffffff] h-[20px] w-full my-12"></div>
      </section>

      {/* Popular Cocktails */}
      <section
        id="popular"
        className={`section ${isDark ? 'w-full bg-[#000000] text-white' : 'w-full bg-[#ffffff] text-red-900'} transition-colors duration-500`}
      >
        <div>
          <h1 className="text-5xl m-15">Some Popular Cocktails</h1>
          <PopularCocktails />
        </div>
      </section>

      {/* Substitutions */}
      <section
        id="subs"
        className={`section ${isDark ? 'w-full bg-[#360401] text-white' : 'w-full bg-[#ffbdbd] text-red-900'} transition-colors duration-500`}
      >
        <h2 className="text-5xl mt-10 mb-8">Find Substitutions</h2>
        <h3 className="text-3xl">Enter Your Ingredients Below-</h3>

        <div className="mt-5 mb-5 flex flex-col items-center justify-center h-full">
          <input
            type="text"
            placeholder="Type and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`p-2 text-base w-[300px] border ${isDark ? 'border-gray-300 rounded' : 'border-black-900 rounded'} transition-colors duration-500`}
          />

          <IngredientAutocomplete
  query={inputValue}
  onSelect={(item) => {
    setItems((prev) => [...prev, item]); // add suggestion as a button immediately
    setInputValue(""); // clear search bar
  }}
/>


          <div className="flex flex-wrap gap-2 justify-center">
            {items.map((item, index) => (
              <button
                key={index}
                className={`px-4 py-1 text-xl mt-4 rounded border ${isDark ? 'bg-[#913530] text-black border-black' : 'bg-red-200 text-red-900 border-red-900'} transition`}
                onClick={() => fetchSubs(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {selectedItem && (
            <div className="mt-6 text-xl font-semibold mb-6 text-center">
              Finding substitutions for: <span className="underline">{selectedItem}</span>
              {loading && <p className="mt-2 text-base">Loading...</p>}
              {error && <p className="mt-2 text-base text-red-500">{error}</p>}
              {subsData && (
                <pre className="mt-4 bg-white text-black p-4 rounded text-left max-w-[500px] overflow-x-auto">
                  {JSON.stringify(subsData, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section
        id="section5"
        className={`section ${isDark ? 'w-full bg-black text-white' : 'w-full bg-white text-red-900'} transition-colors duration-500 px-22 py-16`}
      >
        <h2 className="text-5xl font-bold mb-12 text-center">Contact Us</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              <strong>Prof. Ganesh Bagler</strong>
              <br />
              Center for Computational Biology
              <br />
              Indraprastha Institute of Information Technology Delhi (IIIT Delhi)
              <br />
              R&D Block, Okhla Phase III, Near Govindpuri Metro Station
              <br />
              New Delhi, India – 110020
            </p>

            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:bagler+barcraft@iiitd.ac.in"
                className="underline hover:text-red-600 dark:hover:text-red-300"
              >
                bagler+barcraft@iiitd.ac.in
              </a>
              <br />
              <strong>Tel:</strong> +91-11-26907-443 (Work)
            </p>
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md h-[300px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112093.69615836978!2d77.20000000000002!3d28.5452737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3759be54ec1%3A0xc7635467b7fda3e9!2sIIIT%20Delhi%20Innovation%20and%20Incubation%20Center!5e0!3m2!1sen!2sin!4v1719598761592!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="w-full h-full border-none"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
