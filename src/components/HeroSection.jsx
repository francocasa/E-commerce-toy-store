import { useState } from 'react';

const HeroSection = () => {
  // Datos estáticos
  const heroData = [
    {
      id: 1,
      title: 'Promociones que te esperan',
      description: 'Productos seleccionados con 33% de descuento',
      buttonText: 'Ver Ofertas',
      buttonLink: '/promotions',
      backgroundImage: '/FondoHero/FondoHero.png',
    },
    {
      id: 2,
      title: 'Mira nuestros nuevos productos',
      description: 'Lo nuevo ha llegado',
      buttonText: 'Ver Productos',
      buttonLink: '/products',
      backgroundImage: '/FondoHero/FondoHero2.png',
    },
    {
      id: 3,
      title: 'Mira los testimonios',
      description: 'Varios ya compraron',
      buttonText: 'Ver Testimonios',
      buttonLink: '/Testimonios',
      backgroundImage: '/FondoHero/FondoHero3.png',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroData.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroData.length) % heroData.length);
  };

  return (
    <section
      className="relative h-52 bg-cover bg-center flex flex-col text-gray-800 justify-between items-start p-4 rounded-md sm:px-6 sm:pb-8 md:h-60 md:px-9 lg:h-72 lg:pb-10"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${heroData[currentSlide].backgroundImage})`,
      }}
    >
      <div className="text-left ml-0 sm:ml-5 mb-5">
        <h1 className="text-2xl sm:text-4xl font-bold">
          {heroData[currentSlide].title}
        </h1>
        <p className="text-sm sm:text-lg mt-4">
          {heroData[currentSlide].description}
        </p>
        <a
          href={heroData[currentSlide].buttonLink}
          className="mt-6 bg-blue-600 py-2 px-4 sm:px-6 rounded-md text-white hover:bg-blue-700 transition-all inline-block"
        >
          {heroData[currentSlide].buttonText}
        </a>
      </div>

      {/* Controles para el slider */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
        <button
          className="bg-white font-bold border shadow-md text-blue-500 h-8 aspect-square flex justify-center items-center rounded-full"
          onClick={handlePrev}
        >
          {'<'}
        </button>
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <button
          className="bg-white font-bold border shadow-md text-blue-500 h-8 aspect-square flex justify-center items-center rounded-full"
          onClick={handleNext}
        >
          {'>'}
        </button>
      </div>

      {/* Indicadores del slider */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:bottom-4">
        {heroData.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full lg:w-3 lg:h-3 ${currentSlide === index ? 'bg-white' : 'bg-gray-400'}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
