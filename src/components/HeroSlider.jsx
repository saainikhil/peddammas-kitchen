import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDE_DATA = [
  {
    id: '1',
    name: '7 Cups Sweet',
    desc: 'Rich, milky and nostalgic — made traditionally.',
    price: '₹320 / kg',
    image: '/assets/images/7 cups.png'
  },
  {
    id: '2',
    name: 'Mango Pickle',
    desc: 'Tangy and spicy, bottled with care.',
    price: '₹250 / kg',
    image: '/assets/images/mango pickle.png'
  },
  {
    id: '4',
    name: 'Murukulu',
    desc: 'Crispy savory bites made fresh.',
    price: '₹220 / kg',
    image: '/assets/images/murkulu.png'
  },
  {
    id: '3',
    name: 'Karam Podi',
    desc: 'Spicy gun powder for rice and roti.',
    price: '₹180 / kg',
    image: '/assets/images/kaaram podi.png'
  }
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDE_DATA.length);
  };

  const prev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + SLIDE_DATA.length) % SLIDE_DATA.length);
  };

  return (
    <section className="hero-slider" id="hero-slider">
      <div className="slides" style={{ transform: `translateX(${-activeIndex * 100}%)`, display: 'flex', transition: 'transform 0.5s ease-in-out' }}>
        {SLIDE_DATA.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === activeIndex ? 'active' : ''}`}
            data-id={slide.id}
            style={{ minWidth: '100%', boxSizing: 'border-box' }}
          >
            <div className="slide-inner">
              <div className="slide-content">
                <h2>{slide.name}</h2>
                <p className="slide-desc">{slide.desc}</p>
                <p className="slide-price">{slide.price}</p>
                <Link className="btn primary" to={`/product/${slide.id}`}>Order Now</Link>
              </div>
              <div className="slide-image">
                <img src={slide.image} alt={slide.name} loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="arrow left" id="prev" onClick={prev}>‹</button>
      <button className="arrow right" id="next" onClick={next}>›</button>
      <div className="dots" id="dots">
        {SLIDE_DATA.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
