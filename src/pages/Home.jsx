import herobg from '../assets/ckbg.jpg'
import { useState } from 'react';
import '../App.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64px)]">
      
      <section id="home"
        className="section"
        style={{ 
          backgroundImage: 'url(${herobg})',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '90vh',
          color: 'white'  // Optional: to make text readable on image
        }}>
          
          <h1 style={{ textAlign: 'left', fontSize: '4.5rem', marginLeft: '20px', marginTop: '300px' }}>
            Cocktail App Name
          </h1>

        </section>


        <section id="aboutus" className="section">

          <h2 style={{marginTop: '5rem'}}>About Us</h2>
          <p style={{ fontSize: '1.5rem', margin: '20px', paddingInline: '6.5rem'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas felis ipsum, porttitor in dapibus vel, placerat vel massa. Curabitur nec justo et purus mollis euismod et ut enim. Pellentesque feugiat gravida sapien, a egestas libero imperdiet sed. Curabitur lectus risus, vehicula id pulvinar id, bibendum ac turpis. Donec enim massa, fermentum id facilisis a, scelerisque quis erat. Nam ut ipsum vel neque hendrerit suscipit. Morbi tincidunt metus nec.
          </p>

          <div style={{ background: '#E7F5F5', height: '30px', width: '100%' , marginBottom: '4rem', marginTop: '3rem'}}></div>

        </section>


        <section id="popular" className="section" style={{background: '#E7F5F5', height: '100vh'}}>

            <h2 style={{marginTop: '5rem'}}>Some Popular Cocktails</h2>


        </section>


        <section id="subs" className="section" style={{background: '#D9681C', height: '100vh'}}>

          <h2 style={{marginTop: '5rem'}}>Find Substitutions</h2>

          <h5> Enter Your Ingredients Below- </h5>

          <div style={{ padding: '2rem' }}>
            <input
              type="text"
              placeholder="Type and press Enter"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                width: '300px',
                marginBottom: '1rem'
              }}
            />

            <ul>
              {items.map((item, index) => (
                <li key={index} style={{ fontSize: '1rem', margin: '0.25rem 0' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>



        </section>


        <section id="section5" className="section">Section 5 Content</section>

    </div>
  );
}
