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
        <h1 className='text-3xl font-bold text-red-700' style={{ textAlign: 'left', marginLeft: '50px', marginTop: '300px' }}>
          Welcome to
        </h1>
        <h1 className='text-8xl font-bold text-red-700' style={{ textAlign: 'left', marginLeft: '40px' }}>
          BarCraft
        </h1>
      </section>

      <section id="aboutus" className="section text-black dark:text-white">
        <h2 className="mt-20">About Us</h2>
        <p className="text-xl m-5 px-[6.5rem]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis ipsum, porttitor in dapibus vel, placerat vel massa. Curabitur nec justo et purus mollis euismod et ut enim. Pellentesque feugiat gravida sapien, a egestas libero imperdiet sed. Curabitur lectus risus, vehicula id pulvinar id, bibendum ac turpis. Donec enim massa, fermentum id facilisis a, scelerisque quis erat. Nam ut ipsum vel neque hendrerit suscipit. Morbi tincidunt metus nec.
        </p>
        <div className="bg-[#FF8C8C] h-[30px] w-full my-12"></div>
      </section>

    <section
  id="popular"
  className="w-full h-screen bg-[#FF8C8C] dark:bg-[#111] text-black dark:text-white transition-colors duration-500"
>
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="mt-20">Some Popular Cocktails</h2>
    {/* your content here */}
  </div>
</section>


      <section id="subs" className="section h-screen bg-[#FF8C8C] dark:bg-[#111] text-black dark:text-white transition-colors duration-500">
        <h2 className="mt-20">Find Substitutions</h2>
        <h5>Enter Your Ingredients Below-</h5>
        <div className="p-8">
          <input
            type="text"
            placeholder="Type and press Enter"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 text-base w-[300px] mb-4 border border-gray-300 rounded"
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

      <section id="section5" className="section text-black dark:text-white">Section 5 Content</section>
    </div>
  );
}
