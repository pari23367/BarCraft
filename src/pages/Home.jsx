import lightHero from '../assets/whitehero.png';
import darkHero from '../assets/blackhero.png';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../App.css';
import PopularCocktails from '../components/PopularCocktails';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">

      <section
        id="home"
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${isDark ? darkHero : lightHero})`,
          color: 'white'
        }}
      >
        {/*<h1 className='text-3xl font-bold text-red-800' style={{ textAlign: 'left', marginLeft: '50px', marginTop: '300px' }}>*/}
        
        <h1 className="text-3xl font-bold text-red-800 ml-10 mt-110 sm:mt-110 md:mt-60 text-left">
          Welcome to
        </h1>
        <h1 className='text-8xl font-bold text-red-800' style={{ textAlign: 'left', marginLeft: '40px', textShadow: '3px 3px 1px black'}}>
          BarCraft
        </h1>
      </section>

      <section id="aboutus" className={`section ${isDark ? "bg-[#360401] text-white" : "bg-[#ffbdbd] text-red-900"} transition-colors duration-500`}>
        <p className="text-5xl mt-15 mb-10" style={{fontFamily: 'HeadingFont'}}>About Us</p>
        <p className="text-lg px-[4rem]">
          BarCraft is your behind-the-bar assistant, built to help bartenders find smart substitutions for cocktail ingredients in seconds. Whether you're working with a limited stock or crafting a new twist on a classic, BarCraft helps you make every drink possible—with creativity, flexibility, and confidence.
          <br></br>
          <br></br>
          Born out of a passion for mixology and the real challenges bartenders face, BarCraft makes experimenting and improvising easier than ever. It’s not just about replacements—it’s about unlocking possibilities, reducing waste, and keeping the bar flowing smoothly.
        </p>
        <div className="bg-[#ffffff] h-[20px] w-full my-12"></div>
      </section>


    <section id="popular" className={`section ${isDark ? "w-full bg-[#000000] text-white" : "w-full bg-[#ffffff] text-red-900"} transition-colors duration-500`}>
      <div>
        <h1 className="text-5xl m-15">Some Popular Cocktails</h1>
        <PopularCocktails />
      </div>
    </section>


      <section id="subs" className={`section ${isDark ? "w-full bg-[#360401] text-white" : "w-full bg-[#ffbdbd] text-red-900"} transition-colors duration-500`}> {/*className="w-full h-screen h-screen bg-[#FF8C8C] dark:bg-[#675959] text-black dark:text-white transition-colors duration-500">*/}
        <h2 className="text-5xl mt-20 mb-8">Find Substitutions</h2>
        <h3 className='text-3xl'>Enter Your Ingredients Below-</h3>
        <div className="mt-5 mb-5 flex flex-col items-center justify-center h-full">
          <input
            type="text"
            placeholder="Type and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`p-2 text-base w-[300px] mb-4 border ${isDark ? "border-gray-300 rounded" : "border-black-900 rounded"} transition-colors duration-500`}
          />

          <div className="flex flex-wrap gap-2 justify-center">
            {items.map((item, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded border ${isDark ? "bg-white text-black border-gray-300" : "bg-red-200 text-red-900 border-red-400"} transition`}
                onClick={() => setSelectedItem(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {selectedItem && (
            <p className="mt-6 text-xl font-semibold mb-6">
              Finding substitutions for: <span className="underline">{selectedItem}</span>
            </p>
          )}

          {/*          <ul>
            {items.map((item, index) => (
              <li key={index} className="text-base my-1">
                {item}
              </li>
            ))}
          </ul>
*/}
        </div>
      </section>



      <section
  id="section5"
  className={`section ${isDark ? "w-full bg-black text-white" : "w-full bg-white text-red-900"} transition-colors duration-500 px-22 py-16`}
>
  <h2 className="text-5xl font-bold mb-12 text-center">Contact Us</h2>

  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12">

    {/* Left Side: Contact Info */}
    <div className="space-y-5 text-lg leading-relaxed">
      <p>
        <strong>Prof. Ganesh Bagler</strong><br />
        Center for Computational Biology<br />
        Indraprastha Institute of Information Technology Delhi (IIIT Delhi)<br />
        R&D Block, Okhla Phase III, Near Govindpuri Metro Station<br />
        New Delhi, India – 110020
      </p>

      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:bagler+barcraft@iiitd.ac.in"
          className="underline hover:text-red-600 dark:hover:text-red-300"
        >
          bagler+barcraft@iiitd.ac.in
        </a><br />
        <strong>Tel:</strong> +91-11-26907-443 (Work)
      </p>
    </div>

    {/* Right Side: Google Map */}
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
