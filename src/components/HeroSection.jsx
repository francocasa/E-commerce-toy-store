import { useState } from 'react';
import heroData from '../data/hero';


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroData.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroData.length) % heroData.length);
  };

  return (
    <section
      className="relative h-96 bg-cover bg-center flex flex-col justify-end items-start text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${heroData[currentSlide].backgroundImage})`
      }}
    >
      <div className="text-left ml-5 mb-5">
        <h1 className="text-4xl font-bold">{heroData[currentSlide].title}</h1>
        <p className="text-lg mt-4">{heroData[currentSlide].description}</p>
        <a
          href={heroData[currentSlide].buttonLink}
          className="mt-6 bg-blue-600 py-2 px-6 rounded-md text-white hover:bg-blue-700 transition-all inline-block"
        >
          {heroData[currentSlide].buttonText}
        </a>
      </div>

      {/* Controles para el slider */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <button className="text-3xl text-white bg-black bg-opacity-50 p-2 rounded-full" onClick={handlePrev}>{"<"}</button>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <button className="text-3xl text-white bg-black bg-opacity-50 p-2 rounded-full" onClick={handleNext}>{">"}</button>
      </div>

      {/* Indicadores del slider */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroData.map((_, index) => (
          <span key={index} className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
