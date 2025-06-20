import lightHero from '../assets/whitehero.png';
import darkHero from '../assets/blackhero.png';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../App.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
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
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)]">

      <section
        id="home"
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url(${isDark ? darkHero : lightHero})`,
          color: 'white'
        }}
      >
        <h1 className='text-3xl font-bold text-red-800' style={{ textAlign: 'left', marginLeft: '50px', marginTop: '300px' }}>
          Welcome to
        </h1>
        <h1 className='text-8xl font-bold text-red-800' style={{ textAlign: 'left', marginLeft: '40px' }}>
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


    <section id="popular" className={`section ${isDark ? "w-full h-screen bg-[#000000] text-white" : "w-full h-screen bg-[#ffffff] text-red-900"} transition-colors duration-500`}> {/*className="w-full h-screen bg-[#FF8C8C] dark:bg-[#000] text-black dark:text-white transition-colors duration-500">*/}
      <div>
        <h1 className="text-5xl mt-20">Some Popular Cocktails</h1>
        {/* your content here */}
      </div>
    </section>


      <section id="subs" className={`section ${isDark ? "w-full h-screen bg-[#360401] text-white" : "w-full h-screen bg-[#ffbdbd] text-red-900"} transition-colors duration-500`}> {/*className="w-full h-screen h-screen bg-[#FF8C8C] dark:bg-[#675959] text-black dark:text-white transition-colors duration-500">*/}
        <h2 className="text-5xl mt-20 mb-8">Find Substitutions</h2>
        <h3 className='text-3xl'>Enter Your Ingredients Below-</h3>
        <div className="flex flex-col items-center justify-center h-full">
          <input
            type="text"
            placeholder="Type and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`p-2 text-base w-[300px] mb-4 border ${isDark ? "border-gray-300 rounded" : "border-black-900 rounded"} transition-colors duration-500`}
          />
          <ul>
            {items.map((item, index) => (
              <li key={index} className="text-base my-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="section5" className={`section ${isDark ? "w-full h-screen bg-[#000000] text-white" : "w-full h-screen bg-[#ffffff] text-red-900"} transition-colors duration-500`}>
        <h2 className="text-5xl mt-20 mb-8">Contact Us</h2>
      </section>
    </div>
  );
}
